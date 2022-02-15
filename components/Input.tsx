import { classToString } from "@libs/client/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  label: string;
  type: "email" | "password" | "number" | "text";
  name: string;
  required: boolean;
  placeholder: string;
  register: UseFormRegisterReturn;
}

const Input: React.FC<IInput> = ({
  label,
  type,
  name,
  required = false,
  placeholder,
  register,
}) => {
  return (
    <div className="w-full flex flex-col">
      {name !== "phone" && (
        <label htmlFor={name} className="py-2 text-sm font-semibold">
          {label[0].toUpperCase() + label.slice(1)}
        </label>
      )}
      <input
        id={name}
        type={type}
        required={required}
        placeholder={placeholder}
        {...register}
        className={classToString(
          "appearance-none px-3 py-3 rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:border-orange-400  focus:ring-orange-400",
          name === "phone" ? "rounded-l-none" : ""
        )}
      />
    </div>
  );
};

export default Input;
