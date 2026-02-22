import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Star, ScrollText, X, Calendar, Building2, Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AgreementStatusBadge from "@/components/AgreementStatusBadge";
import AgreementCustomizeDialog from "@/components/AgreementCustomizeDialog";
import {
  agreementTemplates,
  agreements as initialAgreements,
  type AgreementTemplate,
  type Agreement,
} from "@/data/mockData";

interface Props {
  userRole: "manager" | "admin";
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" as const } }),
};

const Agreements = ({ userRole }: Props) => {
  const [myAgreements, setMyAgreements] = useState<Agreement[]>(initialAgreements);
  const [selectedTemplate, setSelectedTemplate] = useState<AgreementTemplate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(null);

  const handleUseTemplate = (tpl: AgreementTemplate) => {
    setSelectedTemplate(tpl);
    setDialogOpen(true);
  };

  const handleSaveAgreement = (agr: Agreement) => {
    setMyAgreements((prev) => [agr, ...prev]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">Agreements</h1>
        <p className="text-muted-foreground mt-1">Browse templates, customise and send for partner approval.</p>
      </div>

      <Tabs defaultValue="templates">
        <TabsList className="mb-6">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="my">My Agreements</TabsTrigger>
        </TabsList>

        {/* ── Templates Tab ── */}
        <TabsContent value="templates">
          {userRole === "admin" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-5 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings2 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Manage Templates</p>
                  <p className="text-xs text-muted-foreground">Add, edit or archive agreement templates</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Open Manager</Button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agreementTemplates.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="glass rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">{tpl.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {tpl.popularity}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">{tpl.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{tpl.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><ScrollText className="w-3.5 h-3.5" />{tpl.clausesCount} clauses</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Updated {tpl.lastUpdated}</span>
                  </div>
                </div>
                <Button size="sm" className="mt-4 w-full" onClick={() => handleUseTemplate(tpl)}>
                  Use Template
                </Button>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* ── My Agreements Tab ── */}
        <TabsContent value="my">
          {myAgreements.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground font-medium">No agreements yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Pick a template to get started.</p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {myAgreements.map((agr, i) => (
                <motion.button
                  key={agr.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => setSelectedAgreement(agr)}
                  className="w-full glass rounded-xl p-4 flex items-center justify-between text-left transition-all hover:ring-1 hover:ring-primary/20"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{agr.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{agr.partnerName} · {agr.templateTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs text-muted-foreground hidden sm:inline">{agr.createdAt}</span>
                    <AgreementStatusBadge status={agr.status} />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* ── Agreement Detail Panel ── */}
      <AnimatePresence>
        {selectedAgreement && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAgreement(null)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] glass z-50 border-l border-border overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedAgreement.title}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{selectedAgreement.partnerName}</p>
                  </div>
                  <button onClick={() => setSelectedAgreement(null)} className="p-1.5 rounded-lg hover:bg-accent transition-colors">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <AgreementStatusBadge status={selectedAgreement.status} />

                <div className="space-y-3 text-sm">
                  <DetailRow label="Template" value={selectedAgreement.templateTitle} />
                  <DetailRow label="Created" value={selectedAgreement.createdAt} />
                  {selectedAgreement.sentAt && <DetailRow label="Sent" value={selectedAgreement.sentAt} />}
                  {selectedAgreement.signedAt && <DetailRow label="Signed" value={selectedAgreement.signedAt} />}
                  {selectedAgreement.expiresAt && <DetailRow label="Expires" value={selectedAgreement.expiresAt} />}
                </div>

                <div className="flex gap-3 pt-2">
                  {selectedAgreement.status === "draft" && <Button className="flex-1">Send for Approval</Button>}
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedAgreement(null)}>Close</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Customize dialog */}
      <AgreementCustomizeDialog
        template={selectedTemplate}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveAgreement}
      />
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground font-medium">{value}</span>
  </div>
);

export default Agreements;
