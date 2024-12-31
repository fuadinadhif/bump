import { Trash } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 px-5 py-8 text-sm sm:flex-row">
      <div className="order-2 flex items-baseline gap-1 sm:order-1">
        <div className="flex font-raleway font-semibold">
          <span>B</span>
          <Trash size={13} className="mt-[3px]" />
          <span>MP</span>
        </div>
        <span>©</span>
        <span>2024.</span>
      </div>
      <nav className="order-1 sm:order-2">
        <ul className="flex gap-3">
          <li>
            <Link className="text-primary-grey text-sm" href="/blog">
              BLOG
            </Link>
          </li>
          <li>
            <Link className="text-primary-grey text-sm" href="/categories">
              CATEGORIES
            </Link>
          </li>
          <li>
            <Link className="text-primary-grey text-sm" href="/about">
              ABOUT
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
