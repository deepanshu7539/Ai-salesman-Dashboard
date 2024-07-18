import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableFile from '../components/Tables/TableFile';
import CsvUploader from '../components/Tables/UploadFile';

const Tables = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [tableData, setTableData] = useState<any[]>([]); // Assuming you may have different data structures

  const handleFilesUpload = (files: File[]) => {
    setUploadedFiles(files);
    // Process uploaded files, update tableData if necessary
    // In this example, let's just pass the files to TableFile component
  };

  return (
    <>
      <Breadcrumb pageName="All Data" />

      <div className="flex flex-col gap-10">
        <CsvUploader onFilesUpload={handleFilesUpload}/>
        <TableFile uploadedFiles={uploadedFiles} />
      </div>
    </>
  );
};

export default Tables;
