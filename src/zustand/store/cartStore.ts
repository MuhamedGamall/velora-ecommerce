import addProductToBag from "@/actions/add-to-bag";
import getCurrentSession from "@/actions/get-current-session";
import getShoppingBag from "@/actions/get-shopping-bag";
import removeProductFromBag from "@/actions/remove-from-bag";
import resetShoppingBag from "@/actions/reset-shopping-bag";
import { Product, ShoppingBag } from "@/types";
import { create } from "zustand";

interface ShoppingBagState {
  shoppingBag: ShoppingBag[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;  
  fetchShoppingBag: () => Promise<void>;
  setShoppingBag: (items: ShoppingBag[]) => void;
  addToBag: (params: {
    userId: string;
    product: Product;
    size: string;
    quantity: number;
    pathname: string;
  }) => Promise<void>;
  removeFromBag: (params: {
    userId: string;
    productId: string;
    pathname: string;
  }) => Promise<void>;
  resetShoppingBag: (pathname: string) => Promise<void>;
}

const useShoppingBagStore = create<ShoppingBagState>((set) => ({
  shoppingBag: [],
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  fetchShoppingBag: async () => {
    try {
      const session = await getCurrentSession();

      if (!session?.user?._id) {
        console.log(session?.user?._id);
        throw new Error("User ID not found");
      }
      const { shoppingBag } = await getShoppingBag({
        userId: session.user._id,
      });
      set({ shoppingBag: shoppingBag || [] });
    } catch (error) {
      console.error("[fetchShoppingBag] Failed to fetch shopping bag:", error);
    }
  },

  setShoppingBag: (items) => set({ shoppingBag: items }),

  addToBag: async ({ product, ...params }) => {
    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw new Error("User ID not found");
      }
      set((state) => ({
        shoppingBag: [
          ...state.shoppingBag,
          { product, size: params.size, quantity: params.quantity },
        ],
      }));

      const response = await addProductToBag({
        ...params,
        productId: product._id,
        productTitle: product.title,
      });

      if (!response) {
        set((state) => ({
          shoppingBag: state.shoppingBag.filter(
            (item) => item.product._id !== product._id
          ),
        }));
        throw new Error("Failed to add to shopping bag");
      }
    } catch (error: any) {
      set((state) => ({
        shoppingBag: state.shoppingBag.filter(
          (item) => item.product._id !== product._id
        ),
      }));
      console.error(error);
    }
  },

  removeFromBag: async (params) => {
    let backupState;
    set((state) => {
      backupState = state.shoppingBag;
      return {
        shoppingBag: state.shoppingBag.filter(
          (item) => item.product._id !== params?.productId
        ),
      };
    });

    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw new Error("User ID not found");
      }
      const response = await removeProductFromBag(params);

      if (!response) {
        set({ shoppingBag: backupState });
        throw new Error("Failed to remove from shopping bag, please try again");
      }
    } catch (error: any) {
      set({ shoppingBag: backupState });
      console.error(error);
    }
  },

  resetShoppingBag: async (pathname) => {
    let backupState;
    set((state) => {
      backupState = state.shoppingBag;
      return {
        shoppingBag: [],
      };
    });
    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw new Error("User ID not found");
      }
      const response = await resetShoppingBag({
        userId: session.user._id,
        pathname,
      });

      if (!response) {
        set({ shoppingBag: backupState });
        throw new Error("Failed to reseting shopping bag, please try again");
      }
    } catch (error: any) {
      set({ shoppingBag: backupState });
      console.error(error);
    }
  },
}));

export default useShoppingBagStore;
