export type PriceRange = {
  band: string;
  chosen_finish: string;
  observed_finish: string;
  finish_used: string;
  risk_score_capped: number;
  spread_pct: number;
  premium_count: number;
  flags: string[];
  final_low: number;
  final_high: number;
  note_finish_bumped: boolean;
};

export function calculatePriceRange(
  config: unknown,
  selectedBySectionId: Record<string, string>
): PriceRange | null;

export function formatGBP(value: number): string;
