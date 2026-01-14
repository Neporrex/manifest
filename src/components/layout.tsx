import { ReactNode } from "react";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Terminal, Sparkles } from "lucide-react";
import { Link } from "wouter";
import mascotImg from "@assets/mascot.png";

export function Layout({ children }: { children: ReactNode }) {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <header className="border-b border-white/5 bg-background/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer group transition-all duration-300 hover:scale-105">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/50 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/20 shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                  <img
                    src={mascotImg}
                    alt="Mascot"
                    className="w-7 h-7 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                  HappyLua
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Manifest Generator</span>
              </div>
            </div>
          </Link>

          {user && (
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 glass-card px-4 py-2 rounded-2xl border-white/10">
                <div className="relative">
                  <img
                    src={user.avatar || ""}
                    alt={user.username}
                    className="w-8 h-8 rounded-xl bg-background border-2 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{user.username}</span>
                  <span className="text-xs text-muted-foreground">Authenticated</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
                className="glass-button hover-lift rounded-2xl w-12 h-12 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 border border-white/10"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12 md:py-20 relative z-10">
        {children}
      </main>

      <footer className="border-t border-white/5 py-12 mt-auto relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-medium">Happy Manifests</p>
                <p className="text-sm text-muted-foreground">Steam Manifest Generator</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Happy Manifests</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
