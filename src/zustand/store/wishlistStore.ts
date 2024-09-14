import getCurrentSession from "@/actions/get-current-session";
import addProductToWishlist from "@/actions/wishlist/add-to-wishlist";
import getWishlist from "@/actions/wishlist/get-wishlist";
import removeFromWishlist from "@/actions/wishlist/remove-from-wishlist";
import resetWishlist from "@/actions/wishlist/reset-wishlist";
import { Product, ShoppingBag, Wishlist } from "@/types";
import { create } from "zustand";

interface WishlistState {
  wishlist: Wishlist[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  fetchWishlist: () => Promise<void>;
  setWishlist: (items: ShoppingBag[]) => void;
  addToWishlist: (params: {
    userId: string;
    product: Product;
    pathname: string;
  }) => Promise<void>;
  removeFromWishlist: (params: {
    userId: string;
    productId: string;
    pathname: string;
  }) => Promise<void>;
  resetWishlist: (pathname: string) => Promise<void>;
}

const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: [],
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  fetchWishlist: async () => {
    try {
      const session = await getCurrentSession();

      if (!session?.user?._id) {
        throw "User ID not found";
      }
      const { wishlist } = await getWishlist({
        userId: session.user._id,
      });
      set({ wishlist: wishlist || [] });
    } catch (error:any) {
      set({ wishlist: [] });
      throw new Error("fetching wishlist:", error);
    }
  },

  setWishlist: (items) => set({ wishlist: items }),

  addToWishlist: async ({ product, ...params }) => {
    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw "User ID not found";
      }
      set((state) => ({
        wishlist: [...state.wishlist, { product }],
      }));

      const response = await addProductToWishlist({
        ...params,
        productId: product._id,
        productTitle: product.title,
      });

      if (!response) {
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => item.product._id !== product._id
          ),
        }));
        throw "Failed to add to wishlist";
      }
    } catch (error: any) {
      set((state) => ({
        wishlist: state.wishlist.filter(
          (item) => item.product._id !== product._id
        ),
      }));
      throw new Error("Error adding product to the wishlist:", error);
    }
  },

  removeFromWishlist: async (params) => {
    let backupState;

    set((state) => {
      backupState = state.wishlist;
      return {
        wishlist: state.wishlist?.filter(
          (item) => item.product._id !== params?.productId
        ),
      };
    });

    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw "User ID not found";
      }
      const response = await removeFromWishlist(params);

      if (!response) {
        set({ wishlist: backupState });
        throw "Failed to remove from shopping bag, please try again";
      }
    } catch (error: any) {
      set({ wishlist: backupState });
      throw new Error("Error removing product from the wishlist:", error);
    }
  },

  resetWishlist: async (pathname) => {
    let backupState;
    set((state) => {
      backupState = state.wishlist;
      return {
        wishlist: [],
      };
    });
    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw "User ID not found";
      }
      const response = await resetWishlist({
        userId: session.user._id,
        pathname,
      });

      if (!response) {
        set({ wishlist: backupState });
        throw "Failed to reseting shopping bag, please try again";
      }
    } catch (error: any) {
      set({ wishlist: backupState });
      throw new Error("Error removing product from the wishlist:", error);
    }
  },
}));

export default useWishlistStore;
