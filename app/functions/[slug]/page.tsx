import { notFound } from "next/navigation";
import FunctionPageContent from "@/components/functions/FunctionPageContent";
import { functionCards } from "@/lib/types";

interface FunctionPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return functionCards.map((card) => ({
    slug: card.slug,
  }));
}

export default function FunctionPage({ params }: FunctionPageProps) {
  const { slug } = params;
  const functionCard = functionCards.find((card) => card.slug === slug);

  if (!functionCard) {
    notFound();
  }

  return <FunctionPageContent card={functionCard} />;
}