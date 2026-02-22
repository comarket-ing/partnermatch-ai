import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { mappingData } from "@/data/mockData";

const userPops = ["Prospects", "Customers", "Open Deals"];
const partnerPops = ["Customers", "Prospects", "Open Deals"];

const Mapping = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getCount = (u: string, p: string) =>
    mappingData.find((d) => d.userPopulation === u && d.partnerPopulation === p)?.count ?? 0;

  const getColor = (count: number) => {
    if (count >= 15) return "bg-primary text-primary-foreground";
    if (count >= 8) return "bg-primary/20 text-primary";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          Account Mapping
        </h1>
        <p className="text-muted-foreground mt-1">
          Overlap with DataForge Analytics
        </p>
      </div>

      {/* Desktop Matrix */}
      <div className="hidden md:block glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border">
                Your \ Partner
              </th>
              {partnerPops.map((p) => (
                <th
                  key={p}
                  className="p-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border"
                >
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userPops.map((u) => (
              <tr key={u} className="border-b border-border last:border-0">
                <td className="p-4 text-sm font-medium text-foreground">{u}</td>
                {partnerPops.map((p) => {
                  const count = getCount(u, p);
                  return (
                    <td key={p} className="p-4 text-center">
                      <button
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${getColor(count)}`}
                      >
                        {count}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-2">
        {userPops.map((u) => (
          <div key={u} className="glass rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedRow(expandedRow === u ? null : u)}
              className="w-full flex items-center justify-between p-4"
            >
              <span className="text-sm font-semibold text-foreground">{u}</span>
              {expandedRow === u ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {expandedRow === u && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="border-t border-border"
              >
                {partnerPops.map((p) => {
                  const count = getCount(u, p);
                  return (
                    <button
                      key={p}
                      className="w-full flex items-center justify-between px-4 py-3 border-b border-border last:border-0 active:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Your {u}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Their {p}</span>
                      </div>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getColor(count)}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 glass rounded-2xl p-5">
        <p className="text-xs text-muted-foreground">
          💡 Click a cell to view matching accounts. Visibility depends on your partner's privacy settings.
        </p>
      </div>
    </div>
  );
};

export default Mapping;
