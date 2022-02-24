import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  IWriteForm,
  IWriteFormResponse,
  writePostFetch,
} from "pages/api/communities/write";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Layout from "../../components/layout";
import SubmitButton from "../../components/submit-button";
import Textarea from "../../components/Textarea";

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm<IWriteForm>();
  const router = useRouter();
  const { mutate } = useMutation((data: IWriteForm) => writePostFetch(data), {
    onSuccess: (data: IWriteFormResponse) => {
      if (data.ok) {
        router.replace(`/community/${data.postId}`);
      }
    },
  });
  const onSubmit: SubmitHandler<IWriteForm> = (data) => {
    mutate(data);
  };
  return (
    <Layout title="Community Write" canGoBack>
      <div className="flex flex-col px-4 py-6">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            label={"community"}
            rows={4}
            placeholder="Ask a question!"
            register={register("question")}
          />
          <SubmitButton payload="Submit" />
        </form>
      </div>
    </Layout>
  );
};

export default Write;
