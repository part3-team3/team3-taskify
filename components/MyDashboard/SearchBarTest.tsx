//SearchBar.tsx
// import SearchIcon from '@/public/images/icons/ic_search.svg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


interface SearchBarTestProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

const SearchBarTest: React.FC<SearchBarTestProps> = ({onSearch, placeholder,}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const currentKeyword = (router.query.title as string) || '';
    setKeyword(currentKeyword);
  }, [router.query.title]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // onKeyPress는 최신 리액트 버전에서 deprecated 되었기 때문에 onKeyDown, onKeyUp 등을 사용하는 것을 권장해요.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(keyword);
    }
  };

  return (
    <>
      <input
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </>
  );
};

export default SearchBarTest;