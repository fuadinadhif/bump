"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import BlueCTAButton from "../buttons/blue-cta-button";
import { ContentfulPost } from "@/types/contentful";
import { getEntries } from "@/utils/get-contentful-data";

export default function FeaturedSection() {
  const [translatePos, setTranslatePos] = useState(0);
  const [featuredPosts, setFeaturedPosts] = useState<ContentfulPost[]>([]);

  useEffect(() => {
    async function getFeaturedPosts() {
      try {
        const data = await getEntries<ContentfulPost>({
          content_type: "bumpBlogPost",
          fields_featured: true,
        });

        if (data) {
          setFeaturedPosts(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getFeaturedPosts();
  }, []);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-100px)] max-w-[1100px] items-center p-5">
      <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_min-content]">
        <div className="h-[400px] w-fit overflow-hidden">
          <div
            className="grid gap-4 transition-all duration-300"
            style={{ transform: `translateY(${translatePos}px)` }}
          >
            {featuredPosts.map((post, index) => (
              <article
                key={index}
                className="grid h-[400px] grid-cols-1 grid-rows-[1fr_min-content] items-center gap-7 lg:grid-cols-[min-content_1fr] lg:grid-rows-1 lg:gap-14"
              >
                <div className="relative h-full w-full lg:w-[420px]">
                  <Image
                    src={`https:${post.image.fields.file.url}`}
                    alt="Featured  image for current featured post"
                    fill
                    className="mask-image object-cover"
                  />
                </div>
                <div>
                  <span className="font-medium text-primary-blue">
                    CURRENT FEATURED
                  </span>
                  <h2 className="mb-4 text-4xl font-bold">{post.title}</h2>
                  <p className="mb-4">{post.excerpt}</p>
                  <div className="mb-10 flex flex-wrap gap-2">
                    {post.categories.map((category, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-secondary-grey px-4 py-2 text-sm"
                      >
                        {category.fields.name}
                      </span>
                    ))}
                  </div>
                  <BlueCTAButton text="Read More" href={`/blog/${post.slug}`} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 grid h-fit w-fit grid-cols-2 gap-2 lg:static lg:w-12 lg:grid-cols-1 lg:gap-4">
          <button
            className="grid h-12 w-12 place-items-center rounded-full border bg-secondary-grey"
            disabled={translatePos === 0}
            onClick={() => setTranslatePos(translatePos + 416)}
          >
            <ChevronUp color={translatePos === 0 ? "grey" : "black"} />
          </button>
          <button
            className="grid h-12 w-12 place-items-center rounded-full border bg-secondary-grey"
            disabled={translatePos <= -800}
            onClick={() => setTranslatePos(translatePos - 416)}
          >
            <ChevronDown color={translatePos <= -800 ? "grey" : "black"} />
          </button>
        </div>
      </div>
    </section>
  );
}
