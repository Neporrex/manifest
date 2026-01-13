import { useState } from "react";
import { useDepots, useGenerateManifest } from "@/hooks/use-steam";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Search, FileCode, CheckCircle2, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Generator() {
  const [appId, setAppId] = useState("");
  const [selectedDepot, setSelectedDepot] = useState("");
  const [manifestId, setManifestId] = useState("");
  const { toast } = useToast();

  const { data: depots, isLoading: isLoadingDepots, isError: isDepotError } = useDepots(appId);
  const { mutate: generate, isPending: isGenerating } = useGenerateManifest();

  const handleGenerate = () => {
    if (!appId || !selectedDepot) {
      toast({
        title: "Missing Information",
        description: "Please provide an App ID and select a Depot.",
        variant: "destructive",
      });
      return;
    }

    generate(
      { appId, depotId: selectedDepot, manifestId: manifestId || undefined },
      {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Your manifest has been generated and download started.",
            className: "bg-green-500/10 border-green-500/20 text-green-200",
          });
        },
        onError: (error) => {
          toast({
            title: "Generation Failed",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-12"
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border-primary/20">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-primary font-medium">Manifest Generator</span>
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
          <span className="gradient-text">Create Your</span>
          <br />
          <span className="text-white">Manifest</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Enter your Steam App ID to automatically fetch available depots and generate
          your custom manifest files.
        </p>
      </motion.div>

      {/* Main Form */}
      <motion.div variants={cardVariants}>
        <Card className="glass-card p-10 relative overflow-hidden border-0">
          {/* Background Effects */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

          <div className="relative z-10 space-y-10">
            {/* App ID Input */}
            <div className="space-y-6">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-3">
                <Search className="w-5 h-5 text-primary" />
                Steam Application ID
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </label>

              <div className="relative group">
                <Input
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="e.g. 730 (CS2), 440 (TF2), 570 (Dota 2)"
                  className="glass-input h-16 text-xl bg-black/20 border-2 border-white/10 focus:border-primary/50 transition-all font-mono pl-6 pr-12 rounded-2xl text-center placeholder:text-muted-foreground/50"
                />

                {isLoadingDepots && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                )}

                {appId && !isLoadingDepots && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                )}
              </div>

              {isDepotError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  Failed to fetch depots. Please check the App ID and try again.
                </motion.div>
              )}
            </div>

            {/* Depot Selection */}
            <AnimatePresence>
              {depots && depots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  className="space-y-6 overflow-hidden"
                >
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-3">
                    <FileCode className="w-5 h-5 text-blue-400" />
                    Select Depot
                    <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent" />
                  </label>

                  <Select value={selectedDepot} onValueChange={setSelectedDepot}>
                    <SelectTrigger className="glass-input h-16 bg-black/20 border-2 border-white/10 focus:border-blue-400/50 transition-all rounded-2xl text-lg">
                      <SelectValue placeholder="Choose a depot to generate manifest for" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-white/20 text-white max-h-[300px] rounded-2xl">
                      {depots.map((depot) => (
                        <SelectItem
                          key={depot.id}
                          value={depot.id}
                          className="focus:bg-primary/10 focus:text-primary cursor-pointer py-4 px-6 text-lg hover:bg-white/5 transition-colors rounded-xl mx-2 my-1"
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-lg text-sm">
                              [{depot.id}]
                            </span>
                            <span className="flex-1">{depot.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Manifest ID Input */}
            <AnimatePresence>
              {selectedDepot && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Manifest GID
                    </label>
                    <span className="text-xs text-muted-foreground bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                      Optional - Auto-detected if empty
                    </span>
                  </div>

                  <Input
                    value={manifestId}
                    onChange={(e) => setManifestId(e.target.value)}
                    placeholder="Specific manifest ID (leave empty for latest)"
                    className="glass-input h-14 bg-black/20 border-2 border-white/10 focus:border-yellow-400/50 transition-all font-mono rounded-xl"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate Button */}
            <div className="pt-8">
              <Button
                size="lg"
                className="w-full h-16 text-xl font-bold shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98] rounded-2xl group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!appId || !selectedDepot || isGenerating}
                onClick={handleGenerate}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex items-center justify-center gap-4">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Generating Manifest...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span>Generate & Download</span>
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        variants={cardVariants}
        className="grid md:grid-cols-2 gap-6"
      >
        <Card className="glass-card p-6 border-0 hover-lift">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Search className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Pro Tip</h3>
              <p className="text-muted-foreground leading-relaxed">
                Leave the Manifest GID field empty to automatically fetch the latest version from Steam.
                This ensures you always get the most up-to-date manifest.
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 border-0 hover-lift">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <Download className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">What You Get</h3>
              <p className="text-muted-foreground leading-relaxed">
                Download a complete ZIP package containing your Lua script and manifest file,
                ready for immediate use with SteamCMD or your deployment pipeline.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
