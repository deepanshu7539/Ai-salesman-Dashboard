import React, { useState } from 'react';

interface FollowUpComponentProps {
  selectedCompany: Company;
  onClose: () => void;
  onSubmit: (followUpMessage: string, callTextInstructions: string, knowledgeBase: string) => void;
}

const FollowUpComponent: React.FC<FollowUpComponentProps> = ({
  selectedCompany,
  onClose,
  onSubmit,
}) => {
  const [followUpMessage, setFollowUpMessage] = useState<string>('');
  const [callTextInstructions, setCallTextInstructions] = useState<string>('');
  const [knowledgeBase, setKnowledgeBase] = useState<string>('');

  const handleSubmit = () => {
    onSubmit(followUpMessage, callTextInstructions, knowledgeBase);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-md shadow-lg z-10 w-2/3">
        <h2 className="text-lg font-semibold mb-4">Enter Your Follow-Up Template</h2>
        <div className="mb-4">
          <h3 className="text-md font-medium">Template Details</h3>
          <p className="text-sm text-gray-500">
            <strong>Company Name:</strong> {selectedCompany.field1}
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
            <strong>Founder Name:</strong> {selectedCompany.field5}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Call Text Instructions
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-2"
            value={callTextInstructions}
            onChange={(e) => setCallTextInstructions(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Knowledge Base
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-2"
            value={knowledgeBase}
            onChange={(e) => setKnowledgeBase(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Follow-Up Text
          </label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={4}
            value={followUpMessage}
            onChange={(e) => setFollowUpMessage(e.target.value)}
            placeholder="Enter your follow-up message here..."
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Send Follow-Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpComponent;
