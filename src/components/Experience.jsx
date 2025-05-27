import React, { useState, useEffect } from 'react'
import HeaderWithLine from './HeaderWithLine';
import HighlightedText from './HighlightedText';
import { formatDate } from '../utils/dateFormat';

export default function Experience({ work }) {
  const [highlightsData, setHighlightsData] = useState({});

  useEffect(() => {
    fetch('/highlights.json')
      .then(response => response.json())
      .then(data => setHighlightsData(data))
      .catch(error => console.error('Error loading highlights:', error));
  }, []);

  return (
    <section >
      <HeaderWithLine title="Experience" />
      <div className="space-y-6">
        {work.map((job, jobIdx) => (
          <div
            key={jobIdx}
            className={`${jobIdx !== work.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''} pb-4`}
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <div className="text-xl font-semibold">{job.position}</div>
                <div className="text-gray-500 dark:text-gray-400 text-lg font-semibold print:text-gray-500">{job.company}</div>
                {job.team && <div className="text-gray-500 text-base text-justify print:text-gray-500">{job.team}</div>}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-base print:text-gray-500">
                {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : "Present"}
              </div>
            </div>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {job.highlights.map((item, highlightIdx) => {
                const jobHighlights = highlightsData.work?.[jobIdx]?.highlights?.[highlightIdx] || [];
                return (
                  <li key={highlightIdx} className="text-gray-700 dark:text-gray-500 text-base text-justify print:text-gray-700">
                    <HighlightedText text={item} highlights={jobHighlights} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}