import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Box, Code, Download, Shield, Sparkles, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import happyImg from "@assets/mascot.png";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatingElements = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

export default function Landing() {
  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border-primary/20 text-primary text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>v2.0 Now Available</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
            </motion.div>

            <motion.h1
              variants={item}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
            >
              <span className="gradient-text">Happy</span>
              <br />
              <span className="text-white">Manifests</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light"
            >
              Generate and download Steam depot manifests instantly with our
              <span className="text-primary font-medium"> secure Discord-authenticated</span> platform.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="glass-button hover-lift hover-glow rounded-2xl px-8 h-14 text-lg font-bold border-0 group relative overflow-hidden"
                asChild
              >
                <a href="/auth/discord" className="relative z-10 flex items-center gap-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Start Generating</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="glass-input hover-lift rounded-2xl px-8 h-14 text-lg border-white/20 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <Star className="w-5 h-5 mr-2" />
                View Features
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Manifests Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Mascot Container */}
            <div className="relative z-10 animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl scale-110 animate-pulse-glow" />
              <div className="relative glass-card p-8 rounded-3xl border-2 border-white/10">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="assets/happy.png"
                    alt="Happy Computer Mascot"
                    className="w-full max-w-md drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Floating Elements */}
                <motion.div
                  variants={floatingElements}
                  initial="hidden"
                  animate="show"
                  className="absolute -top-4 -right-4"
                >
                  <div className="glass-card p-3 rounded-2xl animate-bounce" style={{ animationDelay: '1s' }}>
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                </motion.div>

                <motion.div
                  variants={floatingElements}
                  initial="hidden"
                  animate="show"
                  className="absolute -bottom-4 -left-4"
                >
                  <div className="glass-card p-3 rounded-2xl animate-bounce" style={{ animationDelay: '2s' }}>
                    <Code className="w-6 h-6 text-blue-400" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20"
        >
          <motion.div variants={item} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to generate Steam manifests with confidence and ease.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-primary" />}
              title="Secure Authentication"
              description="Discord OAuth ensures only verified users can access the platform, keeping your Steam data safe."
              gradient="from-primary/20 to-primary/5"
            />
            <FeatureCard
              icon={<Box className="w-8 h-8 text-blue-400" />}
              title="Smart Depot Detection"
              description="Automatically scrape and detect available depots from SteamDB with intelligent parsing."
              gradient="from-blue-500/20 to-blue-500/5"
            />
            <FeatureCard
              icon={<Download className="w-8 h-8 text-green-400" />}
              title="One-Click Downloads"
              description="Generate complete manifest packages as ZIP files ready for immediate deployment."
              gradient="from-green-500/20 to-green-500/5"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: any;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div variants={item} className="group">
      <Card className={`glass-card p-8 h-full hover-lift hover-glow border-0 relative overflow-hidden group-hover:border-primary/20 transition-all duration-500 ${gradient}`}>
        {/* Background gradient effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Icon container */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">{icon}</div>
        </div>

        <h3 className="relative z-10 text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="relative z-10 text-muted-foreground leading-relaxed group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>

        {/* Subtle shine effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </Card>
    </motion.div>
  );
}
