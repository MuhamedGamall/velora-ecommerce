import getCategories from "@/actions/get-categories";
import CategoryTreeView from "./CategoryTreeView";

export default async function SidebarFilter() {
  const { categories, loading } = await getCategories();

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
