"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, Trash, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function getLinkClass(route: string) {
    return pathname == route
      ? "text-primary-black font-semibold"
      : "text-primary-grey";
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-10 mx-auto flex w-full max-w-[1100px] items-center justify-between gap-10 bg-white px-5 py-7">
      <div className="flex items-baseline gap-9">
        <Link href="/" className="flex font-raleway text-2xl font-extrabold">
          <span>B</span>
          <Trash className="mt-[1px]" />
          <span>MP</span>
        </Link>
        <div
          className={`${
            isMenuOpen
              ? "translate-x-0 opacity-50"
              : "-translate-x-full opacity-0"
          } fixed bottom-0 left-0 right-0 top-0 z-10 w-screen bg-black hover:cursor-pointer sm:hidden`}
          style={{
            transition: `${isMenuOpen ? "opacity 1000ms, transform 100ms" : "opacity 100ms, transform 1000ms"}`,
          }}
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <nav
          className={`${isMenuOpen ? "translate-x-0" : "translate-x-full"} fixed right-0 top-0 z-10 h-screen transition-all duration-300 sm:relative sm:h-fit sm:translate-x-0`}
        >
          <ul className="flex h-full min-w-[175px] flex-col gap-5 bg-white px-10 py-8 text-right text-sm sm:flex-row sm:p-0">
            <li className="block sm:hidden">
              <button
                className="ml-auto mt-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <X />
              </button>
            </li>
            <li>
              <Link className={getLinkClass("/blog")} href="/blog">
                BLOG
              </Link>
            </li>
            <li>
              <Link className={getLinkClass("/categories")} href="/categories">
                CATEGORIES
              </Link>
            </li>
            <li>
              <Link className={getLinkClass("/about")} href="/about">
                ABOUT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?keyword=${searchTerm}`);
            setSearchTerm("");
          }}
          className="grid grid-cols-[1fr_min-content]"
        >
          <input
            id="search"
            type="text"
            placeholder="..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full bg-secondary-grey px-4 py-2 text-sm font-light"
          />
          <button
            type="submit"
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary-grey"
          >
            <Search size={18} color="grey" />
          </button>
        </form>
        <button className="block sm:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu />
        </button>
      </div>
    </header>
  );
}
