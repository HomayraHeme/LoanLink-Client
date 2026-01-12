import React from 'react';
import { useTheme } from '../Theme/ThemeContext';

const LoadingSkeleton = ({ count = 8 }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const skeletonBg = isDark ? 'bg-gray-800' : 'bg-gray-200';
  const skeletonAnimation = 'animate-pulse';

  return (
    <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`flex flex-col justify-between p-4 rounded-lg shadow-md ${skeletonAnimation}`}
        >
          <div className={`h-40 w-full rounded-md ${skeletonBg} mb-3`} />
          <div className={`h-6 w-3/4 rounded ${skeletonBg} mb-2`} />
          <div className={`h-4 w-1/2 rounded ${skeletonBg} mb-2`} />
          <div className={`h-4 w-1/3 rounded ${skeletonBg} mb-3`} />
          <div className={`h-10 w-full rounded ${skeletonBg}`} />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
