import React, { useState } from 'react';
import Calendar from '../Calendar'; // Assuming you have a Calendar component

interface ScheduleButtonProps {
  onScheduleUpdate: (date: string, calls: number) => void;
}

const CallButton: React.FC<ScheduleButtonProps> = ({ onScheduleUpdate }) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [callsScheduled, setCallsScheduled] = useState<number>(0);

  const openCalendar = () => {
    setCalendarOpen(true);
  };

  const closeCalendar = () => {
    setCalendarOpen(false);
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    // For simplicity, let's set a default value for callsScheduled
    setCallsScheduled(5); // Replace with your logic to fetch actual calls scheduled
  };

  const handleScheduleUpdate = () => {
    onScheduleUpdate(selectedDate, callsScheduled);
    closeCalendar();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        onClick={openCalendar}
      >
        Schedule Calls
      </button>

      {isCalendarOpen && (
        <div className=" absolute right-0 mt-2 w-230 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className=''>
                 <Calendar onDateSelect={handleDateSelection} />
            </div>
           
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">Calls scheduled on {selectedDate}</p>
              <p className="text-sm text-gray-500">{callsScheduled} calls scheduled</p>
              <button
                type="button"
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleScheduleUpdate}
              >
                Update Schedule
              </button>
              <button
                type="button"
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none"
                onClick={closeCalendar}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallButton;
