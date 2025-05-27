import React from 'react';
import HeaderWithLine from './HeaderWithLine';
import { formatDate } from '../utils/dateFormat';

export default function Extras({ extras }) {
  if (!extras || extras.length === 0) {
    return null;
  }

  return (
    <section>
      <HeaderWithLine title="Extras" />
      <div className="space-y-6">
        {extras.map((extra, idx) => (
          <div
            key={idx}
            className={`${idx !== extras.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''} pb-4`}
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <div className="text-xl font-semibold">{extra.role}</div>
                <div className="text-gray-500 dark:text-gray-400 text-lg font-semibold print:text-gray-500">{extra.organization}</div>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-base print:text-gray-500">
                {formatDate(extra.startDate)} - {extra.endDate ? formatDate(extra.endDate) : "Present"}
              </div>
            </div>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {extra.highlights.map((item, highlightIdx) => (
                <li key={highlightIdx} className="text-gray-700 dark:text-gray-500 text-base text-justify print:text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}