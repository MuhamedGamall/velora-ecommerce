"use server";
import { client } from "../sanity/lib/client";

export const getHeroSection = async (): Promise<{
  image: string;
  title: string;
  description: string;
} | null> => {
  try {
    const query = `*[_type == "heroSection"][0]{
      title,
      description,
      image {
        asset->{
          _id,
          url
        }
      }
    }`;

    const { image, title, description } = await client.fetch(query);

    return {
      image: image?.asset?.url,
      title,
      description,
    };
  } catch (error) {
    console.log("Error fetching hero image: ", error);
    return null;
  }
};
