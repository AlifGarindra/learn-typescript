import type { Topik } from '../types/lesson';

export const TEMPLATE_KOSONG = `// TypeScript Playground
// Tulis kode TypeScript kamu di sini

function sapa(nama: string): string {
  return \`Halo, \${nama}!\`;
}

console.log(sapa("TypeScript"));
`;

const TEMPLATES: Record<string, string> = {
  kosong: TEMPLATE_KOSONG,

  'basic-types': `// Types Dasar TypeScript
let nama: string = "Budi";
let umur: number = 25;
let aktif: boolean = true;

// Type inference — TS tebak sendiri
let kota = "Jakarta"; // bertipe string

// Union type
let id: string | number = "usr_001";
id = 42; // ✅ boleh

// Function dengan tipe
function formatUser(nama: string, umur: number): string {
  return \`\${nama} (\${umur} tahun)\`;
}

console.log(formatUser(nama, umur));
`,

  interface: `// Interface & Type Alias
interface Produk {
  id: number;
  nama: string;
  harga: number;
  stok?: number; // opsional
}

type StatusPesanan = "pending" | "diproses" | "selesai";

function formatProduk(p: Produk): string {
  return \`\${p.nama} — Rp \${p.harga.toLocaleString("id-ID")}\`;
}

const produk: Produk = {
  id: 1,
  nama: "Kaos Polos",
  harga: 75000,
};

console.log(formatProduk(produk));

let status: StatusPesanan = "pending";
console.log("Status:", status);
`,

  generics: `// Generics
function ambilPertama<T>(arr: T[]): T {
  return arr[0];
}

// TypeScript infer T dari argumen
const buah = ambilPertama(["apel", "mangga", "jeruk"]);
// buah: string ✓

const angka = ambilPertama([1, 2, 3]);
// angka: number ✓

// Generic dengan constraint
interface PunyaNama {
  nama: string;
}

function sapaSemua<T extends PunyaNama>(items: T[]): string[] {
  return items.map(item => \`Halo, \${item.nama}!\`);
}

const users = [{ nama: "Budi", umur: 25 }, { nama: "Ani", umur: 22 }];
console.log(sapaSemua(users));
`,

  'utility-types': `// Utility Types
interface User {
  id: number;
  nama: string;
  email: string;
  telepon: string;
}

// Partial: semua jadi opsional
type UpdateUser = Partial<User>;

// Pick: ambil sebagian
type ProfilPublik = Pick<User, "id" | "nama">;

// Omit: buang sebagian
type UserTanpaId = Omit<User, "id">;

// Record: key-value map
type RolePermissions = Record<string, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read"],
};

function updateUser(id: number, data: Partial<User>) {
  console.log(\`Update user \${id}:\`, data);
}

updateUser(1, { nama: "Budi Santoso" }); // ✅ tidak perlu semua field
`,

  react: `// TypeScript di React
import React, { useState } from "react";

interface Props {
  judulAwal: string;
  onSelesai?: (nilai: string) => void;
}

function FormInput({ judulAwal, onSelesai }: Props) {
  const [nilai, setNilai] = useState<string>(judulAwal);
  const [terkirim, setTerkirim] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTerkirim(true);
    onSelesai?.(nilai);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nilai}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNilai(e.target.value)
        }
      />
      <button type="submit">Kirim</button>
      {terkirim && <p>Terkirim: {nilai}</p>}
    </form>
  );
}
`,
};

export const daftarTemplate = [
  { id: 'kosong', label: 'Kosong' },
  { id: 'basic-types', label: 'Types Dasar' },
  { id: 'interface', label: 'Interface & Type' },
  { id: 'generics', label: 'Generics' },
  { id: 'utility-types', label: 'Utility Types' },
  { id: 'react', label: 'React Component' },
] as const;

export function getTemplate(id: string): string {
  return TEMPLATES[id] ?? TEMPLATE_KOSONG;
}

export function getStarterCodeFromTopik(topik: Topik): string {
  const candidates = [
    ...(topik.solusi_typescript?.contoh_kode ?? []),
    ...(topik.contoh_kode ?? []),
    ...(topik.konsep?.flatMap((k) => k.contoh_kode) ?? []),
    ...(topik.perbedaan_dengan_any?.contoh_kode ?? []),
    ...(topik.masalah_tanpa_generics?.contoh_kode ?? []),
    ...(topik.solusi_generics?.contoh_kode ?? []),
  ];

  const tsSnippet = candidates.find((c) => c.tipe === 'typescript');
  if (tsSnippet) return tsSnippet.kode;

  if (topik.contoh_nyata?.tipe === 'typescript') return topik.contoh_nyata.kode;

  return TEMPLATE_KOSONG;
}
