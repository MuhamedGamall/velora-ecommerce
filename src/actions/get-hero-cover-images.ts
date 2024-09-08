import { client } from "../sanity/lib/client";

export const getHeroCoverImages = async () => {
  const bannerQuery = '*[_type == "images"]';
  const images = await client.fetch(bannerQuery);

  return {
    images,
  };
};
