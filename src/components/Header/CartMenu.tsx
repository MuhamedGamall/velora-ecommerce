import { ShoppingBag } from "@/types";
import PreviewMyProducts from "../PreviewMyProducts";
import useCartModal from "@/hooks/useCartModal";

export default function CartMenu({
  shoppingBag,
}: {
  shoppingBag: ShoppingBag[];
}) {
  const { onOpen, onClose, isOpen } = useCartModal();
  return (
    <PreviewMyProducts
      type="cart"
      data={shoppingBag}
      onClose={onClose}
      isOpen={isOpen}
      onOpen={onOpen}
    />
  );
}
