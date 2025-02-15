"use client";

import { Skeleton } from "./ui/skeleton";
import { Blob } from "./blob";
import { useQuery } from "@tanstack/react-query";
import { getBlobs } from "@/actions/blob";
import { BlobList } from "./blob-list";

export function BlobFeed() {
  const { data: blobs } = useQuery({
    queryKey: ["blob"],
    queryFn: () => getBlobs(),
  });

  return <BlobList blobs={blobs} />;
}
