import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronDown, X } from "lucide-react";
import CategoryTreeView from "../CategoryTreeView";
import getCategories from "@/actions/get-categories";
import { SearchParams } from "@/types";

export default async function FilterBy() {
  const { categories, loading } = await getCategories();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full  px-2 justify-between rounded-none border-mainBlack  h-11 "
        >
          Category
          <ChevronDown size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none overflow-y-auto h-[calc(100vh-70px)] ">
        <DrawerHeader className="flex items-center w-full border-b p-5 justify-between">
          <DrawerTitle className="text-center w-full ml-9 text-[20px]">
            Category
          </DrawerTitle>
          <DrawerClose>
            <X size={30} strokeWidth={1.3} />
          </DrawerClose>
        </DrawerHeader>
        <div className="">
          {loading ? (
            <CategoryTreeView.Skeleton />
          ) : (
            <CategoryTreeView categories={categories} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
