import { calculateNetPremium } from "@/lib/pricing";
import { OptionLeg } from "@/lib/types";
import { Badge } from "./ui/badge";

export function NetBadge({ legs, atmPrice }: { legs: OptionLeg[], atmPrice: number }) {
  const netPremium = calculateNetPremium(legs, atmPrice)
  const label = netPremium > 0 ? 'credit' : netPremium < 0 ? 'debit' : 'neutral'
  return <Badge variant="secondary">{label}</Badge>
}
