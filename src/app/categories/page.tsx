import { ContentfulCategories } from "@/types/contentful";
import { getEntries } from "@/utils/get-contentful-data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getEntries<ContentfulCategories>({
    content_type: "bumpBlogCategory",
  });

  if (categories && categories.length > 0) {
    return (
      <section className="mx-auto mt-[100px] min-h-[calc(100vh-185px)] max-w-[1100px] p-5">
        <h2 className="mb-5 font-medium text-primary-blue">CATEGORIES</h2>
        <div>
          {categories.map((category, index) => (
            <article key={index} className="mb-14">
              <div className="block grid-cols-[max-content_1fr] items-center gap-2 sm:grid">
                <h3 className="mb-0 text-2xl font-bold sm:mb-3 md:text-4xl">
                  {category.name}
                </h3>
                <div className="hidden grid-cols-[1fr_max-content] items-center sm:grid">
                  <div className="h-[0.5px] bg-primary-black"></div>
                  <Link href={`/categories/${category.slug}`} className="flex">
                    <span className="rounded-full border border-primary-black px-4 py-2">
                      See More
                    </span>
                    <span className="flex items-center justify-center rounded-full border border-primary-black px-2 py-2">
                      <ChevronRight strokeWidth={1} />
                    </span>
                  </Link>
                </div>
              </div>
              <p className="mb-4 sm:mb-0">{category.description}.</p>
              <div className="grid grid-cols-[1fr_max-content] items-center sm:hidden">
                <div className="h-[0.5px] bg-primary-black"></div>
                <Link href={`/categories/${category.slug}`} className="flex">
                  <span className="rounded-full border border-primary-black px-4 py-2">
                    See More
                  </span>
                  <span className="flex items-center justify-center rounded-full border border-primary-black px-2 py-2">
                    <ChevronRight strokeWidth={1} />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }
}
