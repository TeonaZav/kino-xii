"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useSessionsPagination = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return {
    currentPage,
    handlePageChange,
  };
};

export default useSessionsPagination;
