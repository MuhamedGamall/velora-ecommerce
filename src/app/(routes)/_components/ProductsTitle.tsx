import React from "react";

export default function ProductsTitle({
  searchParams,
  params,
}: {
  searchParams: any;
  params: {
    categoryId: string;
    subCategoryId: string;
  };
}) {
  const title = () => {
    if (searchParams?.q && !params?.categoryId && !params?.subCategoryId)
      return searchParams.q;
    if (searchParams?.q && params?.categoryId && !params?.subCategoryId)
      return `${searchParams.q} in ${params.categoryId}`;

    if (params?.categoryId && !params?.subCategoryId && !searchParams?.q)
      return params.categoryId;

    if (params?.subCategoryId && params?.categoryId && !searchParams?.q)
      return `${params.subCategoryId} & ${params.categoryId}`;

    if (params?.subCategoryId && searchParams?.q && params?.categoryId)
      return `${searchParams.q} in ${params.subCategoryId} & ${params.categoryId}`;
  };
  return (
    <div className="w-full mb-6">
      <h1
        className="text-[20px] font-bold capitalize
      mb-1"
      >
        {title()}
      </h1>
      <h2 className="text-[13px] text-slate-600 font-normal flex items-center gap-1">
        <span className="font-bold text-sm text-black">{5} </span> Products
      </h2>
    </div>
  );
}
