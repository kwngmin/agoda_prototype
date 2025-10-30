import { create } from 'zustand';

export type RestaurantItem = {
  id: string;
  name: string;
  videoId: string; // YouTube video id
  mapQuery: string; // Google Maps embed place/query
};

type ListingsState = {
  isExpanded: boolean;
  selectedId: string | null;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
  selectItem: (id: string) => void;
};

export const useListingsStore = create<ListingsState>((set) => ({
  isExpanded: false,
  selectedId: null,
  setExpanded: (expanded) => set({ isExpanded: expanded }),
  toggleExpanded: () => set((s) => ({ isExpanded: !s.isExpanded })),
  selectItem: (id) => set({ selectedId: id }),
}));


