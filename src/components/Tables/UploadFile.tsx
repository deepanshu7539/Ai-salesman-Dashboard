import React, { useState, ChangeEvent } from "react";

interface CsvUploaderProps {
  onFilesUpload: (files: File[]) => void;
}

const CsvUploader: React.FC<CsvUploaderProps> = ({ onFilesUpload }) => {
  const [csvFiles, setCsvFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFiles((prevFiles) => [...prevFiles, file]);
      e.target.value = ""; // Reset file input value
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleRemoveFile = (index: number) => {
    setCsvFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // Call the callback with csvFiles state when Upload button is clicked
    onFilesUpload(csvFiles);
    // Optionally, you can reset the state after uploading
    setCsvFiles([]);
  };

  return (
    <div className="flex items-start justify-center rounded-md bg-white p-4">
      <div className="w-full max-w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Upload CSV Files</h2>
          {/* Download Sample CSV Link */}
          <div className="mt-2 sm:mt-0">
            <a
              href="/sample.csv" // Replace with the actual path to your sample CSV file
              download="sample.csv"
              className="text-md text-red-600 hover:text-gray-900"
            >
              Download Sample CSV
            </a>
          </div>
        </div>
       
        <p className="text-sm text-gray-600 mb-4">
          Please upload CSV files containing the following fields:
          <ul className="text-sm text-gray-600 mb-4 list-disc pl-4">
            <li>
              Client's Business Name as <strong>Business Name</strong>
            </li>
            <li>
              Client's Email as <strong>Email ID</strong>
            </li>
            <li>
              Client's Phone number as <strong>Phone</strong>
            </li>
            <li>
              Client's Website as <strong>Website</strong>
            </li>
            <li>
              Founder's Name as <strong>Name</strong>
            </li>
          </ul>
        </p>
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="36" height="38" fill="#4CAF50">
              <path d="M6 3v18h12V3H6zm2 2h8v2H8V5zm0 4h8v2H8V9zm0 4h6v2H8v-2z" />
            </svg>
            <span className="ml-2 text-sm text-gray-600">Click to upload</span>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          {csvFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Selected Files:</h3>
              <ul className="divide-y divide-gray-300">
                {csvFiles.map((file, index) => (
                  <li
                    key={index}
                    className={`rounded-md flex items-center justify-between py-2 ${index % 2 ? "bg-gray-100" : "bg-white"} px-2`}
                  >
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default CsvUploader;
