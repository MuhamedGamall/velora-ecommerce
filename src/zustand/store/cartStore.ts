import getCurrentSession from "@/actions/get-current-session";
import addProductToBag from "@/actions/shopping-bag/add-to-bag";
import getShoppingBag from "@/actions/shopping-bag/get-shopping-bag";
import removeProductFromBag from "@/actions/shopping-bag/remove-from-bag";
import resetShoppingBag from "@/actions/shopping-bag/reset-shopping-bag";
import { Product, ShoppingBag } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

interface ShoppingBagState {
  shoppingBag: ShoppingBag[];
  loading: boolean;
  setLoading: (value: boolean) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  fetchShoppingBag: () => Promise<void>;
  setShoppingBag: (items: ShoppingBag[]) => void;
  addToBag: (params: {
    product: Product;
    size: string;
    quantity: number;
  }) => Promise<void>;
  removeFromBag: (productId: string) => Promise<void>;
  resetShoppingBag: () => Promise<void>;
}

const useShoppingBagStore = create<ShoppingBagState>((set) => ({
  shoppingBag: [],
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),

  isOpen: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  fetchShoppingBag: async () => {
    set({ loading: true });
    try {
      const session = await getCurrentSession();

      if (!session?.user?._id) {
        throw new Error("User ID not found");
      }

      const { shoppingBag } = await getShoppingBag({
        userId: session.user._id,
      });

      set({ shoppingBag: shoppingBag || [] });
    } catch (error: any) {
      console.error("Error fetching shopping bag:", error);
      set({ shoppingBag: [] });
    } finally {
      set({ loading: false });
    }
  },

  setShoppingBag: (items) => set({ shoppingBag: items }),

  addToBag: async ({ product, ...params }) => {
    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw "User ID not found";
      }

      set((state) => {
        const isExist = state.shoppingBag.find(
          (item) => item?.product?._id === product?._id
        );

        if (isExist) return { shoppingBag: state.shoppingBag };
        return {
          shoppingBag: [
            ...state.shoppingBag,
            { product, size: params.size, quantity: params.quantity },
          ],
        };
      });

      const response = await addProductToBag({
        ...params,
        userId: session?.user?._id,
        productId: product._id,
        productTitle: product.title,
      });

      if (!response) {
        set((state) => ({
          shoppingBag: state.shoppingBag.filter(
            (item) => item.product._id !== product._id
          ),
        }));
        throw "Failed to add to shopping bag";
      }
    } catch (error: any) {
      set((state) => ({
        shoppingBag: state.shoppingBag.filter(
          (item) => item.product._id !== product._id
        ),
      }));
      throw new Error(" adding product to the shopping bag:", error);
    }
  },

  removeFromBag: async (productId) => {
    let backupState;
    set((state) => {
      backupState = state.shoppingBag;
      return {
        shoppingBag: state.shoppingBag.filter(
          (item) => item.product._id !== productId
        ),
      };
    });

    try {
      const session = await getCurrentSession();
      if (!session?.user?._id) {
        throw "User ID not found";
      }
      const response = await removeProductFromBag({
        productId,
        userId: session?.user?._id,
      });

      if (!response) {
        set({ shoppingBag: backupState });
        throw "Failed to remove from shopping bag, please try again";
      }
    } catch (error: any) {
      set({ shoppingBag: backupState });
      throw new Error("removing product from the shopping bag:", error);
    }
  },

  resetShoppingBag: async () => {
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
        throw "User ID not found";
      }
      const response = await resetShoppingBag({
        userId: session.user._id,
      });

      if (!response) {
        set({ shoppingBag: backupState });
        throw "Failed to resetting shopping bag, please try again";
      }
    } catch (error: any) {
      set({ shoppingBag: backupState });
      toast.error("Failed to resetting shopping bag, please try again");
      throw new Error("resetting shopping bag:", error);
    }
  },
}));

export default useShoppingBagStore;
