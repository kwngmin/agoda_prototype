import { create } from 'zustand';

export type RestaurantItem = {
  id: string;
  name: string;
  videoId: string; // YouTube video id
  mapQuery: string; // Google Maps embed place/query
};

type ListingsState = {
  // which restaurant is selected for video playback
  selectedMainId: string | null;
  // when a subitem is clicked under a restaurant, show map
  selectedSub: { parentId: string; index: number } | null;
  // per-restaurant expand state
  expandedById: Record<string, boolean>;

  selectMain: (id: string) => void;
  selectSub: (parentId: string, index: number) => void;
  clearSelection: () => void;

  toggleExpanded: (id: string) => void;
  setExpanded: (id: string, expanded: boolean) => void;
};

export const useListingsStore = create<ListingsState>((set) => ({
  selectedMainId: null,
  selectedSub: null,
  expandedById: {},

  selectMain: (id) => set({ selectedMainId: id, selectedSub: null }),
  selectSub: (parentId, index) => set({ selectedSub: { parentId, index }, selectedMainId: parentId }),
  clearSelection: () => set({ selectedMainId: null, selectedSub: null }),

  toggleExpanded: (id) =>
    set((s) => ({ expandedById: { ...s.expandedById, [id]: !s.expandedById[id] } })),
  setExpanded: (id, expanded) =>
    set((s) => ({ expandedById: { ...s.expandedById, [id]: expanded } })),
}));


