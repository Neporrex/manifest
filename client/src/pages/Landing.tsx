import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Box, Code, Download, Shield } from "lucide-react";
import { motion } from "framer-motion";
import happyImg from "@assets/hAPPY_(3)_(1)_1768328912619.png";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Landing() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v2.0 Now Available
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Happy Manifests <br />
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
          >
            Generate and download Steam depot manifests instantly !
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
              asChild
            >
              <a href="/auth/discord">
                Login with Discord <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative lg:h-[500px] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/10 rounded-full blur-[100px] opacity-50 animate-pulse" />
          <div className="relative z-10 animate-float">
            <img
              src={happyImg}
              alt="Happy Computer"
              className="w-full max-w-md drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-6"
      >
        <FeatureCard
          icon={<Shield className="w-6 h-6 text-primary" />}
          title="Secure Access"
          description="Authenticated via Discord to ensure safe and tracked usage of the tool."
        />
        <FeatureCard
          icon={<Box className="w-6 h-6 text-blue-400" />}
          title="Depot Scraper"
          description="Automatically fetch depot lists from SteamDB without manual lookup."
        />
        <FeatureCard
          icon={<Download className="w-6 h-6 text-green-400" />}
          title="Instant Download"
          description="Get your manifest files as a ZIP archive ready for deployment."
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <motion.div variants={item}>
      <Card className="p-6 h-full glass-panel hover:bg-white/5 transition-colors border-white/5">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 shadow-inner">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  );
}
