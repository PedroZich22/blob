import { notFound } from "next/navigation";
import { getBlobById } from "@/actions/blob";
import { BlobDetail } from "@/components/blob-detail";

interface UserBlobPageProps {
  params: {
    blobId: string;
    userId: string;
  };
}

export default async function UserBlobPage({ params }: UserBlobPageProps) {
  const blob = await getBlobById(params.blobId);

  if (!blob) return notFound();

  return (
    <div className="p-4">
      <BlobDetail blob={blob} />
    </div>
  );
}
