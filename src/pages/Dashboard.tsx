import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { dashboardMetrics } from "@/data/mockData";

interface DashboardProps {
  userRole: "manager" | "admin";
}

const Dashboard = ({ userRole }: DashboardProps) => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          Good morning ☀️
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's your partnership overview
        </p>
      </div>

      {/* Metric Cards — swipeable on mobile */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
        {dashboardMetrics
          .filter((_, i) => userRole === "admin" || i < 4)
          .map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="glass rounded-2xl p-5 min-w-[220px] snap-center flex-shrink-0 md:min-w-0"
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {metric.label}
              </p>
              <p className="text-3xl font-semibold text-foreground mt-2 tracking-tight">
                {metric.value}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                {metric.changeType === "up" && (
                  <TrendingUp className="w-3.5 h-3.5 text-match-high" />
                )}
                {metric.changeType === "down" && (
                  <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                )}
                <span
                  className={`text-xs font-medium ${
                    metric.changeType === "up"
                      ? "text-match-high"
                      : metric.changeType === "down"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {metric.subtitle}
                </span>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Find New Partners", desc: "AI-powered partner discovery", color: "bg-primary text-primary-foreground" },
            { title: "Review Overlaps", desc: "14 new account matches found", color: "bg-card text-foreground" },
          ].map((action) => (
            <button
              key={action.title}
              className={`${action.color} rounded-2xl p-5 text-left glass transition-transform active:scale-[0.98] group`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs mt-0.5 opacity-70">{action.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
