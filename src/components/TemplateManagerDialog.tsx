import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Archive, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import type { AgreementTemplate } from "@/data/mockData";

const CATEGORIES = ["Co-Webinar", "Content Swap", "Lead Sharing", "Joint Campaign"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: AgreementTemplate[];
  onUpdate: (templates: AgreementTemplate[]) => void;
}

interface EditState {
  [id: string]: Partial<AgreementTemplate>;
}

const TemplateManagerDialog = ({ open, onOpenChange, templates, onUpdate }: Props) => {
  const [edits, setEdits] = useState<EditState>({});
  const [newTemplate, setNewTemplate] = useState<Partial<AgreementTemplate> | null>(null);

  const updateEdit = (id: string, patch: Partial<AgreementTemplate>) => {
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const handleSave = (id: string) => {
    const patch = edits[id];
    if (!patch) return;
    const updated = templates.map((t) =>
      t.id === id ? { ...t, ...patch, lastUpdated: new Date().toISOString().slice(0, 10) } : t
    );
    onUpdate(updated);
    setEdits((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    toast({ title: "Template saved", description: "Changes have been applied." });
  };

  const handleArchive = (id: string) => {
    const tpl = templates.find((t) => t.id === id);
    onUpdate(templates.filter((t) => t.id !== id));
    toast({ title: "Template archived", description: `"${tpl?.title}" has been removed.` });
  };

  const handleAddNew = () => {
    setNewTemplate({ title: "", category: CATEGORIES[0], description: "", clausesCount: 0 });
  };

  const handleSaveNew = () => {
    if (!newTemplate?.title?.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    const tpl: AgreementTemplate = {
      id: `tpl-${Date.now()}`,
      title: newTemplate.title!,
      category: newTemplate.category || CATEGORIES[0],
      description: newTemplate.description || "",
      clausesCount: newTemplate.clausesCount || 0,
      lastUpdated: new Date().toISOString().slice(0, 10),
      popularity: 0,
    };
    onUpdate([tpl, ...templates]);
    setNewTemplate(null);
    toast({ title: "Template created", description: `"${tpl.title}" added.` });
  };

  const getValue = (tpl: AgreementTemplate, field: keyof AgreementTemplate) =>
    edits[tpl.id]?.[field] ?? tpl[field];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Templates</DialogTitle>
          <DialogDescription>Add, edit or archive agreement templates</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end mb-2">
          <Button size="sm" onClick={handleAddNew} disabled={!!newTemplate}>
            <Plus className="w-4 h-4 mr-1" /> Add Template
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <AnimatePresence>
            {newTemplate && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="glass rounded-xl p-4 space-y-3 border border-primary/20"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">New</Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setNewTemplate(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Template title"
                  value={newTemplate.title || ""}
                  onChange={(e) => setNewTemplate((p) => ({ ...p, title: e.target.value }))}
                />
                <Select
                  value={newTemplate.category || CATEGORIES[0]}
                  onValueChange={(v) => setNewTemplate((p) => ({ ...p, category: v }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Description"
                  value={newTemplate.description || ""}
                  onChange={(e) => setNewTemplate((p) => ({ ...p, description: e.target.value }))}
                  rows={2}
                />
                <Input
                  type="number"
                  placeholder="Clauses count"
                  value={newTemplate.clausesCount || ""}
                  onChange={(e) => setNewTemplate((p) => ({ ...p, clausesCount: Number(e.target.value) }))}
                />
                <Button size="sm" onClick={handleSaveNew}>
                  <Save className="w-4 h-4 mr-1" /> Save
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {templates.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 } }}
              className="glass rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Input
                  className="font-semibold text-sm"
                  value={getValue(tpl, "title") as string}
                  onChange={(e) => updateEdit(tpl.id, { title: e.target.value })}
                />
                <Badge variant="secondary" className="text-xs shrink-0">★ {tpl.popularity}</Badge>
              </div>

              <Select
                value={(getValue(tpl, "category") as string)}
                onValueChange={(v) => updateEdit(tpl.id, { category: v })}
              >
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>

              <Textarea
                value={getValue(tpl, "description") as string}
                onChange={(e) => updateEdit(tpl.id, { description: e.target.value })}
                rows={2}
              />

              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  className="w-28"
                  value={getValue(tpl, "clausesCount") as number}
                  onChange={(e) => updateEdit(tpl.id, { clausesCount: Number(e.target.value) })}
                />
                <span className="text-xs text-muted-foreground">clauses</span>
                <span className="text-xs text-muted-foreground ml-auto">Updated {tpl.lastUpdated}</span>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!edits[tpl.id]}
                  onClick={() => handleSave(tpl.id)}
                >
                  <Save className="w-4 h-4 mr-1" /> Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleArchive(tpl.id)}
                >
                  <Archive className="w-4 h-4 mr-1" /> Archive
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateManagerDialog;
