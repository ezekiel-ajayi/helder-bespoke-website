// src/store/useCollectionsStore.ts
//
// Holds which collections (from lib/collection-images.ts) the visitor
// has selected in the Lookbook. Read by the Contact form to populate
// the "What are we making?" section. Supports multiple simultaneous
// selections.

import { create } from "zustand";

export type SelectedCollection = {
  id: string;
  name: string;
  price: string;
};

type CollectionsState = {
  selected: SelectedCollection[];
  isSelected: (id: string) => boolean;
  select: (item: SelectedCollection) => void;
  unselect: (id: string) => void;
  toggle: (item: SelectedCollection) => void;
  clear: () => void;
};

export const useCollectionsStore = create<CollectionsState>((set, get) => ({
  selected: [],

  isSelected: (id) => get().selected.some((c) => c.id === id),

  select: (item) =>
    set((state) =>
      state.selected.some((c) => c.id === item.id)
        ? state
        : { selected: [...state.selected, item] }
    ),

  unselect: (id) =>
    set((state) => ({
      selected: state.selected.filter((c) => c.id !== id),
    })),

  toggle: (item) =>
    set((state) => {
      const exists = state.selected.some((c) => c.id === item.id);
      return {
        selected: exists
          ? state.selected.filter((c) => c.id !== item.id)
          : [...state.selected, item],
      };
    }),

  clear: () => set({ selected: [] }),
}));
