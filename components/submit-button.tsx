interface ISubmitButton {
  payload: string;
  isLoading: boolean;
}

const SubmitButton: React.FC<ISubmitButton> = ({ payload, isLoading }) => {
  return (
    <button className="hover:ring-orange-500 focus:outline-none mt-5 bg-orange-400 w-full text-white rounded-sm py-1  hover:bg-orange-500 active:bg-orange-300">
      {isLoading ? "loading..." : payload}
    </button>
  );
};

export default SubmitButton;
