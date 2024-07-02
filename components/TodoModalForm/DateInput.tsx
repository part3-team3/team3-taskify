import { TodoCreateFormData, TodoFormData } from '@/types/ModalFormData';
import moment from 'moment';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateInput = ({
  label,
  setFormData,
  setCreateFormData,
  date,
}: {
  label: string;
  setFormData?: Dispatch<SetStateAction<TodoFormData>>;
  setCreateFormData?: Dispatch<SetStateAction<TodoCreateFormData>>;

  date?: string;
}) => {
  const defaultDate = new Date(moment(date).format());
  const [value, setValue] = useState<Date>(defaultDate);
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

    setCreateFormData?.((prev) => ({
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
          src="images/icon/ic-calendar.svg"
          width={20}
          height={20}
          alt="달력아이콘"
        />
        {moment(value).format('YYYY.MM.DD')}
      </div>
      <div
        className={`absolute left-0 top-[100%] z-10 ${calendarOpen ? 'block' : 'hidden'}`}
      >
        <Calendar onChange={handleDateChange} value={value}></Calendar>
      </div>
    </div>
  );
};

export default DateInput;
