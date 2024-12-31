"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { ContentfulPost } from "@/types/contentful";
import { getEntries } from "@/utils/get-contentful-data";

export default function SearchPage() {
  return (
    <Suspense fallback="<p>Loading...</p>">
      <SearchComponent />
    </Suspense>
  );
}

function SearchComponent() {
  const [results, setResults] = useState<ContentfulPost[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  useEffect(() => {
    setIsLoading(true);

    async function getResults(keyword: string) {
      if (!keyword) {
        setResults([]);
      } else {
        const result = await getEntries<ContentfulPost>({
          keyword,
          content_type: "bumpBlogPost",
        });
        setResults(result);
      }

      setIsLoading(false);
    }

    getResults(keyword!);
  }, [keyword]);

  return (
    <section className="mx-auto mt-[100px] min-h-[calc(100vh-185px)] max-w-[1100px] p-5">
      <h2 className="font-lighter mb-10 text-2xl sm:text-4xl">
        Search Results For:{" "}
        <span className="font-bold">{keyword?.toUpperCase()}</span>
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : results && results.length > 0 ? (
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
          {results.map((post) => (
            <article
              key={post.slug}
              className="grid grid-cols-1 grid-rows-[300px_1fr] gap-7 sm:h-full sm:grid-cols-[1fr_250px] sm:grid-rows-1"
            >
              <Link href={`/blog/${post.slug}`} className="flex gap-2">
                <div className="relative hidden h-full w-12 overflow-hidden rounded-3xl lg:block">
                  <Image
                    src={`https:${post.image.fields.file.url}`}
                    alt="Featured image"
                    fill
                    className="bg-black object-cover object-left"
                  />
                </div>
                <div className="relative h-full w-full overflow-hidden rounded-3xl">
                  <Image
                    src={`https:${post.image.fields.file.url}`}
                    alt="Featured image"
                    fill
                    className="bg-black object-cover lg:object-[-2.5rem_0]"
                  />
                </div>
              </Link>
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mb-4 block text-2xl font-bold"
                >
                  {post.title}
                </Link>
                <p className="mb-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-secondary-grey px-4 py-2 text-sm"
                    >
                      {category.fields.name}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>No results were found</p>
      )}
    </section>
  );
}
