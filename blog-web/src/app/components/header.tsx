import Image from "next/image";
import logoImg from "../../../public/logo.jpg";
import Link from "next/link";

export default function Header() {
  const menuList = [
    { name: "首页", path: "/" },
    { name: "关于", path: "/about" },
  ];

  return (
    <div className="h-16 flex items-center justify-between px-8 shadow-md sticky top-0 backdrop-blur-sm bg-white/90 z-50">
      <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-200 cursor-pointer hover:scale-110 transition-all overflow-hidden hover:rotate-12">
        <Image src={logoImg} alt="头像" />
      </div>
      <ul className="flex cursor-pointer">
        {menuList.map((item, i) => (
          <li
            key={i}
            className="px-4 py-1 rounded-md hover:bg-gray-200/80 transition-all"
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
