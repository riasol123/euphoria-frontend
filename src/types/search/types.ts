export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface SearchState {
  city: string;
  dateRange?: DateRange;
  adults: number;
  children: number;
  durationFrom?: number;
  durationTo?: number;
  isAccommodation?: boolean;
  cuisineTypes?: number[];
  categoryTypes?: number[];
} 