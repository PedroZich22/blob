import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatCompactNumber(num: number): string {
  return Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

export function formatDateDistanceToNowWithSuffix(date: Date): string {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  });
}
