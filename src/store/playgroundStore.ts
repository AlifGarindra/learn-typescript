import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SnippetSimpan {
  id: string;
  judul: string;
  kode: string;
  disimpanPada: number;
}

interface PlaygroundStore {
  kode: string;
  setKode: (kode: string) => void;
  snippetSimpan: SnippetSimpan[];
  simpanSnippet: (judul: string, kode: string) => void;
  hapusSnippet: (id: string) => void;
}

export const usePlaygroundStore = create<PlaygroundStore>()(
  persist(
    (set, get) => ({
      kode: '',
      setKode: (kode) => set({ kode }),
      snippetSimpan: [],
      simpanSnippet: (judul, kode) => {
        const snippet: SnippetSimpan = {
          id: Date.now().toString(),
          judul,
          kode,
          disimpanPada: Date.now(),
        };
        set({ snippetSimpan: [snippet, ...get().snippetSimpan].slice(0, 20) });
      },
      hapusSnippet: (id) =>
        set({ snippetSimpan: get().snippetSimpan.filter((s) => s.id !== id) }),
    }),
    { name: 'learn-ts-playground' }
  )
);
