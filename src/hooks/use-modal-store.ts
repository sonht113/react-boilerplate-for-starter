import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useModalStore;
