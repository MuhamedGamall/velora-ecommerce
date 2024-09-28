import { create } from "zustand";

interface FilterByDrawerModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFilterByDrawerModal = create<FilterByDrawerModalState>((set) => ({
  isOpen: false,
  onOpen: () =>  set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilterByDrawerModal;
