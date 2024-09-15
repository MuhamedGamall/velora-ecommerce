import React from "react";
import ProductsContent from "../../_components/ProductsContent";
import SidebarFilter from "../../_components/filterComponents/SidebarFilter";

export default function Page() {
  return (
    <div className="w-full flex">
      <SidebarFilter />
      <ProductsContent />
    </div>
  );
}
