import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, ExternalLink, Users, DollarSign, Briefcase } from "lucide-react";
import { partnerCandidates, PartnerCandidate } from "@/data/mockData";
import MatchScoreRing from "@/components/MatchScoreRing";

const Discovery = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<PartnerCandidate | null>(null);

  const filtered = partnerCandidates.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          AI Discovery Hub
        </h1>
        <p className="text-muted-foreground mt-1">
          Partners matched to your ICP by AI
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search partners or industries..."
          className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {/* Partner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((partner, i) => (
          <motion.button
            key={partner.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(partner)}
            className="glass rounded-2xl p-5 text-left transition-all hover:shadow-lg active:scale-[0.98] group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
                  {partner.logo}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{partner.name}</p>
                  <p className="text-xs text-muted-foreground">{partner.industry}</p>
                </div>
              </div>
              <MatchScoreRing score={partner.matchScore} size={44} />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {partner.sharedTech.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {partner.overlapAccounts} overlapping accounts
            </p>
          </motion.button>
        ))}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 z-40"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:top-0 md:w-[420px] md:right-0 z-50 bg-card rounded-t-3xl md:rounded-none md:border-l border-border shadow-2xl max-h-[85vh] md:max-h-full overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-base font-semibold text-foreground">
                      {selected.logo}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{selected.name}</h2>
                      <p className="text-sm text-muted-foreground">{selected.industry}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <MatchScoreRing score={selected.matchScore} size={64} />
                  <div>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                    <p className="text-sm font-medium text-foreground">
                      {selected.matchScore >= 80 ? "Excellent fit" : selected.matchScore >= 60 ? "Good fit" : "Moderate fit"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {selected.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Employees:</span>
                    <span className="font-medium text-foreground">{selected.employees}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Funding:</span>
                    <span className="font-medium text-foreground">{selected.funding}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Website:</span>
                    <span className="font-medium text-primary">{selected.website}</span>
                  </div>
                </div>

                {selected.hiringSignals.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Hiring Signals
                    </p>
                    <div className="space-y-1.5">
                      {selected.hiringSignals.map((signal) => (
                        <div key={signal} className="flex items-center gap-2 text-sm">
                          <Briefcase className="w-3.5 h-3.5 text-match-medium" />
                          <span className="text-foreground">{signal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selected.sharedTech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                    <Sparkles className="w-4 h-4" />
                    Generate AI Pitch
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-5 py-3 rounded-xl text-sm font-medium bg-secondary text-secondary-foreground active:scale-[0.98] transition-transform"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Discovery;
