import { ExtendedBlob } from "@/types/db";
import { Blob } from "./blob";
import { Skeleton } from "./ui/skeleton";

interface BlobProps {
  blobs: ExtendedBlob[];
}

export function BlobList({ blobs }: BlobProps) {
  if (!blobs) return <BlobListSkeleton />;

  return (
    <div>
      {blobs.map((blob) => (
        <Blob key={blob.id} blob={blob} />
      ))}
    </div>
  );
}

function BlobListSkeleton() {
  return (
    <div className="space-y-4 p-6 pb-16 lg:pb-0">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-4 space-y-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
