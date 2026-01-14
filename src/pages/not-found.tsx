import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const containerVariants = {
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const floatingVariants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl mx-6 relative z-10"
      >
        <Card className="glass-card p-12 text-center border-0 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

          <div className="relative z-10 space-y-8">
            {/* Icon */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border border-red-500/30 shadow-2xl">
                  <AlertCircle className="w-12 h-12 text-red-400" />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                <span className="gradient-text">404</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                Oops! The page you're looking for doesn't exist.
                It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              variants={floatingVariants}
              initial="hidden"
              animate="show"
              className="flex justify-center gap-4 py-4"
            >
              <motion.div variants={itemVariants}>
                <div className="glass-card p-4 rounded-2xl animate-bounce">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
              </motion.div>
              <motion.div variants={itemVariants} style={{ animationDelay: '0.5s' }}>
                <div className="glass-card p-4 rounded-2xl animate-bounce">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
              </motion.div>
              <motion.div variants={itemVariants} style={{ animationDelay: '1s' }}>
                <div className="glass-card p-4 rounded-2xl animate-bounce">
                  <Home className="w-6 h-6 text-blue-400" />
                </div>
              </motion.div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="glass-button hover-lift hover-glow rounded-2xl px-8 h-14 text-lg font-bold group"
              >
                <Link href="/" className="flex items-center gap-3">
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Go Home
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                className="glass-input hover-lift rounded-2xl px-8 h-14 text-lg border-white/20 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </motion.div>

            {/* Fun Message */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">Pro tip:</span> Try checking the URL or use the navigation above.
              </p>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
