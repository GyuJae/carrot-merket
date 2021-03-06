import { fileToUrl } from "@libs/client/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { IProductWithCount } from "pages/api/products";

const Product: React.FC<{ product: IProductWithCount }> = ({ product }) => {
  const router = useRouter();
  return (
    <div
      className="flex justify-between"
      onClick={() => router.push(`product/${product.id}`)}
    >
      <div className="flex w-full justify-between cursor-pointer">
        <div className="flex  py-2 px-1 space-x-3">
          <Image
            src={fileToUrl({ fileId: product.image, variant: "avatar" })}
            alt="product"
            width={80}
            height={80}
            className="w-20 h-20 bg-slate-500 rounded-md object-cover"
          />
          <div className="flex flex-col py-1 space-y-1">
            <div className="text-sm font-semibold">{product.name}</div>
            {/* <div className="text-xs text-gray-400">{product.location}</div> */}
            <div className="text-xs font-bold">${product.price}</div>
          </div>
        </div>
        <div className=" flex items-end space-x-2 px-2 py-2">
          <div className="flex justify-center items-center text-gray-500 text-sm space-x-1 ">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{product._count?.favs || 0}</span>
          </div>
          <div className="flex justify-center items-center text-gray-500 text-sm space-x-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
