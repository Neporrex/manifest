import { useState } from "react";
import { useDepots, useGenerateManifest } from "@/hooks/use-steam";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Search, FileCode, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Manifest Generator
        </h1>
        <p className="text-muted-foreground">
          Enter your App ID to begin fetching depots
        </p>
      </div>

      <Card className="p-8 glass-panel space-y-8 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="space-y-4 relative">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4" /> Steam App ID
          </label>
          <div className="relative group">
            <Input
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder="e.g. 730"
              className="h-14 text-lg bg-black/20 border-white/10 focus:border-primary/50 transition-all font-mono pl-4"
            />
            {isLoadingDepots && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            )}
          </div>
          {isDepotError && (
             <p className="text-sm text-red-400">Failed to fetch depots. Check App ID.</p>
          )}
        </div>

        <AnimatePresence>
          {depots && depots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4" /> Select Depot
              </label>
              <Select value={selectedDepot} onValueChange={setSelectedDepot}>
                <SelectTrigger className="h-14 bg-black/20 border-white/10 focus:ring-primary/20">
                  <SelectValue placeholder="Choose a depot to manifest" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f0f13] border-white/10 text-white max-h-[300px]">
                  {depots.map((depot) => (
                    <SelectItem key={depot.id} value={depot.id} className="focus:bg-white/5 focus:text-primary cursor-pointer py-3">
                      <span className="font-mono text-primary/70 mr-2">[{depot.id}]</span> {depot.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedDepot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                 <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                   Manifest GID (Optional)
                 </label>
                 <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded">Auto-detected if empty</span>
              </div>
              <Input
                value={manifestId}
                onChange={(e) => setManifestId(e.target.value)}
                placeholder="Specific manifest ID (optional)"
                className="h-14 bg-black/20 border-white/10 font-mono"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-4">
          <Button
            size="lg"
            className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.99]"
            disabled={!appId || !selectedDepot || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" /> Generate & Download
              </>
            )}
          </Button>
        </div>
      </Card>
      
      {/* Instructions / Hints */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-muted-foreground">
          <strong className="text-white block mb-1">Tip:</strong>
          Leave Manifest GID empty to fetch the latest version automatically.
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-muted-foreground">
          <strong className="text-white block mb-1">Note:</strong>
          This tool generates a .zip file containing the necessary manifest files.
        </div>
      </div>
    </div>
  );
}
