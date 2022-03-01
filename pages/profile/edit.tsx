import useUser from "@libs/client/hooks/useUser";
import { fileToUrl } from "@libs/client/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  editProfileFetch,
  IEditProfileForm,
  IEditProfileResponse,
} from "pages/api/users/edit";
import { useState } from "react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import SubmitButton from "../../components/submit-button";

const Edit: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    watch,
  } = useForm<IEditProfileForm>({
    mode: "onChange",
  });

  const router = useRouter();

  const { mutate: editProfilMutate, isLoading } = useMutation(
    (data: IEditProfileForm) => editProfileFetch(data),
    {
      onSuccess: (res: IEditProfileResponse) => {
        if (res.ok) {
          router.reload();
        }
      },
    }
  );

  const onSubmit: SubmitHandler<IEditProfileForm> = async ({
    email,
    phone,
    name,
    avatar,
  }) => {
    if (email === "" && phone === "") {
      setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one",
      });
    }
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch("/api/files")).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editProfilMutate({ email, phone, name, avatarId: id });
    } else {
      editProfilMutate({ email, phone, name });
    }
  };

  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar ? fileToUrl({ fileId: user?.avatar, variant: "avatar" }) : null
  );
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout title="Edit Profile" canGoBack>
      <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4">
        <div className="flex items-center">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-16 h-16 bg-gray-500 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-500 rounded-full" />
          )}
          <label
            htmlFor="avatar"
            className="ml-2 text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Change Photo
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("avatar")}
          />
        </div>
        <div className="flex flex-col py-2">
          <Input
            type="text"
            placeholder="Enter your Name"
            required
            register={register("name", { required: true })}
            label="Email Address"
            name="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <Input
            type="email"
            placeholder="Enter your Email"
            required={false}
            register={register("email", { required: false })}
            label="Email Address"
            name="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 text-sm font-semibold">Phone Number</label>
          <div className="flex">
            <div className="flex justify-center items-center bg-gray-200 text-gray-400 px-2 rounded-l-lg">
              +82
            </div>
            <Input
              type="text"
              placeholder="Enter your Phone Number"
              required={false}
              register={register("phone", { required: false })}
              label="phone"
              name="phone"
            />
          </div>
        </div>
        {errors.formErrors && (
          <div className="flex justify-center items-center text-red-500 font-semibold py-2">
            {errors.formErrors.message}
          </div>
        )}
        <SubmitButton isLoading={isLoading} payload="Update Profile" />
      </form>
    </Layout>
  );
};

export default Edit;
