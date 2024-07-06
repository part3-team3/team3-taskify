import Image from 'next/image';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';


interface SearchBarProps {
  initialValue: string;
}

// eslint-disable-next-line react/prop-types
const SearchBar: React.FC<SearchBarProps> = ({initialValue=""}) => {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleChange(e: { target: { value: SetStateAction<string>; }; }) {
    setValue(e.target.value);
  }

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (!value) {
      router.push(`/mydashboard`);
      return;
    }
    router.push(`/mydashboard?title=${value}`);
  }
  return (
    <form onSubmit={handleSubmit} className="relative w-full mb-24">
      <div className="relative w-full">
        <input
          name="title"
          value={value}
          placeholder="검색"
          onChange={handleChange}
          className="w-full pl-22 pr-4 py-2 border border-gray-30 rounded"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Image src="/images/icon/ic-search.svg" alt="검색 아이콘" width={22} height={22} />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;