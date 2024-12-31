import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function BreadCrumb({
  rootPath,
  slug,
}: {
  rootPath: string;
  slug: string;
}) {
  return (
    <div className="mb-2 flex gap-1 text-primary-grey">
      <Link href={`/${rootPath}`}>
        {rootPath
          .split("")
          .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
          .join("")}
      </Link>
      <span>
        <ChevronRight strokeWidth={1} />
      </span>
      <span className="text-primary-black">
        {slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    </div>
  );
}
