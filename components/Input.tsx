import { classToString } from "../libs/utils";

interface IInput {
  label: string;
  type: "email" | "password" | "number" | "text";
  name: string;
  [key: string]: any;
}

const Input: React.FC<IInput> = ({ label, type, name, ...rest }) => {
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
        {...rest}
        className={classToString(
          "appearance-none px-3 py-3 rounded-md shadow-sm border-gray-300 placeholder-gray-400 focus:border-orange-400  focus:ring-orange-400",
          name === "phone" ? "rounded-l-none" : ""
        )}
      />
    </div>
  );
};

export default Input;
