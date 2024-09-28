"use client";
import getCategories from "@/actions/get-categories";
import { CategoryTree } from "@/types";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const Footer = () => {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  if (["/auth/signIn", "/auth/register", "/studio"].includes(pathname)) return;
  const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isStudioPage = pathname.includes("/studio");
  if (isStudioPage) {
    return;
  }
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch((error) => {
        setCategories([]);
      });
  }, []);

  return (
    <footer className="bg-mainBlack text-white py-10 ">
      <div className="containerWrapper mx-auto">
        <div className=" flex justify-between max-sm:flex-wrap gap-8 px-4">
          <div className=" ">
            <h4 className="font-bold text-lg mb-4">Ctegories</h4>
            {loading ? (
              <Footer.LinksSkeleton />
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categories?.map((category: CategoryTree) => (
                  <li
                    key={category._id}
                    className="flex flex-col  gap-2 ml-5 capitalize"
                  >
                    <Link
                      href={'/explore/'+category.title}
                      className=" hover:underline font-bold text-[16px]"
                    >
                      {category.title}
                    </Link>
                    <div className="flex flex-col  gap-1 w-full text-[13px]">
                      {category?.subCategories?.map((subCategory: any) => (
                        <Link
                          key={"/explore/" + category.title + "/" + subCategory.title}
                          href={"/explore/" + category.title + "/" + subCategory.title}
                          className=" capitalize  hover:underline "
                        >
                          {subCategory.title}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div className="flex gap-10 items-start">
              <div>
                <h4 className="font-bold text-lg mb-4">Follow us</h4>
                <div className="flex gap-4 mb-6  ml-5">
                  <Link
                    href="https://linkedin.com/in/muhamed-gamal-468339241"
                    className=" hover:bg-white p-2 border hover:text-mainBlack rounded-full"
                  >
                    <Linkedin size={24} />
                  </Link>
                  <Link
                    href="https://github.com/MuhamedGamall"
                    className=" hover:bg-white p-2 border hover:text-mainBlack rounded-full"
                  >
                    <Github size={24} />
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">About VELORA</h4>
                <ul className=" ml-5">
                  <li>
                    <Link href="#" className=" hover:underline">
                      About us - FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <h4 className="font-bold text-lg mb-2">
              Subscribe to our newsletter
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address here"
                className="p-2 rounded-l bg-black border text-gray-300 w-full focus:outline-none"
              />
              <button className="bg-white text-gray-900 font-semibold px-4 py-2 rounded-r">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 pt-6  text-center">
          <p>©{year} VEROLA</p>
          <div className="flex justify-center gap-2">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link
              href={"mailto:muhamedgamal250@gmaill"}
              className="hover:underline"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

Footer.LinksSkeleton = () => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {Array.from({ length: 5 })?.map((_, i) => (
        <li key={i} className="flex flex-col  gap-2 ml-5 capitalize">
          <Skeleton  className="h-5 w-16" />
          <div className="flex flex-col  gap-1 w-full">
            {Array.from({ length: 5 })?.map((_, i) => (
              <Skeleton  key={i} className="h-3 w-14" />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
