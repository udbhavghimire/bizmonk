"use client";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";

export default function ClientPagination({ currentPage, totalPages, baseUrl }) {
  const router = useRouter();

  const handlePageChange = (pageNumber) => {
    // Navigate to the new page using URL parameters
    router.push(`${baseUrl}?page=${pageNumber}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
