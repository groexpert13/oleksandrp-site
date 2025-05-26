// Types for database schemas

export interface Bid {
  id: string;
  itemId: string;
  email: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuctionOption {
  id: string;
  itemId: string;
  startDate: Date;
  endDate: Date;
  minBid: number;
  currentHighestBid?: number;
  currentHighestBidder?: string; // Masked email
  bidCount?: number;
}

// In-memory database for demonstration
export const bids: Bid[] = [];

export const generateRandomAuctionDuration = (): number => {
  // Random duration with non-round numbers (days, hours, minutes)
  const minDays = 3;
  const maxDays = 21;
  const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const randomHours = Math.floor(Math.random() * 24); // Random hours (0-23)
  const randomMinutes = Math.floor(Math.random() * 60); // Random minutes (0-59)
  
  // Convert to milliseconds
  return (randomDays * 24 * 60 * 60 * 1000) + // Days
         (randomHours * 60 * 60 * 1000) +     // Hours
         (randomMinutes * 60 * 1000);         // Minutes
};

// Generate auction options for each marketplace item
export const generateAuctionOptions = (itemIds: string[]): AuctionOption[] => {
  const now = new Date();
  
  return itemIds.map(itemId => {
    const duration = generateRandomAuctionDuration();
    const endDate = new Date(now.getTime() + duration);
    
    return {
      id: `auction-${itemId}`,
      itemId,
      startDate: now,
      endDate,
      minBid: 1000, // Starting minimum bid
    };
  });
}; 