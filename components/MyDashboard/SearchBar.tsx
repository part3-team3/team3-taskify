import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SearchBarProps {
  initailValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({initailValue=""}) => {
  const router = useRouter();
  const [value, setValue] = useState(initailValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!value) {
        router.push(`/mydashboard`);
        return;
    }
    router.push(`/mydashboard?title=${value}`);
  }
  return (
    <form onSubmit={handleSubmit} >
      <div className="relative w-16 h-16">
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