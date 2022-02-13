interface ISubmitButton {
  payload: string;
}

const SubmitButton: React.FC<ISubmitButton> = ({ payload }) => {
  return (
    <button className="hover:ring-orange-500 focus:outline-none mt-5 bg-orange-400 w-full text-white rounded-sm py-1  hover:bg-orange-500 active:bg-orange-300">
      {payload}
    </button>
  );
};

export default SubmitButton;
