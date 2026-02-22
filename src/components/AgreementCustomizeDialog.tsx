import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { partnerCandidates, type AgreementTemplate, type Agreement } from "@/data/mockData";

interface Props {
  template: AgreementTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (agreement: Agreement) => void;
}

const validityOptions = [
  { value: "3", label: "3 months" },
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
];

const AgreementCustomizeDialog = ({ template, open, onOpenChange, onSave }: Props) => {
  const { toast } = useToast();
  const [partner, setPartner] = useState("");
  const [title, setTitle] = useState("");
  const [terms, setTerms] = useState("");
  const [validity, setValidity] = useState("6");
  const [includeAccountData, setIncludeAccountData] = useState(false);

  if (!template) return null;

  const resetForm = () => {
    setPartner("");
    setTitle("");
    setTerms("");
    setValidity("6");
    setIncludeAccountData(false);
  };

  const buildAgreement = (status: "draft" | "sent"): Agreement => {
    const now = new Date().toISOString().split("T")[0];
    const expDate = new Date();
    expDate.setMonth(expDate.getMonth() + parseInt(validity));
    const selectedPartner = partnerCandidates.find((p) => p.id === partner);

    return {
      id: `agr-${Date.now()}`,
      templateId: template.id,
      templateTitle: template.title,
      partnerName: selectedPartner?.name ?? "Unknown Partner",
      title: title || template.title,
      status,
      createdAt: now,
      sentAt: status === "sent" ? now : undefined,
      expiresAt: expDate.toISOString().split("T")[0],
    };
  };

  const handleSaveDraft = () => {
    onSave(buildAgreement("draft"));
    toast({ title: "Draft saved", description: "Agreement saved to your drafts." });
    resetForm();
    onOpenChange(false);
  };

  const handleSend = () => {
    if (!partner) {
      toast({ title: "Select a partner", description: "Please choose a partner before sending.", variant: "destructive" });
      return;
    }
    onSave(buildAgreement("sent"));
    const selectedPartner = partnerCandidates.find((p) => p.id === partner);
    toast({ title: "Agreement sent!", description: `Sent to ${selectedPartner?.name} for approval.` });
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{template.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Partner */}
          <div className="space-y-2">
            <Label>Partner</Label>
            <Select value={partner} onValueChange={setPartner}>
              <SelectTrigger>
                <SelectValue placeholder="Select a partner…" />
              </SelectTrigger>
              <SelectContent>
                {partnerCandidates.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Agreement title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={template.title} />
          </div>

          {/* Custom terms */}
          <div className="space-y-2">
            <Label>Custom terms</Label>
            <Textarea value={terms} onChange={(e) => setTerms(e.target.value)} placeholder="Add any custom clauses or notes…" rows={4} />
          </div>

          {/* Validity */}
          <div className="space-y-2">
            <Label>Validity period</Label>
            <Select value={validity} onValueChange={setValidity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {validityOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Privacy toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="account-data" className="cursor-pointer">Include account-level data</Label>
            <Switch id="account-data" checked={includeAccountData} onCheckedChange={setIncludeAccountData} />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-1.5" />
              Save as Draft
            </Button>
            <Button className="flex-1" onClick={handleSend}>
              <Send className="w-4 h-4 mr-1.5" />
              Send for Approval
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgreementCustomizeDialog;
