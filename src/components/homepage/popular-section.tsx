import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import BlueCTAButton from "../buttons/blue-cta-button";
import { getEntries } from "@/utils/get-contentful-data";
import { ContentfulCategories } from "@/types/contentful";

export default async function PopularSection() {
  const categories = await getEntries<ContentfulCategories>({
    content_type: "bumpBlogCategory",
    fields_popular: true,
  });

  if (categories) {
    return (
      <section className="mx-auto flex min-h-[calc(100vh-100px)] max-w-[1100px] items-center p-5">
        <div className="grid w-full grid-cols-[min-content_1fr] grid-rows-4 gap-5 [grid-template-areas:'F_A''B_C''D_C''E_E'] md:h-[500px] md:grid-cols-3 md:grid-rows-[1fr_1fr_min-content] md:[grid-template-areas:'A_B_C''D_E_C''D_E_F']">
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2"
                style={{ gridArea: String.fromCharCode(65 + index) }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="grid grid-cols-[1fr_min-content] items-center justify-between"
                >
                  <span className="rounded-3xl font-light">
                    {"0" + index + " " + category.name.toUpperCase()}
                  </span>
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-primary-black">
                    <ChevronRight size={15} strokeWidth={1} />
                  </span>
                </Link>
                <Link
                  href={`/categories/${category.slug}`}
                  className={`relative h-full overflow-hidden rounded-3xl`}
                >
                  <Image
                    src={`https:${category.image.fields.file.url}`}
                    alt="Categories thumbnail image"
                    fill
                    className="object-cover hover:brightness-110"
                  />
                </Link>
              </div>
            );
          })}
          <div style={{ gridArea: "F" }}>
            <span className="font-medium text-primary-blue">
              POPULAR CATEGORIES
            </span>
            <h2 className="mb-10 text-4xl font-bold">The Obvious Favorites</h2>
            <BlueCTAButton text="Another" href="/categories" />
          </div>
        </div>
      </section>
    );
  }
}
