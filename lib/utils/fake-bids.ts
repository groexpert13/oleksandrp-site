import { marketplaceItems } from '../marketplace-types';

export const EMAILS = Array.from({ length: 33 }, (_, i) => `user${i + 1}@gmail.com`);

function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let memoryStore: Record<string, string> | null = null;
function getStore() {
  if (typeof sessionStorage !== 'undefined') return sessionStorage;
  if (!memoryStore) memoryStore = {};
  return {
    getItem: (k: string) => (memoryStore as Record<string,string>)[k] || null,
    setItem: (k: string, v: string) => { (memoryStore as Record<string,string>)[k] = v; }
  };
}

export function __resetFakeBidData() {
  memoryStore = {};
  cache = null;
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  const masked = name.slice(0, 2) + '*'.repeat(Math.max(name.length - 2, 0));
  return `${masked}@${domain}`;
}

export interface FakeBidData { count: number; email: string; }

function initFakeData() {
  const store = getStore();
  const existing = store.getItem('fakeBidData');
  if (existing) return JSON.parse(existing) as Record<string, FakeBidData>;

  const shuffledEmails = shuffle(EMAILS);
  const data: Record<string, FakeBidData> = {};
  marketplaceItems.forEach((item, idx) => {
    data[item.id] = {
      count: Math.floor(Math.random() * 5) + 1,
      email: shuffledEmails[idx % shuffledEmails.length]
    };
  });
  store.setItem('fakeBidData', JSON.stringify(data));
  return data;
}

let cache: Record<string, FakeBidData> | null = null;

export function getFakeBidData(itemId: string): FakeBidData {
  if (!cache) cache = initFakeData();
  return cache[itemId];
}
