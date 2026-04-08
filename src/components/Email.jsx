import React from 'react'

export default function Email({ email }) {
  if (!email) return null;

  return (
    <div className="flex items-center gap-2">
      <img
        src={`${import.meta.env.BASE_URL}icons/email.svg`}
        alt="Email"
        className="w-5 h-5 blue-icon"
      />
      <a href={`mailto:${email}`} className="text-gray-700 dark:text-gray-500 underline">{email}</a>
    </div>
  );
}
