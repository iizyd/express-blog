"use client";
import Image from "next/image";
import logoImg from "../../../public/logo.jpg";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const menuList = [
    { name: "首页", path: "/" },
    { name: "关于", path: "/about" },
  ];
  const [activeName, setActiveName] = useState("首页");

  return (
    <div className="h-16 flex items-center justify-between px-8 shadow-md sticky top-0 backdrop-blur-sm bg-white/90 z-50">
      <div className="w-14 h-14 border border-gray-200/80 flex items-center justify-center rounded-full">
        <div className="relative h-12 w-12 rounded-full flex items-center justify-center bg-blue-200 cursor-pointer hover:scale-110 transition-all overflow-hidden hover:rotate-12">
          <Image src={logoImg} alt="头像" />
        </div>
      </div>

      <ul className="flex cursor-pointer">
        {menuList.map((item, i) => (
          <Link key={i} href={item.path} className="active:text-gray-500">
            <li
              onClick={() => setActiveName(item.name)}
              className={`relative px-4 py-1 rounded-md after:transition-all after:duration-800 after:origin-center font-bold after:content-[''] after:absolute after:-bottom-2 after:h-1 after:bg-blue-200  hover:after:w-full hover:after:left-0 ${
                activeName === item.name
                  ? "after:w-full after:left-0"
                  : "after:w-0 after:left-1/2"
              } ${i !== 0 ? "ml-0.5" : ""}`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
