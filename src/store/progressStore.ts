import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressStore {
  completed: Set<string>;
  markCompleted: (topikId: string) => void;
  isCompleted: (topikId: string) => boolean;
  totalCompleted: () => number;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completed: new Set<string>(),
      markCompleted: (topikId) =>
        set((state) => ({
          completed: new Set([...state.completed, topikId]),
        })),
      isCompleted: (topikId) => get().completed.has(topikId),
      totalCompleted: () => get().completed.size,
    }),
    {
      name: 'learn-ts-progress',
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name);
          if (!raw) return null;
          const parsed = JSON.parse(raw);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              completed: new Set(parsed.state.completed),
            },
          };
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              completed: [...value.state.completed],
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
