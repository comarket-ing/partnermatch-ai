import { Badge } from "@/components/ui/badge";
import type { AgreementStatus } from "@/data/mockData";

const statusConfig: Record<AgreementStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground border-transparent" },
  pending_review: { label: "Pending", className: "bg-amber-100 text-amber-800 border-transparent dark:bg-amber-900/30 dark:text-amber-300" },
  sent: { label: "Sent", className: "bg-blue-100 text-blue-800 border-transparent dark:bg-blue-900/30 dark:text-blue-300" },
  signed: { label: "Signed", className: "bg-emerald-100 text-emerald-800 border-transparent dark:bg-emerald-900/30 dark:text-emerald-300" },
  expired: { label: "Expired", className: "bg-red-100 text-red-800 border-transparent dark:bg-red-900/30 dark:text-red-300" },
};

interface Props {
  status: AgreementStatus;
}

const AgreementStatusBadge = ({ status }: Props) => {
  const { label, className } = statusConfig[status];
  return <Badge className={className}>{label}</Badge>;
};

export default AgreementStatusBadge;
