import useUser from "@libs/client/hooks/useUser";
import { classToString, fileToUrl } from "@libs/client/utils";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  createRoomFetch,
  ICreateRoomResponse,
} from "pages/api/chats/create-room";
import { favToggleFetch } from "pages/api/products/[id]/fav";
import { IProductDetailResponse } from "pages/api/products/[id]/index";
import React, { useState } from "react";
import { useMutation } from "react-query";
import useSWR from "swr";
import Layout from "../../components/layout";
import client from "@libs/server/client";

const ItemDetail: NextPage<IProductDetailResponse> = ({
  product,
  similarProducts,
  isLiked,
}) => {
  const router = useRouter();
  const { user } = useUser();
  // const { data, mutate: swrMutate } = useSWR<IProductDetailResponse>(
  //   router.query.id ? `/api/products/${router.query.id}` : null
  // );

  const { mutate: createRoomMutate, isLoading: createRoomIsLoading } =
    useMutation<ICreateRoomResponse>(
      () => createRoomFetch({ sellerId: product?.userId, buyerId: user?.id }),
      {
        onSuccess: ({ ok, roomId }) => {
          if (ok && roomId) {
            router.push(`/chats/${roomId}`);
          }
        },
      }
    );

  const { mutate: toggleFav } = useMutation(
    () => favToggleFetch(router.query.id as string),
    {
      onSuccess: () => {},
    }
  );

  const onClickFav = () => {
    if (!product) return;
    // swrMutate({ ...product, isLiked: !isLiked }, false);
    toggleFav();
  };

  const [coverImg, setCoverImg] = useState<boolean>(true);

  const onClickTalkRoom = () => {
    if (!user || !product) return;
    createRoomMutate();
  };

  return (
    <Layout title={product ? product.name : "Detail"} canGoBack>
      <div
        className="relative pb-80 my-2"
        onClick={() => setCoverImg((prev) => !prev)}
      >
        <Image
          src={fileToUrl({
            fileId: product?.image as string,
            variant: "public",
          })}
          alt="product image"
          className={classToString(
            "bg-black  rounded-md",
            coverImg ? "object-cover" : "object-scale-down"
          )}
          layout="fill"
        />
      </div>
      <div className="flex flex-col items-center pb-16 py-3">
        <div className="flex flex-col px-2 w-full">
          <div className="flex py-2 border-b-[1px]">
            {product?.user.avatar ? (
              <Image
                src={fileToUrl({
                  fileId: product.user.avatar,
                  variant: "avatar",
                })}
                alt="avatar"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full bg-gray-400"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-400" />
            )}
            <div className="flex flex-col ml-2 justify-center">
              <div className="text-sm font-semibold">{product?.user.name}</div>
              <div
                className="text-xs opacity-75 cursor-pointer hover:underline"
                onClick={() => router.push(`/users/${product?.userId}`)}
              >
                View Detail
              </div>
            </div>
          </div>
          <div className="flex flex-col py-2 border-b-[1px] space-y-1">
            <h1 className="text-xl font-bold">{product?.name}</h1>
            <h2 className="text-base font-semibold">${product?.price}</h2>
            <p className="text-sm text-justify">{product?.description}</p>
          </div>
          {product?.userId !== user?.id && (
            <div className="bg-white flex items-center py-4 px-1 w-full max-w-xl">
              <button
                onClick={() => onClickTalkRoom()}
                className="bg-orange-400 w-full text-white rounded-sm py-1 ring-2 ring-offset-1 ring-orange-400 hover:bg-orange-500 active:bg-orange-300"
              >
                {createRoomIsLoading ? "loading..." : "Talk to seller"}
              </button>
              <button
                onClick={onClickFav}
                className={classToString(
                  "px-1 py-1 ml-2 rounded-md",
                  isLiked
                    ? "text-red-600 hover:bg-red-100"
                    : "text-gray-400 hover:bg-gray-200"
                )}
              >
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="py-1">
            <h2 className="text-base font-semibold py-1">Similar Items</h2>
            <div className="grid grid-cols-2 gap-2 ">
              {similarProducts &&
                similarProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-full cursor-pointer"
                    onClick={() => router.replace(`/product/${product.id}`)}
                  >
                    <div className="bg-slate-500 h-44 rounded-md" />
                    <h3 className="font-medium text-sm">{product.name}</h3>
                    <p className="font-semibold text-sm">${product.price}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }
  const product = await client?.product.findUnique({
    where: {
      id: +ctx.params.id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client?.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  const isLiked = false;
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      isLiked,
    },
  };
};

export default ItemDetail;
