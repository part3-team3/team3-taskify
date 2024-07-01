import Image from 'next/image';
import React, { useState } from 'react';

const ORDERS = [
  <div className="bg-violet-10">To Do</div>,
  <div>On Progress</div>,
  <div>Done</div>,
  <div>이영훈</div>,
  <div>이승허이</div>,
  <div>주강사이</div>,
  <div>장준혀이</div>,
];

type NewSelectType = {
  placeholder: string;
  options: JSX.Element[];
};

const NewSelect = ({
  placeholder = '쁘레이스홀다',
  options = ORDERS,
}: NewSelectType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<JSX.Element | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleClick = (option: JSX.Element, index: number) => {
    console.log(option);
    setSelectedOption(option);
    setSelectedIndex(index);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-42 w-287 items-center rounded-6 px-16 py-13 text-14 leading-[17px] text-gray-40 border-1px-solid-gray-30 md:h-48 md:w-217"
      >
        {selectedOption !== null ? selectedOption : placeholder}
        <Image
          className="ml-auto"
          src="/images/icon/ic-arrow-dropdown.svg"
          width={26}
          height={26}
          alt="드롭다운화살표"
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-2 flex h-max w-287 flex-col gap-13 rounded-6 bg-white px-8 py-13 border-1px-solid-gray-30 md:w-217">
          {options.map((option, index) => (
            <li
              key={index}
              className="flex"
              onClick={() => {
                handleClick(option, index);
              }}
            >
              {index === selectedIndex ? (
                <Image
                  width={22}
                  height={22}
                  src="/images/icon/ic-dropdown-check.svg"
                  alt="드롭다운 체크 아이콘"
                />
              ) : (
                ''
              )}
              {option}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NewSelect;
