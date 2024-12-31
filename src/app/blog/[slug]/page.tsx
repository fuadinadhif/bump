import Image from "next/image";
import { format } from "date-fns";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import { ContentfulPost } from "@/types/contentful";
import { getEntries } from "@/utils/get-contentful-data";
import BreadCrumb from "@/components/bread-crumb";

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const posts = await getEntries<ContentfulPost>({
    content_type: "bumpBlogPost",
    fields_slug: slug,
  });

  if (posts && posts?.length > 0) {
    const { title, image, categories, content, createdAt, updatedAt } =
      posts[0];

    return (
      <section className="mx-auto mt-[100px] max-w-[60ch] p-5">
        <div className="mb-5 flex h-72 w-full gap-4">
          {[10, 20, 65, 5].map((item, index) => (
            <div
              key={index}
              className={`relative h-full w-[${item}%] overflow-hidden rounded-3xl`}
            >
              <Image
                src={`https:${image.fields.file.url}`}
                alt="Featured image"
                fill
                className={`object-cover object-[left_0]`}
              />
            </div>
          ))}
        </div>
        <BreadCrumb rootPath="blog" slug={slug} />
        <h2 className="mb-3 text-4xl font-bold">{title}</h2>
        <p className="mb-3 font-light italic">
          Created at{" "}
          <span className="font-semibold">
            {format(new Date(createdAt), "MMMM do, yyyy")}.
          </span>{" "}
          {createdAt === updatedAt ? (
            ""
          ) : (
            <span>
              Updated at{" "}
              <span className="font-semibold not-italic">
                {format(new Date(updatedAt), "MMMM do, yyyy")}.
              </span>
            </span>
          )}
        </p>
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="rounded-full bg-secondary-grey px-4 py-2 text-sm"
            >
              {category.fields.name}
            </span>
          ))}
        </div>
        <div>
          {documentToReactComponents(content, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (node, children) => (
                <p className="mb-6">{children}</p>
              ),
            },
          })}
        </div>
      </section>
    );
  }
}
