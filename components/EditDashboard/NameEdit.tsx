import axios from '@/lib/axios';
import icCheckColor from '@/public/images/icon/ic-check-color.svg';
import icDotBlue from '@/public/images/icon/ic-dot-blue.svg';
import icDotGreen from '@/public/images/icon/ic-dot-green.svg';
import icDotOrange from '@/public/images/icon/ic-dot-orange.svg';
import icDotPink from '@/public/images/icon/ic-dot-pink.svg';
import icDotPurple from '@/public/images/icon/ic-dot-purple.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const DashboardNameEdit = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputTitle, setInputTitle] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Mobile breakpoint
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!dashboardId || isNaN(Number(dashboardId))) return;
      try {
        const response = await axios.get(`dashboards/${dashboardId}`);
        setTitle(response.data.title);
        setColor(getColorName(response.data.color));
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dashboardId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) {
      alert('대시보드 이름을 입력해주세요');
      return;
    }

    const colorCode = getColorCode(color);
    if (!dashboardId || isNaN(Number(dashboardId))) return;
    try {
      const response = await axios.put(`dashboards/${dashboardId}`, {
        title: inputTitle,
        color: colorCode,
      });
      console.log('Dashboard updated:', response.data);
      setTitle(inputTitle);
      alert('이름이 변경되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error('Error updating dashboard:', error);
    }
  };

  const getColorCode = (colorName: string): string => {
    switch (colorName) {
      case 'green':
        return '#7AC555';
      case 'purple':
        return '#760DDE';
      case 'orange':
        return '#FFA500';
      case 'pink':
        return '#E876EA';
      case 'blue':
        return '#76A5EA';
      default:
        return ''; // Handle default case or throw error
    }
  };

  const getColorName = (colorCode: string): string => {
    switch (colorCode) {
      case '#7AC555':
        return 'green';
      case '#760DDE':
        return 'purple';
      case '#FFA500':
        return 'orange';
      case '#E876EA':
        return 'pink';
      case '#76A5EA':
        return 'blue';
      default:
        return ''; // Handle default case or throw error
    }
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-12 md:px-20">
      <div className="flex h-211 w-284 flex-col rounded-lg bg-white px-12 pt-25 sm:h-256 sm:w-544 xl:h-256 xl:w-620 xl:px-20">
        <div className="mb-30 flex items-center justify-between">
          <div className="text-xl font-bold">{title}</div>
          <div className="flex gap-10">
            {isMobile
              ? ['green', 'purple', 'orange', 'blue', 'pink']
                  .filter((colorOption) => color === colorOption)
                  .map((colorOption) => (
                    <button
                      key={colorOption}
                      onClick={() => handleColorChange(colorOption)}
                      className={`color-option relative ${color === colorOption ? 'selected' : ''}`}
                    >
                      <Image
                        src={
                          colorOption === 'green'
                            ? icDotGreen
                            : colorOption === 'purple'
                              ? icDotPurple
                              : colorOption === 'orange'
                                ? icDotOrange
                                : colorOption === 'blue'
                                  ? icDotBlue
                                  : icDotPink
                        }
                        width={30}
                        height={30}
                        alt={colorOption}
                      />
                      {color === colorOption && (
                        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                          <Image
                            src={icCheckColor}
                            width={20}
                            height={20}
                            alt="체크"
                          />
                        </div>
                      )}
                    </button>
                  ))
              : ['green', 'purple', 'orange', 'blue', 'pink'].map(
                  (colorOption) => (
                    <button
                      key={colorOption}
                      onClick={() => handleColorChange(colorOption)}
                      className={`color-option relative ${color === colorOption ? 'selected' : ''}`}
                    >
                      <Image
                        src={
                          colorOption === 'green'
                            ? icDotGreen
                            : colorOption === 'purple'
                              ? icDotPurple
                              : colorOption === 'orange'
                                ? icDotOrange
                                : colorOption === 'blue'
                                  ? icDotBlue
                                  : icDotPink
                        }
                        width={30}
                        height={30}
                        alt={colorOption}
                      />
                      {color === colorOption && (
                        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                          <Image
                            src={icCheckColor}
                            width={20}
                            height={20}
                            alt="체크"
                          />
                        </div>
                      )}
                    </button>
                  ),
                )}
          </div>
        </div>
        <p className="text-16 font-medium md:text-18">대시보드 이름</p>
        <input
          className="mt-8 h-42 w-260 rounded-md border border-gray-300 md:h-48 md:w-488 xl:h-48 xl:w-564"
          type="text"
          value={inputTitle}
          onChange={handleTitleChange}
        />
        <div className="flex justify-end">
          <button
            className="mt-5 btn_small_purple md:mt-24 xl:mt-28"
            type="button"
            onClick={handleSubmit}
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNameEdit;
