import React, { useState, ChangeEvent } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CsvUploader from '../components/Tables/UploadFile';
import CallInstruction from '../components/Tables/CallInstruction';
import FollowUp from '../components/Tables/FollowUp';
import ProgressBar from './UiElements/ProgressBar';

const Tables: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<number>(50);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().substr(0, 10));
  const [callInstructions, setCallInstructions] = useState<string[]>([]);
  const [followUpText, setFollowUpText] = useState<string>('');

  const handleFilesUpload = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCapacity = parseInt(event.target.value);
    setSelectedCapacity(newCapacity);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleCallInstructionsChange = (instructions: string[]) => {
    setCallInstructions(instructions);
  };

  const handleFollowUpTextChange = (text: string) => {
    setFollowUpText(text);
  };


  const handleStartCall = async () => {

    const formData = new FormData();
    formData.append('capacity', selectedCapacity.toString());
    formData.append('startDate', startDate);
    formData.append('followUpText', followUpText);

    callInstructions.forEach((instruction, index) => {
      formData.append(`instruction_${index}`, instruction);
    });

    uploadedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    try {
      const response = await fetch('http://localhost:8000/loop', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Error sending data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="All Data" />
      <ProgressBar />

      <div className="flex flex-col gap-10 mt-4">
        <div id='call-instructions'>
          <CallInstruction onChange={handleCallInstructionsChange} />
        </div>
        <div id="follow-up">
          <FollowUp onChange={handleFollowUpTextChange} />
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
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>

            <button
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleStartCall}
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
      </div>
    </>
  );
};

export default Tables;
