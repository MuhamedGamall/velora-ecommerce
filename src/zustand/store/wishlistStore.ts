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
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  resetWishlist: () => Promise<void>;
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
    } catch (error: any) {
      set({ wishlist: [] });
      throw new Error("fetching wishlist:", error);
    }
  },

  setWishlist: (items) => set({ wishlist: items }),

  addToWishlist: async (product) => {
    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw "User ID not found";
      }
      set((state) => ({
        wishlist: [...state.wishlist, { product }],
      }));

      const response = await addProductToWishlist({
        userId: session.user._id,
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

  removeFromWishlist: async (productId) => {
    let backupState;

    set((state) => {
      backupState = state.wishlist;
      return {
        wishlist: state.wishlist?.filter(
          (item) => item.product._id !== productId
        ),
      };
    });

    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw "User ID not found";
      }
      const response = await removeFromWishlist({
        productId,
        userId: session.user._id,
      });

      if (!response) {
        set({ wishlist: backupState });
        throw "Failed to remove from shopping bag, please try again";
      }
    } catch (error: any) {
      set({ wishlist: backupState });
      throw new Error("Error removing product from the wishlist:", error);
    }
  },

  resetWishlist: async () => {
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
      });

      if (!response) {
        set({ wishlist: backupState });
        throw "Failed to resetting shopping bag, please try again";
      }
    } catch (error: any) {
      set({ wishlist: backupState });
      throw new Error("Error removing product from the wishlist:", error);
    }
  },
}));

export default useWishlistStore;
