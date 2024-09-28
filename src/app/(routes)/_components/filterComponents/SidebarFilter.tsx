"use client";
import getCategories from "@/actions/get-categories";
import CategoryTreeView from "./CategoryTreeView";
import { useEffect, useState } from "react";
import { CategoryTree } from "@/types";

export default function SidebarFilter() {
  const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data?.categories);
      setLoading(false);
    });
  }, []);
  return (
    <div className="max-lg:hidden min-w-[250px] xl:min-w-[300px] px-5 py-[30px] !h-[calc(100vh-120px)] overflow-y-auto sticky top-[120px]  left-0">
      {loading ? (
        <CategoryTreeView.Skeleton />
      ) : (
        <CategoryTreeView categories={categories} />
      )}
    </div>
  );
}
