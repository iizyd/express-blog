"use client";
import { useRouter } from "next/navigation";

export default function Pager({ page }: { page: number }) {
  const router = useRouter();

  const handlePageChange = (pageNum: number) => {
    router.push(`/index/${pageNum}`);
  };

  const list = [1, 2, 3];
  return (
    <div className="h-8.5 w-4/5 flex justify-end items-center text-gray-600">
      {page !== 1 && (
        <button className="px-3 py-1.5 bg-slate-50 rounded-md mr-2 shadow-lg hover:text-gray-800 transition-transform active:bg-slate-200">
          上一页
        </button>
      )}
      {list.map((item, i) => {
        return (
          <span
            key={i}
            className={`px-3 py-1.5 bg-white/95 rounded-md mr-2 shadow-lg hover:text-gray-600 transition-transform active:bg-slate-200 cursor-pointer ${
              page === item
                ? "bg-sky-400 text-white hover:text-white active:bg-sky-400"
                : ""
            }`}
            onClick={() => handlePageChange(item)}
          >
            {item}
          </span>
        );
      })}
      <span className="px-3 py-1.5 bg-slate-50 rounded-md mr-2 shadow-lg">
        ...
      </span>
      <button className="px-3 py-1.5 bg-slate-50 rounded-md shadow-lg hover:text-gray-600 transition-transform active:bg-slate-200">
        下一页
      </button>
    </div>
  );
}
