import { IResponse } from "@libs/server/withHandler";
import { Fav, Product } from "@prisma/client";
import useSWR from "swr";

interface IProductList {
  kind: "favs" | "purchases" | "sales";
}

interface IProduct extends Product {
  _count: {
    favs: number;
  };
}

interface IProductListResponse extends IResponse {
  products: IProduct[];
}

const ProductList: React.FC<IProductList> = ({ kind }) => {
  const { data } = useSWR<IProductListResponse>(`/api/users/me/${kind}`);
  console.log(data);
  return (
    <div className="flex flex-col space-y-2 py-1">
      {data?.products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between border-b-[1.5px] "
        >
          <div className="flex w-full justify-between cursor-pointer">
            <div className="flex  py-2 px-1 space-x-3">
              <div className="w-20 h-20 bg-slate-500 rounded-md"></div>
              <div className="flex flex-col py-1">
                <div className="text-sm font-semibold">{product.name}</div>
                <div className="text-sm font-bold">{product.price}</div>
              </div>
            </div>
            <div className=" flex items-end space-x-2 px-2 py-2">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <span>{product._count.favs}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
