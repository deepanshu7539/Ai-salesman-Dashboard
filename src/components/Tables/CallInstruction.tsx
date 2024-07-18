import React, { useState } from 'react';

interface InstructionProps {
  instructions: string[];
}

const InstructionList: React.FC<InstructionProps> = ({ instructions }) => {
  return (
    <ul className="list-disc list-inside mb-4">
      {instructions.map((instruction, index) => (
        <li key={index}>{instruction}</li>
      ))}
    </ul>
  );
};

const CallInstruction: React.FC = () => {
  const [text, setText] = useState<string>('');
  const instructions = [
    "Describe how the AI Should behave on the phone call.",
    "You can write up to 300 letters.",
  ];

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const letterCount = event.target.value.length;
    if (letterCount <= 300) {
      setText(event.target.value);
    } else {
      setText(event.target.value.slice(0, 300));
    }
  };

  const letterCount = text.length;

  return (
    <div className='flex items-start justify-center rounded-md bg-white p-4'>
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Enter your call instructions</h2>
        <InstructionList instructions={instructions} />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={handleTextChange}
          rows={5}
          placeholder="Start typing here..."
        />
        <div className="text-right text-sm text-gray-600 mt-2">
          Letter count: {letterCount} / 300
        </div>
      </div>
    </div>
  );
};

export default CallInstruction;
