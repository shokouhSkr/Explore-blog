"use client";

import { POST_PER_PAGE } from "@/helpers/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  count: number;
};

const Pagination = ({ page, count }: PaginationProps) => {
  const route = useRouter();

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="flex-center gap-40">
      <button
        type="button"
        disabled={!hasPrev}
        onClick={() => route.push(`?page=${page - 1}`)}
        className="bg-slate-200 transition-colors duration-200 rounded-full w-12 h-12 active:bg-neutral-300 hover:bg-neutral-300 flex-center py-2 disabled:opacity-50 disabled:bg-slate-200"
      >
        <ChevronLeft className="dark:text-neutral-800" />
      </button>
      <button
        type="button"
        disabled={!hasNext}
        onClick={() => route.push(`?page=${page + 1}`)}
        className="bg-slate-200 transition-colors duration-200 rounded-full w-12 h-12 active:bg-neutral-300 hover:bg-neutral-300 flex-center py-2 disabled:opacity-50 disabled:bg-slate-200"
      >
        <ChevronRight className="dark:text-neutral-800" />
      </button>
    </div>
  );
};

export default Pagination;
