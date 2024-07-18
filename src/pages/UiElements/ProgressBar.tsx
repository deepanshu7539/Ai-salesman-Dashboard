import React from 'react';

const ProgressBar: React.FC = () => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
        <li className="relative md:flex md:flex-1">
          <a href="#call-instructions" className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
              <span className="text-indigo-600">01</span>
            </span>
            <span className="ml-4 text-sm font-medium text-indigo-600">Call Instructions</span>
          </a>
          <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
            <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
              <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
            </svg>
          </div>
        </li>

        <li className="relative md:flex md:flex-1">
          <a href="#follow-up" className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
              <span className="text-indigo-600">02</span>
            </span>
            <span className="ml-4 text-sm font-medium text-indigo-600">Follow Up Instructions</span>
          </a>
          <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
            <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
              <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
            </svg>
          </div>
        </li>

        <li className="relative md:flex md:flex-1">
          <a href="#upload-file" className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
              <span className="text-indigo-600">03</span>
            </span>
        <span className="ml-4 text-sm font-medium text-indigo-600">Upload data files</span>
          </a>
          {/* Arrow separator for lg screens and up */}
          <div className="absolute right-0 top-0 hidden h-full w-5 md:block" aria-hidden="true">
            <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
              <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
            </svg>
          </div>
        </li>

        <li className="relative md:flex md:flex-1">
          <a href="#schedule-calls" className="group flex items-center">
            <span className="flex items-center px-6 py-4 text-sm font-medium">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-indigo-600">
                <span className="text-indigo-600 group-hover:text-gray-900">04</span>
              </span>
              <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-gray-900">Schedule Calls</span>
            </span>
          </a>
        </li>

        
      </ol>
    </nav>
  );
};

export default ProgressBar;
