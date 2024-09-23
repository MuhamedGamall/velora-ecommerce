import getCategories from "@/actions/get-categories";
import CategoryItem from "./CategoryItem";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryTree } from "@/types";

export default async function CategoryTreeView({
  categories,
}: {
  categories: CategoryTree[];
}) {
  return (
    <div className=" py-5 w-full">
      {categories.map((cateItem) => (
        <CategoryItem key={cateItem?._id} cateItem={cateItem} />
      ))}
    </div>
  );
}
CategoryTreeView.Skeleton = () => {
  return (
    <div className="flex flex-col pt-3 w-full  ">
      {Array.from({ length: 5 })?.map((_, i) => (
        <>
          <div className="max-lg:px-5 flex items-center justify-between w-full gap-2 h-[64px]  border-t  ">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-5" />
          </div>
        </>
      ))}
    </div>
  );
};
