"use server";
import { client } from "../sanity/lib/client";

export const getHeroCoverImage = async () => {
  try {
    const query = '*[_type == "heroImage"][0]';
    const { image } = await client.fetch(query);
    return image?.asset?._ref;
  } catch (error) {
    console.log("Error fetching hero image: ", error);
    return null;
  }
};
