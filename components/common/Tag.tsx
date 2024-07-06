import Image from 'next/image';

const Tag = ({
  index,
  title,
  handleDeleteTag,
}: {
  index: number;
  title: string;
  handleDeleteTag?: (tagToDelete: string) => void;
}) => {
  const colorNames = ['yellow', 'green', 'pink', 'blue'];
  const colors: { [key: string]: { bg: string; text: string } } = {
    yellow: {
      bg: '#F9EEE3',
      text: '#D58D49',
    },
    green: {
      bg: '#E7F7DB',
      text: '#86D549',
    },
    pink: {
      bg: '#F7DBF0',
      text: '#D549B6',
    },
    blue: {
      bg: '#DBE6F7',
      text: '#4981D5',
    },
  };
  const color = colorNames[index % 4]; // yellow
  const colorSet = colors[color]; // {bg: '...', text: '...'}

  const handleDelete = () => {
    handleDeleteTag?.(title);
  };

  return (
    <div
      className="flex h-max w-max gap-4 rounded-4 px-6 py-4 text-10 leading-[12px]"
      style={{ color: colorSet.text, backgroundColor: colorSet.bg }}
    >
      {title}
      {handleDeleteTag && (
        <Image
          onClick={handleDelete}
          className="opacity-70"
          src="/images/icon/ic-x.svg"
          width={10}
          height={10}
          alt="태그 삭제 버튼"
        />
      )}
    </div>
  );
};

export default Tag;
