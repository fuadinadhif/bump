import { Document } from "@contentful/rich-text-types";

export interface ContentfulImage {
  fields: {
    file: {
      url: string;
    };
  };
}

export interface ContentfulHero {
  title: string;
  description: string;
  images: ContentfulImage[];
  ctaText: string;
  ctaTarget: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentfulCategories {
  popular: true;
  name: string;
  slug: string;
  description: string;
  image: ContentfulImage;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentfulPost {
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  image: ContentfulImage;
  categories: { fields: ContentfulCategories }[];
  createdAt: Date;
  updatedAt: Date;
}
