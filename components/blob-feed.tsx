"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlobsFiltered } from "@/actions/blob";
import { BlobList } from "./blob-list";
import { useSearchParams } from "next/navigation";

export function BlobFeed() {
  const searchParams = useSearchParams();
  const selectedInterests = searchParams.get("interests")?.split(",") || [];

  const { data: blobs } = useQuery({
    queryKey: ["blob", selectedInterests],
    queryFn: () => getBlobsFiltered(selectedInterests),
  });

  return <BlobList blobs={blobs} />;
}
