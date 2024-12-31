import Image from "next/image";

import BlueCTAButton from "../buttons/blue-cta-button";
import { getEntries } from "@/utils/get-contentful-data";
import { ContentfulHero } from "@/types/contentful";

export default async function HeroSection() {
  const data = await getEntries<ContentfulHero>({
    content_type: "bumpHeroSection",
  });

  if (data) {
    const { title, description, images, ctaText, ctaTarget } = data[0];

    return (
      <section className="mx-auto mt-[96px] flex min-h-[calc(100vh-100px)] max-w-[1100px] items-center p-5">
        <div className="grid h-full w-full grid-cols-1 items-end gap-14 sm:h-[450px] sm:grid-cols-[min-content_1fr]">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
            <h1 className="mb-6 text-5xl font-bold sm:text-7xl">{title}</h1>
            <p className="mb-10">{description}</p>
            <BlueCTAButton text={ctaText as string} href={`/${ctaTarget}`} />
          </div>
          <div className="grid h-[250px] w-full grid-cols-[3fr_2fr_1fr] grid-rows-1 gap-2 sm:h-full sm:gap-5 md:grid-cols-2 md:grid-rows-[300px_1fr]">
            {images.map((image, index: number) => (
              <div
                key={image.fields.file.url}
                className={`${index === 0 ? "md:col-span-2" : ""} relative h-full w-full overflow-hidden rounded-3xl`}
              >
                <Image
                  src={`https:${image.fields.file.url}`}
                  alt="Hero image"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
