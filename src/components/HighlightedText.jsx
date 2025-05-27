import React from 'react';

const highlightStyles = {
  technology: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
  impact: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
};

export default function HighlightedText({ text, highlights = [] }) {
  if (!highlights.length) {
    return <span>{text}</span>;
  }

  let result = [];
  let lastIndex = 0;

  // Sort highlights by their position in the text
  const sortedHighlights = highlights
    .map(highlight => ({
      ...highlight,
      start: text.indexOf(highlight.text),
      end: text.indexOf(highlight.text) + highlight.text.length
    }))
    .filter(h => h.start !== -1)
    .sort((a, b) => a.start - b.start);

  sortedHighlights.forEach((highlight, index) => {
    // Add text before highlight
    if (highlight.start > lastIndex) {
      result.push(
        <span key={`text-${index}`}>
          {text.slice(lastIndex, highlight.start)}
        </span>
      );
    }

    // Add highlighted text
    result.push(
      <span
        key={`highlight-${index}`}
        className={`px-1 py-0.5 rounded text-sm font-medium print:bg-transparent print:text-gray-700 ${highlightStyles[highlight.type] || ''}`}
      >
        {highlight.text}
      </span>
    );

    lastIndex = highlight.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    result.push(
      <span key="text-end">
        {text.slice(lastIndex)}
      </span>
    );
  }

  return <>{result}</>;
}