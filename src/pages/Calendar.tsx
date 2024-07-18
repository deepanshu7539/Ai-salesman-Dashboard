import React from 'react';
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

interface CalendarProps {
  scheduleData?: { [date: string]: number };
  onDateSelect: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ scheduleData = {}, onDateSelect }) => {
  const handleClickDay = (date: string) => {
    onDateSelect(date);
  };

  return (
    <>
      {/* <Breadcrumb pageName="Calendar" /> */}

      <div className="w-full max-w-2xl rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <th key={day} className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                  <span className="hidden lg:block">{day}</span>
                  <span className="block lg:hidden">{day.slice(0, 3)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }, (_, weekIndex) => (
              <tr key={weekIndex} className="grid grid-cols-7">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const dayOfMonth = weekIndex * 7 + dayIndex + 1;
                  const dateKey = `${dayOfMonth}-07-2024`; // Example date format, adjust as needed
                  const callsScheduled = scheduleData[dateKey] || 0;

                  return (
                    <td
                      key={dayOfMonth}
                      className={`relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31`}
                      onClick={() => handleClickDay(dateKey)}
                    >
                      <span className="font-medium text-black dark:text-white">{dayOfMonth}</span>
                      {callsScheduled > 0 && (
                        <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full text-xs">
                          {callsScheduled} calls
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
