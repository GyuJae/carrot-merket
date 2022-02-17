import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import SubmitButton from "./submit-button";

interface ITokenForm {
  payload: string;
}

const TokenForm = () => {
  const { register, handleSubmit } = useForm<ITokenForm>();
  const onSubmit: SubmitHandler<ITokenForm> = ({ payload }) => {
    console.log(payload);
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
        />
        <SubmitButton payload="Get Payload" />
      </div>
    </form>
  );
};

export default TokenForm;
