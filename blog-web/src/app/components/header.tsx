"use client";
import Image from "next/image";
import logoImg from "../../../public/logo.jpg";
import Link from "next/link";
import React from "react";

export default function Header() {
  const menuList = [
    { name: "首页", path: "/" },
    { name: "博客", path: "/blog" },
  ];

  return (
    <nav className="flex items-center justify-between pt-6 px-2 bg-white">
      <Link href="/">
        <Image
          className="w-9 h-9 rounded-full border overflow-hidden cursor-pointer"
          src={logoImg}
          alt="头像"
        />
      </Link>

      <ul className="flex px-3 bg-white rounded-full shadow-lg shadow-gray-100 ring-1 ring-gray-100">
        {menuList.map((item, i) => (
          <Link key={i} href={item.path}>
            <li className="px-3 py-2 text-sm text-gray-700 transition-colors hover:text-black">
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
