import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Link2 } from "lucide-react";

const SettingsView = () => {
  const [hideLeads, setHideLeads] = useState(false);
  const [hideRevenue, setHideRevenue] = useState(true);

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Data ingestion & privacy
        </p>
      </div>

      {/* CRM Connection */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-5 mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Link2 className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">CRM Connection</h2>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Salesforce</p>
            <p className="text-xs text-muted-foreground">Last synced 2 hours ago</p>
          </div>
          <span className="text-xs font-medium text-match-high bg-match-high/10 px-2.5 py-1 rounded-full">
            Connected
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-foreground">HubSpot</p>
            <p className="text-xs text-muted-foreground">Not connected</p>
          </div>
          <button className="text-xs font-medium text-primary">Connect</button>
        </div>
      </motion.div>

      {/* Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="glass rounded-2xl p-5 mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Privacy Controls</h2>
        </div>
        {[
          { label: "Hide lead names from partners", desc: "Partners will only see account counts", value: hideLeads, set: setHideLeads },
          { label: "Hide revenue data", desc: "Revenue metrics stay private", value: hideRevenue, set: setHideRevenue },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              {item.value ? (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Eye className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            <button
              onClick={() => item.set(!item.value)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                item.value ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-card shadow-sm transition-transform ${
                  item.value ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </motion.div>

      {/* Populations */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="glass rounded-2xl p-5"
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">CRM Populations</h2>
        <p className="text-xs text-muted-foreground mb-3">
          Map your CRM statuses into populations for account mapping
        </p>
        {["Prospects", "Customers", "Open Deals"].map((pop) => (
          <div key={pop} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <span className="text-sm font-medium text-foreground">{pop}</span>
            <span className="text-xs text-muted-foreground">Auto-mapped</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SettingsView;
