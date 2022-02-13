interface ISubmitButton {
  payload: string;
}

const SubmitButton: React.FC<ISubmitButton> = ({ payload }) => {
  return (
    <button className="hover:ring-orange-500 active:ring-orange-300 focus:outline-none mt-5 bg-orange-400 w-full text-white rounded-sm py-1 ring-2 ring-offset-1 ring-orange-400 hover:bg-orange-500 active:bg-orange-300">
      {payload}
    </button>
  );
};

export default SubmitButton;
