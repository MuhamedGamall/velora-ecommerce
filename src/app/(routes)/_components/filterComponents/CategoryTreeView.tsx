import getCategories from "@/actions/get-categories";
import CategoryItem from "./CategoryItem";

export default async function CategoryTreeView() {
  const categories = await getCategories();
  return (
    <div className="border-y py-5">
      {categories.map((cateItem) => (
        <CategoryItem key={cateItem?._id} cateItem={cateItem} />
      ))}
    </div>
  );
}
