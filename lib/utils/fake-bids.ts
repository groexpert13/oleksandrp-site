import { marketplaceItems } from '../marketplace-types';

// Different email prefixes for variety
const EMAIL_PREFIXES = [
  'user', 'john', 'jane', 'alex', 'sarah', 'mike', 'emily', 'david', 'lisa', 'chris',
  'anna', 'mark', 'sofia', 'peter', 'maria', 'andrew', 'kate', 'daniel', 'elena', 'nick',
  'admin', 'developer', 'designer', 'manager', 'artist', 'writer', 'editor', 'buyer',
  'seller', 'trader', 'collector', 'bidder', 'customer', 'client', 'expert', 'pro'
];

// Different email domains for variety
const EMAIL_DOMAINS = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com',
  'protonmail.com', 'tutanota.com', 'zoho.com',
  'aol.com', 'live.com', 'msn.com', 'fastmail.com', 'mail.com'
];

// Generate diverse emails
function generateEmail(index: number): string {
  const prefix = EMAIL_PREFIXES[index % EMAIL_PREFIXES.length];
  const domain = EMAIL_DOMAINS[index % EMAIL_DOMAINS.length];
  
  // Add variety to email generation
  const variations = [
    `${prefix}${Math.floor(index / EMAIL_PREFIXES.length) + 1}@${domain}`,
    `${prefix}.${String.fromCharCode(97 + (index % 26))}@${domain}`,
    `${prefix}_${Math.floor(Math.random() * 99) + 1}@${domain}`,
    `${prefix}${String.fromCharCode(97 + (index % 26))}${Math.floor(index / 10) + 1}@${domain}`,
    `${prefix}.user${Math.floor(index / 5) + 1}@${domain}`
  ];
  
  return variations[index % variations.length];
}

// Generate enough unique emails for every possible bid
const TOTAL_EMAILS = marketplaceItems.length * 5;
export const EMAILS = Array.from({ length: TOTAL_EMAILS }, (_, i) => generateEmail(i));

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
    getItem: (k: string) => (memoryStore as Record<string, string>)[k] || null,
    setItem: (k: string, v: string) => { (memoryStore as Record<string, string>)[k] = v; }
  };
}

export function __resetFakeBidData() {
  memoryStore = {};
  cache = null;
}

export function maskEmail(email?: string): string {
  if (!email) return '';
  
  // If the email already contains asterisks, it's already masked
  if (email.includes('*')) {
    return email;
  }
  
  const [name, domain] = email.split('@');
  if (!domain) return email; // Return as is if not a valid email format
  
  if (name.length <= 2) return `${name}@${domain}`;
  const start = name.slice(0, 2);
  const end = name.length > 4 ? name.slice(-2) : name.slice(-1);
  const masked = start + '*'.repeat(Math.max(name.length - start.length - end.length, 0)) + end;
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