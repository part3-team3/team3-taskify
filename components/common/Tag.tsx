const Tag = ({ index, title }: { index: number; title: string }) => {
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

  return (
    <div
      className={`h-max w-max rounded-4 px-6 py-4 text-10 leading-[12px]`}
      style={{ color: colorSet.text, backgroundColor: colorSet.bg }}
    >
      {title}
    </div>
  );
};

export default Tag;
