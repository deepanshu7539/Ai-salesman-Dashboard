import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFile from '../components/Tables/TableFile';
import CsvUploader from '../components/Tables/UploadFile';
import CallInstruction from '../components/Tables/CallInstruction';
import FollowUp from '../components/Tables/FollowUp';
import CallButton from './UiElements/CallButton';
import ProgressBar from './UiElements/ProgressBar';

const Tables: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [tableData, setTableData] = useState<any[]>([]); // Assuming you may have different data structures
  const [progress, setProgress] = useState<number>(0); // State to manage progress

  const handleFilesUpload = (files: File[]) => {
    setUploadedFiles(files);
    // Process uploaded files, update tableData if necessary
    // In this example, let's just pass the files to TableFile component
  };

  const handleScheduleUpdate = (date: string, calls: number) => {
    // Logic to update schedule or perform other actions based on date and calls
    console.log(`Scheduled calls for ${date}: ${calls}`);
  };

  const [selectedCapacity, setSelectedCapacity] = useState<number>(50); // Initial selected capacity

  const handleCapacityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCapacity = parseInt(event.target.value); // Parse selected value to integer
    setSelectedCapacity(newCapacity); // Update selected capacity state
  };

  // Simulate progress
  const simulateProgress = () => {
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <>
      <Breadcrumb pageName="All Data" />
      <ProgressBar/>

      <div className="flex flex-col gap-10 mt-4">
        <div id='call-instructions'>
        <CallInstruction />
        </div>
        <div id="follow-up">
        <FollowUp />
        </div>
        <div id="upload-file">
        <CsvUploader onFilesUpload={handleFilesUpload} />
        </div>
      <div className="bg-white rounded-md p-4" id="schedule-calls">
  <div className="flex flex-wrap justify-between items-center">
    <div className="w-full sm:w-auto mb-4 sm:mb-0">
      <label htmlFor="callCapacity" className="text-slate-700 font-bold">
        Select Calls per Day:
      </label>
      <span className="inline-block ml-1 px-1 py-0 bg-yellow-500 text-white text-[10px] font-semibold rounded">
        PRO
      </span>
      <select
        disabled
        id="callCapacity"
        className="block mt-1 border-[1px] h-7 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 cursor-not-allowed w-full sm:w-auto"
        value={selectedCapacity}
        onChange={handleCapacityChange}
      >
        <option value={50}>All calls</option>
        <option value={50}>50 calls/day</option>
        <option value={100}>100 calls/day</option>
        <option value={200}>200 calls/day</option>
      </select>
    </div>
    
    <div className="w-full sm:w-auto mb-4 sm:mb-0">
      <label htmlFor="startDate" className="text-slate-700 font-bold">
        Start Date:
      </label>
      <span className="inline-block ml-1 px-1 py-0 bg-yellow-500 text-white text-[10px] font-semibold rounded">
        PRO
      </span>
      <input
        disabled
        type="date"
        id="startDate"
        className="block mt-1 border-[1px] h-7 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 cursor-not-allowed w-full sm:w-auto"
        defaultValue={new Date().toISOString().substr(0, 10)}
      />
    </div>

    <button
      className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={simulateProgress}
    >
      <svg
        className="w-6 h-6 inline-block mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      Start Call
    </button>
  </div>
</div>



        {/* <TableFile uploadedFiles={uploadedFiles} /> */}
      </div>
    </>
  );
};

export default Tables;
