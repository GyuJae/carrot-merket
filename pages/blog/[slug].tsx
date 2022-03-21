import Layout from "@components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

interface IData {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Post: NextPage<{ post: string; data: IData }> = ({ post, data }) => {
  return (
    <Layout title={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

export function getStaticPaths() {
  const files = readdirSync("./posts").map((file) => {
    const [name, _] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data } = matter.read(`./posts/${params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: {
      data,
      post: value,
    },
  };
};

export default Post;
