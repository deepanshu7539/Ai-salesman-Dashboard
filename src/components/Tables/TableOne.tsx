import React, { useState } from 'react';
import FollowUp from './FollowUp';

interface Call {
  date: string;
  template: string;
}

interface Company {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  status: string;
  calls: Call[];
}

const TableOne: React.FC = () => {
  const tableData: Company[] = [
    {
      id: 1,
      field1: "Business 1",
      field2: "123-456-7890",
      field3: "business1.com",
      field4: "contact@business1.com",
      field5: "John Doe",
      status: "pending",
      calls: [
        { date: "2024-07-01", template: "Template 1" },
        { date: "2024-07-05", template: "Template 2" },
      ],
    },
    {
      id: 2,
      field1: "Business 2",
      field2: "987-654-3210",
      field3: "business2.com",
      field4: "contact@business2.com",
      field5: "Jane Doe",
      status: "success",
      calls: [
        { date: "2024-07-02", template: "Template A" },
        { date: "2024-07-06", template: "Template B" },
      ],
    },
    // Add other data entries similarly
  ];

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [followUpModalIsOpen, setFollowUpModalIsOpen] = useState<boolean>(false);

  const openModal = (company: Company) => {
    setSelectedCompany(company);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCompany(null);
  };

  const openFollowUpModal = () => {
    setFollowUpModalIsOpen(true);
  };

  const closeFollowUpModal = () => {
    setFollowUpModalIsOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className="">
      <h3 className="text-lg text-center font-semibold mb-4 text-gray-800 mt-2">
        Call Record and Details
      </h3>
      <div className="shadow-lg p-2 h-[81vh] overflow-auto">
        <div className='flex justify-end items-center mr-4'>
           <button
                    className="text-white hover:text-white text-sm flex  justify-center gap-2 bg-green-600 p-2  rounded-lg"
                    onClick={() => openFollowUpModal()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                      />
                    </svg>
                    Follow Up
                  </button>
        </div>
        <table className="min-w-full divide-y divide-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {tableData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 overflow-x-auto">{item.field1}</td>
                <td className="px-6 py-4 overflow-x-auto">{item.field2}</td>
                <td className="px-6 py-4 overflow-x-auto">{item.field3}</td>
                <td className="px-6 py-4 overflow-x-auto">{item.field4}</td>
                <td className="px-6 py-4 overflow-x-auto">{item.field5}</td>
                <td className="px-6 py-4 overflow-x-auto">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-2 overflow-x-auto space-y-2">
                 
                  <button
                    className="text-white hover:text-white text-sm flex justify-center items-center bg-blue-400 p-2 rounded-lg"
                    onClick={() => openModal(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Follow Up */}
      {followUpModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xl w-full top-10 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeFollowUpModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <FollowUp  />
          </div>
        </div>
      )}

      {/* Modal for Call Details */}
      {modalIsOpen && selectedCompany && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4">Call Details</h2>
            <ul>
              {selectedCompany.calls.map((call, index) => (
                <li key={index}>
                  <strong>Date:</strong> {call.date} | <strong>Template:</strong> {call.template}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOne;
