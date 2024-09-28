"use server";
import { set } from "sanity";
import { client } from "../sanity/lib/client";

export const getHeroSection = async () => {
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
    console.error("Error fetching hero image: ", error);
    return {
      image: null,
      title: null,
      description: null,
    };
  }
};
