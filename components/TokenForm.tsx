import { IResponse } from "@libs/server/withHandler";
import { Token } from "@prisma/client";
import { useRouter } from "next/router";
import { IEnterTokenForm, tokenVerifyFetch } from "pages/api/users/tokenVerify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Input from "./Input";
import SubmitButton from "./submit-button";

interface IComponentTokenForm {
  tokenObj: {
    ok: boolean;
    token?: Token | null;
  };
}

const TokenForm: React.FC<IComponentTokenForm> = ({ tokenObj }) => {
  const { register, handleSubmit } = useForm<IEnterTokenForm>();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    (data: IEnterTokenForm) => tokenVerifyFetch(data),
    {
      onSuccess: ({ ok }: IResponse) => {
        if (ok) {
          router.replace("/");
        }
      },
    }
  );
  const onSubmit: SubmitHandler<IEnterTokenForm> = (data) => {
    mutate(data);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label="paylod"
          type="text"
          name="paylod"
          required
          placeholder="paylod"
          register={register("payload")}
          value={tokenObj.token?.payload}
        />
        <SubmitButton payload={isLoading ? "loading..." : "Get Payload"} />
      </div>
    </form>
  );
};

export default TokenForm;
