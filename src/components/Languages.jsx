import React from 'react';
import HeaderWithLine from './HeaderWithLine';

export default function Languages({ languages }) {
    if (!languages || languages.length === 0) {
      return null;
    }

    return (
      <section>
        <HeaderWithLine title="Languages" />
        <ul className="list-disc list-inside space-y-1">
          {languages.map((lang, idx) => (
            <li key={idx} className="text-gray-700 dark:text-gray-500 text-base text-justify print:text-gray-700">
              <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold print:text-gray-500">{lang.language}</span> ({lang.fluency})
            </li>
          ))}
        </ul>
      </section>
    );
  }