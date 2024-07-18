import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

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

interface Props {
  uploadedFiles: File[];
}

const TableFile: React.FC<Props> = ({ uploadedFiles }) => {
  const [tableData, setTableData] = useState<Company[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(25);

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const content = e.target.result as ArrayBuffer;
          const workbook = XLSX.read(new Uint8Array(content), { type: 'array' });

          // Assuming only one sheet for simplicity
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const parsedData = parseExcel(sheet);
          setTableData(parsedData);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }, [uploadedFiles]);

  const parseExcel = (sheet: XLSX.Sheet): Company[] => {
    const data: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Assuming headers are in the first row and data starts from the second row
    const headers = data[0];
    const companies: Company[] = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const company: Company = {
        id: i,
        field1: row[0],
        field2: row[1],
        field3: row[2],
        field4: row[3],
        field5: row[4],
        status: row[5],
        calls: [], // You may populate this based on your data structure
      };

      companies.push(company);
    }

    return companies;
  };

  const openModal = (company: Company) => {
    setSelectedCompany(company);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCompany(null);
  };

  // Logic to paginate table data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tableData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(tableData.length / recordsPerPage);

  return (
    <div className="">
      <h3 className="text-lg text-center font-semibold mb-4 text-gray-800 mt-2">
        Call Record and Details
      </h3>
      <div className="shadow-lg p-2 overflow-auto">
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
            {currentRecords.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.field1}</td>
                <td className="px-6 py-4">{item.field2}</td>
                <td className="px-6 py-4 wrap-text">{item.field3}</td> {/* Apply custom class here */}
                <td className="px-6 py-4">{item.field4}</td>
                <td className="px-6 py-4">{item.field5}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-y-2">
                  <button
                    className="text-white hover:text-white text-sm flex justify-center items-center bg-blue-400 p-2 rounded-lg"
                    onClick={() => openModal(item)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end gap-4 items-center mt-4">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          {tableData.length > recordsPerPage && (
            <nav className="inline-flex rounded-md shadow-sm -space-x-px gap-2" aria-label="Pagination">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                  currentPage === 1 ? 'cursor-not-allowed pointer-events-none' : ''
                }`}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>

              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                  currentPage === totalPages ? 'cursor-not-allowed pointer-events-none' : ''
                }`}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>

              </button>
            </nav>
          )}
        </div>

        {/* Modal */}
        {selectedCompany && (
          <div
            className={`fixed z-10 inset-0 overflow-y-auto ${
              modalIsOpen ? 'block' : 'hidden'
            }`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Company Details
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <strong>Business Name:</strong> {selectedCompany.field1}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Phone:</strong> {selectedCompany.field2}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Website:</strong> {selectedCompany.field3}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Email:</strong> {selectedCompany.field4}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Name:</strong> {selectedCompany.field5}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Status:</strong> {selectedCompany.status}
                      </p>
                      <p className="text-sm text-gray-500 mt-4">
                        <strong>Call Records:</strong>
                      </p>
                      <ul className="text-sm text-gray-500">
                        {selectedCompany.calls.map((call, index) => (
                          <li key={index}>
                            <strong>Date:</strong> {call.date},{' '}
                            <strong>Template:</strong> {call.template}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableFile;
