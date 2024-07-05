import { TodoFormData } from '@/types/ModalFormData';
import moment from 'moment';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateInput = ({
  label,
  setFormData,
  date,
}: {
  label: string;
  setFormData?: Dispatch<SetStateAction<TodoFormData>>;
  date?: string;
}) => {
  const defaultDate = date ? new Date(moment(date).format()) : undefined;
  const [value, setValue] = useState<Date | undefined>(defaultDate);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleToggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleDateChange = (selectedDate: unknown) => {
    setCalendarOpen(false);
    setValue(selectedDate as Date);

    setFormData?.((prev) => ({
      ...prev,
      dueDate: moment(selectedDate as Date).format('YYYY-MM-DD HH:mm'),
    }));
  };

  return (
    <div className="relative flex flex-col gap-10">
      <div className="flex gap-4">
        <div className="text-16 font-medium leading-[19px] md:text-18 md:leading-[21px]">
          {label}
        </div>
      </div>

      <div
        className="placeholder:gray-40 flex h-42 w-287 items-center gap-10 rounded-6 px-16 py-13 text-14 leading-[17px] border-1px-solid-gray-30 md:h-max md:w-450"
        onClick={handleToggleCalendar}
      >
        <Image
          src={
            value
              ? '/images/icon/ic-calendar.svg'
              : '/images/icon/ic-calendar-gray.svg'
          }
          width={20}
          height={20}
          alt="달력아이콘"
        />
        {value ? (
          moment(value).format('YYYY.MM.DD')
        ) : (
          <div className="text-14 leading-[17px] text-gray-40 md:text-16 md:leading-[19px]">
            날짜를 입력해 주세요
          </div>
        )}
      </div>
      <div
        className={`absolute left-0 top-[100%] z-10 ${
          calendarOpen ? 'block' : 'hidden'
        }`}
      >
        <Calendar onChange={handleDateChange} value={value}></Calendar>
      </div>
    </div>
  );
};

export default DateInput;
