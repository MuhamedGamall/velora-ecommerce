import React from "react";
import CategoryTreeView from "./CategoryTreeView";

export default function SidebarFilter() {
  return (
    <div className="max-lg:hidden min-w-[250px] xl:min-w-[300px] px-5 py-[30px] !h-[calc(100vh-120px)] overflow-y-auto sticky top-[120px]  left-0">
      <CategoryTreeView />
    </div>
  );
}
