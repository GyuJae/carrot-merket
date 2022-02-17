import { tokenVerifyFetch } from "@libs/client/apis/tokenVerifyFetch";
import { IResponse } from "@libs/server/withHandler";
import { Token } from "@prisma/client";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Input from "./Input";
import SubmitButton from "./submit-button";

interface ITokenForm {
  payload: string;
}

interface IComponentTokenForm {
  tokenObj: {
    ok: boolean;
    token?: Token | null;
  };
}

const TokenForm: React.FC<IComponentTokenForm> = ({ tokenObj }) => {
  const { register, handleSubmit } = useForm<ITokenForm>();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    (data: ITokenForm) => tokenVerifyFetch(data),
    {
      onSuccess: ({ ok }: IResponse) => {
        if (ok) {
          router.replace("/");
        }
      },
    }
  );
  const onSubmit: SubmitHandler<ITokenForm> = (data) => {
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
