"use client";
import { Tag } from "../../common/type";
import { useState } from "react";

export default function TagList({ tagList }: { tagList: Tag[] }) {
  const [activeTagId, setActiveTagId] = useState(0);

  return (
    <ul className="w-1/6 max-w-sm min-h-8 text-gray-600 bg-white/50 absolute top-26 right-8 rounded-md flex flex-wrap justify-start items-start px-2 py-4">
      {tagList.map((item) => {
        return (
          <li
            key={item.id}
            className={`relative px-2 py-1 self-start line-clamp-1 cursor-pointer transition-all hover:underline decoration-solid ${
              activeTagId === item.id ? "underline font-bold text-gray-800" : ""
            }`}
            onClick={() => setActiveTagId(item.id)}
          >
            #{item.name}
          </li>
        );
      })}
    </ul>
  );
}
