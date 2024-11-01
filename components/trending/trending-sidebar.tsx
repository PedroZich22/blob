import type { Interest } from "@prisma/client";
import Link from "next/link";

interface TrendingSidebarProps {
  interests: Interest[];
}

export function TrendingSidebar({ interests }: TrendingSidebarProps) {
  return (
    <div className="sticky top-4">
      <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
      <div className="bg-white rounded-lg shadow p-4">
        {interests.map((interest) => (
          <Link
            key={interest.id}
            href={`/tag/${interest.name}`}
            className="block py-2 border-b last:border-0 hover:text-blue-500 transition-colors"
          >
            #{interest.name}
          </Link>
        ))}
      </div>
    </div>
  );
} 