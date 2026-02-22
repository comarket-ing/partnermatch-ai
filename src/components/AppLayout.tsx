import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Search, Grid3X3, Settings, Sparkles } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
  userRole: "manager" | "admin";
  onRoleChange: (role: "manager" | "admin") => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "discovery", label: "Discovery", icon: Search },
  { id: "mapping", label: "Mapping", icon: Grid3X3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const AppLayout = ({ children, currentView, onNavigate, userRole, onRoleChange }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col glass z-30 border-r border-border">
        <div className="p-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">comarket.ing</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Role Toggle */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 px-1">Preview as</p>
          <div className="flex gap-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => onRoleChange("manager")}
              className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${
                userRole === "manager" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Manager
            </button>
            <button
              onClick={() => onRoleChange("admin")}
              className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${
                userRole === "admin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass z-30 border-t border-border">
        <div className="flex justify-around items-center py-2 px-4">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
