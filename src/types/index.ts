export interface ProjectInterface {}

export interface UserProfile {
  _type: string;
  name: string;
  _id: string;
  _updatedAt: Date;
  email: string;
  image: string;
  _createdAt: Date;
  _rev: string;
}

export interface CurrentServerSession {
  user: UserProfile;
  expires: Date;
}

export type ProductType = "featured" | "trending" | "normal";

export interface Product {
  _createdAt: string;
  brand: string;
  images: ImageObject[];
  secondaryImage: ImageObject;
  description: string;
  moreInformation: MoreInformationObject[];
  oldPrice: number;
  isNew: boolean;
  price: number;
  desc: string;
  _rev: string;
  type: ProductType;
  maxPurchaseQty: number;
  category: CategoryObject[];
  colour: string;
  salesCount: number;
  subCategory: SubCategoryObject[];
  patterns: string;
  _type: string;
  _id: string;
  _updatedAt: string;
  qtyInStock: number;
  title: string;
  material: string;
  sizes: string[];
}

interface ImageObject {
  _type: "image";
  asset: {
    _ref: string;
    _type: string;
  };
}

interface CategoryObject {
  _ref: string;
  _type: string;
  _key: string;
}
interface MoreInformationObject {
  infoText: string;
  _key: string;
}
interface SubCategoryObject {
  _ref: string;
  _type: string;
  _key: string;
}
