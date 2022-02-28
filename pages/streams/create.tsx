import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  ILiveUploadResponse,
  IUploadLiveForm,
  uploadLiveFetch,
} from "pages/api/streams/upload";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import SubmitButton from "../../components/submit-button";
import Textarea from "../../components/Textarea";

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IUploadLiveForm>();
  const { isLoading, mutate } = useMutation(
    (data: IUploadLiveForm) => uploadLiveFetch(data),
    {
      onSuccess: (data: ILiveUploadResponse) => {
        if (data.ok && data.streamId) {
          router.replace(`/streams/${data.streamId}`);
        }
      },
    }
  );
  const onSubmit: SubmitHandler<IUploadLiveForm> = (data) => {
    if (isLoading) return;
    mutate(data);
  };
  return (
    <Layout title="Live Stream Start" canGoBack>
      <div className="py-4 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <Input
            placeholder="Name"
            name="name"
            type="text"
            id="name"
            label="Name"
            required
            register={register("name", { required: true })}
          />
          <Input
            placeholder="$ Price"
            name="price"
            type="number"
            id="price"
            label="price"
            required
            register={register("price", {
              required: true,
              valueAsNumber: true,
            })}
          />
          <Textarea
            placeholder="Description"
            name="description"
            type="text"
            id="description"
            label="description"
            rows={7}
            required
            register={register("description", { required: true })}
          />

          <SubmitButton isLoading={isLoading} payload="Upload Product" />
        </form>
      </div>
    </Layout>
  );
};

export default Create;
