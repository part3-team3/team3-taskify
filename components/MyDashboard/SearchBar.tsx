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
    <form onSubmit={handleSubmit}>
      <div className="relative h-16 w-16">
        <Image fill src="/images/icon/ic-search.svg" alt="검색 아이콘" />
      </div>
      <input
        name="title"
        value={value}
        placeholder="검색할 상품을 입력해 주세요"
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;