export const dynamic = 'force-dynamic';

import SlidesClient from './SlidesClient';

export default function SlidesPage({ params: { id } }: { params: { id: string } }) {
  return <SlidesClient id={id} />;
} 