import * as contentful from "contentful";

interface GetEntriesParams {
  content_type?: string;
  fields_slug?: string;
  fields_featured?: boolean;
  fields_popular?: boolean;
  keyword?: string;
  limit?: number;
  skip?: number;
}

const client = contentful.createClient({
  space: "qqx0zvtrc2ma",
  environment: "master",
  accessToken: "sB0F-guB28wVDj0r6uv2k0PnqXhvjpWfDF0iEq_JMSo",
});

export async function getEntries<T>({
  content_type,
  fields_slug,
  fields_featured,
  fields_popular,
  keyword,
  limit,
  skip,
}: GetEntriesParams = {}): Promise<T[] | null> {
  try {
    const data = await client.getEntries({
      content_type,
      limit,
      skip,
      "fields.slug": fields_slug,
      "fields.featured": fields_featured,
      "fields.popular": fields_popular,
      query: keyword,
    });

    return data.items.map((item) => ({
      ...item.fields,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
    })) as T[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
