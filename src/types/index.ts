export interface UserProfile {
  _type: string;
  name: string;
  _id: string;
  _updatedAt: Date;
  email: string;
  image: string;
  _createdAt: Date;
  _rev: string;
  shoppingBag: ShoppingBag[];
}


export interface CurrentServerSession {
  user: UserProfile;
  expires: Date;
}
export interface CurrentClientSession {
  data: CurrentServerSession;
  status: "authenticated" | "loading" | "unauthenticated";
  update: any;
}
export type ProductType = "featured" | "trending" | "related";

export interface Product {
  _ref?: string;
  _createdAt: string;
  brand: string;
  images: ImageObject[];
  image?: ImageObject;
  secondaryImage: ImageObject;
  moreInformation: MoreInformationObject[];
  oldPrice: number;
  isNew: boolean;
  price: number;
  desc: string;
  _rev: string;
  type: ProductType;
  maxPurchaseQty: number;
  category: CategoryObject;
  colour: string;
  salesCount: number;
  subCategory: SubCategoryObject;
  pattern: string;
  _type: string;
  _id: string;
  _updatedAt: string;
  qtyInStock: number;
  title: string;
  material: string;
  sizes: string[];
}
export interface ShoppingBag {
  _key: string;
  _type: string;
  product: Product;
  size: string;
  quantity: number;
}
export interface ImageObject {
  _type: "image";
  asset: {
    _ref?: string;
    _type?: string;
    _id?: string;
    url: string;
  };
}

interface CategoryObject {
  _ref?: string;
  _type?: string;
  _key?: string;
  _id?: string;
  title?: string;
  categoryImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };
}

interface SubCategoryObject {
  _ref?: string;
  _type?: string;
  _key?: string;
  _id?: string;
  title?: string;
}

export interface MoreInformationObject {
  infoText: string;
  _key: string;
}
