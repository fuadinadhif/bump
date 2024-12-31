import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BlueCTAButton({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <Link href={href} className="flex">
      <span className="w-fit rounded-full bg-primary-blue px-6 py-3 text-white">
        {text}
      </span>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-blue text-white">
        <ChevronRight size={20} />
      </span>
    </Link>
  );
}
