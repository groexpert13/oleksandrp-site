import { marketplaceItems } from '../marketplace-types';

const TOTAL_EMAILS = marketplaceItems.length * 5;
export const EMAILS = Array.from({ length: TOTAL_EMAILS }, (_, i) => `user${i + 1}@gmail.com`);

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

export function maskEmail(email?: string): string {
  if (!email) return '';
  const [name, domain] = email.split('@');
  const masked = name.slice(0, 2) + '*'.repeat(Math.max(name.length - 2, 0));
  return `${masked}@${domain}`;
}

export interface FakeBidData {
  count: number;
  email: string;
  emails: string[];
}

function initFakeData() {
  const store = getStore();
  const existing = store.getItem('fakeBidData');
  if (existing) return JSON.parse(existing) as Record<string, FakeBidData>;

  const shuffledEmails = shuffle(EMAILS);
  const data: Record<string, FakeBidData> = {};
  let emailIdx = 0;
  marketplaceItems.forEach((item) => {
    const count = Math.floor(Math.random() * 5) + 1;
    const emails = shuffledEmails.slice(emailIdx, emailIdx + count);
    emailIdx += count;
    data[item.id] = {
      count,
      email: emails[emails.length - 1],
      emails,
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
