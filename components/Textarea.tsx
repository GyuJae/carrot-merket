interface ITextarea {
  rows: number;
  label: string;
  [key: string]: any;
}

const Textarea: React.FC<ITextarea> = ({ rows, label, ...rest }) => {
  return (
    <div>
      <label htmlFor={label} className="py-1 text-sm font-semibold">
        {label[0].toUpperCase() + label.slice(1)}
      </label>
      <textarea
        className="shadow-sm w-full focus:ring-orange-500 rounded-md placeholder-gray-400 border-gray-300 focus:border-orange-500 "
        rows={rows}
        {...rest}
      />
    </div>
  );
};

export default Textarea;
