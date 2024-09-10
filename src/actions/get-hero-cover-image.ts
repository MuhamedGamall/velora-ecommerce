'use server'
import { client } from "../sanity/lib/client";

export const getHeroCoverImage = async () => {
  try {
    const query = '*[_type == "heroImage"][0]';
    const image = await client.fetch(query);
    console.log(image);

    return image;
  } catch (error) {
    console.log('Error fetching hero image: ', error);
    return null;
  }
};
