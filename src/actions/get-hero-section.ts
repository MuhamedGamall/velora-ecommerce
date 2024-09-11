"use server";
import { urlFor } from "@/sanity/lib/image";
import { client } from "../sanity/lib/client";

export const getHeroSection = async (): Promise<{
  image: string;
  title: string;
  description: string;
} | null> => {
  try {
    const query = '*[_type == "heroSection"][0]';
    const { image, title, description } = await client.fetch(query);

    return {
      image: urlFor(image?.asset?._ref).toString(),
      title,
      description,
    };
  } catch (error) {
    console.log("Error fetching hero image: ", error);
    return null;
  }
};
