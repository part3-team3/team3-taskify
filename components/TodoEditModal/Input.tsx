const Input = ({
  children,
  placeholder,
  essential,
}: {
  children: string;
  placeholder: string;
  essential?: string;
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-4">
        <div className="text-16 font-medium leading-[19px] md:text-18 md:leading-[21px]">
          {children}
        </div>
        <div className="text-violet-20">{essential}</div>
      </div>

      <input
        className="placeholder:gray-40 h-42 w-287 rounded-6 px-16 py-13 text-14 leading-[17px] border-1px-solid-gray-30 md:h-48 md:w-450"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
