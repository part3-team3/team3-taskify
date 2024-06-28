import Image from 'next/image';
import { useState } from 'react';

import SelectOption from './SelectOption';

const Select = ({
  type,
  options,
  children,
  placeholder,
}: {
  type: string;
  options: string[];
  children: string;
  placeholder: string;
}) => {
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [select, setSelect] = useState<string>(placeholder);

  const handleDropdownVisible = () => {
    setSelectMode(!selectMode);
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="text-16 font-medium leading-[19px] md:text-18 md:leading-[21px]">
          {children}
        </div>
        <div>
          <div
            onClick={handleDropdownVisible}
            className="relative flex h-42 w-287 items-center rounded-6 px-16 py-13 text-14 leading-[17px] text-gray-40 border-1px-solid-gray-30 md:h-48 md:w-217"
          >
            {select}
          </div>
          <div className="relative">
            <Image
              className="absolute bottom-8 right-8 md:bottom-10"
              src="/images/icon/ic-arrow-dropdown.svg"
              width={26}
              height={26}
              alt="드롭다운화살표"
            />
          </div>
        </div>
      </div>
      {selectMode && (
        <div className="absolute z-10 mt-2 flex h-max w-287 flex-col gap-13 rounded-6 bg-white px-8 py-13 border-1px-solid-gray-30 md:w-217">
          {options.map((option) => (
            <div key={option}>
              <SelectOption type={type} setSelect={setSelect} option={option} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
