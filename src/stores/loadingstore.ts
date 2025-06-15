import { create } from 'zustand';

interface LoadingState {
  state: boolean;
  setState: (newState: boolean) => void;
}

const useLoadingScreen = create<LoadingState>((set) => ({
  state: false,
  setState: (newState) => set({ state: newState }),
}));

export default useLoadingScreen;
