import React from 'react';

export default function PlaylistCard({ playlist }) {
  const img = playlist.images?.[0]?.url;
  return (
    <div className="playlist-card card flex flex-col items-stretch p-2">
      {img ? <img src={img} alt={playlist.name} className="w-full h-36 object-cover rounded-md mb-2" /> :
        <div className="w-full h-36 bg-slate-100 rounded-md mb-2" />}
      <div className="font-medium">{playlist.name}</div>
      <div className="text-sm text-slate-500">{playlist.owner?.display_name || playlist.owner}</div>
      <a className="mt-2 text-sm text-brand hover:underline" href={playlist.external_urls?.spotify} target="_blank" rel="noreferrer">Open</a>
    </div>
  );
}
