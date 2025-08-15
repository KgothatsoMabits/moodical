import React from 'react';

const SkeletonCard = () => (
  <div className="playlist-card animate-pulse">
    <div className="bg-gray-700/50 playlist-image"></div>
    <div className="playlist-info">
      <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
      <div className="h-3 bg-gray-700/50 rounded w-1/2 mt-2"></div>
    </div>
  </div>
);

const PlaylistSkeleton = () => {
  return (
    <div className="playlists-container">
      <h2 className="section-title">Finding Your Playlists...</h2>
      <div className="grid playlists">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistSkeleton;