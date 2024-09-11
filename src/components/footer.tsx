"use client";
import getCategories from "@/actions/get-categories";
import { ChevronRight, Dot, Github, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Footer = () => {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  if (["/auth/signIn", "/auth/register"].includes(pathname)) return;
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        console.log({ data });
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
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {categories?.map((category: any) => (
                <li
                  key={category._id}
                  className="flex flex-col  gap-2 ml-5 capitalize"
                >
                  <a
                    href="#"
                    className=" hover:underline font-bold text-[16px]"
                  >
                    {category.title}
                  </a>
                  <div className="flex flex-col  gap-1 w-full text-[13px]">
                    {category?.subCategories?.map(
                      (subCategory: any, index: number) => (
                        <a href="#" className=" capitalize  hover:underline ">
                          {subCategory.title}
                        </a>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex gap-10 items-start">
              <div>
                <h4 className="font-bold text-lg mb-4">Follow us</h4>
                <div className="flex gap-4 mb-6  ml-5">
                  <a href="#" className=" hover:underline">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className=" hover:underline">
                    <Github size={24} />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">About VELORA</h4>
                <ul className=" ml-5">
                  <li>
                    <a href="#" className=" hover:underline">
                      About us - FAQ
                    </a>
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
                className="p-2 rounded-l bg-gray-800 text-gray-300 w-full focus:outline-none"
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
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a
              href={"mailto:muhamedgamal250@gmaill"}
              className="hover:underline"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
