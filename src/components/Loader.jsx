import React from 'react';

export default function Loader({ small }) {
  return (
    <div className="flex justify-center items-center py-6">
      <div className={`w-${small ? '6' : '12'} h-${small ? '6' : '12'} rounded-full border-4 border-slate-200 border-t-brand animate-spin`} />
    </div>
  );
}
