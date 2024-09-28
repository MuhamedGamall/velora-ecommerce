import { create } from "zustand";

interface CategoriesFilterDrawerModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCategoriesFilterDrawerModal = create<CategoriesFilterDrawerModalState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useCategoriesFilterDrawerModal;
