"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { ContentfulCategories, ContentfulPost } from "@/types/contentful";
import { getEntries } from "@/utils/get-contentful-data";
import BlueCTAButton from "@/components/buttons/blue-cta-button";

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<ContentfulPost[]>([]);
  const [posts, setPosts] = useState<ContentfulPost[]>([]);
  const [categories, setCategories] = useState<ContentfulCategories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function getBlogData() {
      const posts = await getEntries<ContentfulPost>({
        content_type: "bumpBlogPost",
      });
      const categories = await getEntries<ContentfulCategories>({
        content_type: "bumpBlogCategory",
      });

      if (posts && categories) {
        setAllPosts(posts);
        setPosts(posts);
        setCategories(categories);
      }
    }

    getBlogData();
  }, []);

  function getPostsByCategory(category: string) {
    if (category === "All") {
      setPosts(allPosts);
    } else {
      const filteredPosts = allPosts.filter((post) =>
        post.categories
          .map((category) => category.fields.name)
          .includes(category),
      );

      setPosts(filteredPosts);
    }
  }

  return (
    <>
      <section className="mx-auto mt-[100px] grid min-h-[calc(100vh-185px)] max-w-[1100px] grid-cols-1 gap-16 p-5 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="mb-5 font-medium text-primary-blue">BLOG POSTS</h2>
          <div className="grid grid-cols-1 gap-16">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex h-full flex-col gap-7 md:flex-row"
              >
                <div className="flex h-72 w-full gap-2 md:h-full md:w-64">
                  <div className="relative h-full w-full overflow-hidden rounded-3xl md:w-12">
                    <Image
                      src={`https:${post.image.fields.file.url}`}
                      alt="Featured image"
                      fill
                      className="object-cover object-left"
                    />
                  </div>
                  <div className="relative hidden h-full w-full overflow-hidden rounded-3xl md:block">
                    <Image
                      src={`https:${post.image.fields.file.url}`}
                      alt="Featured image"
                      fill
                      className="object-cover object-[-2.5rem_0]"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold">{post.title}</h3>
                  <p className="mb-3">{post.excerpt}</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {post.categories.map((category, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-secondary-grey px-4 py-2 text-sm"
                      >
                        {category.fields.name}
                      </span>
                    ))}
                  </div>
                  <BlueCTAButton href={`/blog/${post.slug}`} text="Read More" />
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside>
          <div className="sticky top-[120px]">
            <h2 className="mb-5 font-medium text-primary-blue">
              BROWSE BY CATEGORY
            </h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <button
                className={`${selectedCategory === "All" ? "border-primary-black bg-secondary-grey" : "border-primary-blue"} rounded-full border px-3 py-1`}
                onClick={() => {
                  setSelectedCategory("All");
                  getPostsByCategory("All");
                }}
              >
                All
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`${selectedCategory === category.name ? "border-primary-black bg-secondary-grey" : "border-primary-blue"} rounded-full border px-3 py-1`}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    getPostsByCategory(category.name);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
