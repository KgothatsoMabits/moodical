import React from "react";
import "../styles/global.css";

export default function PlaylistCard({ playlist }) {
  const img = playlist.images?.[0]?.url;

  return (
    <div className="playlist-card" tabIndex={0}>
      {img ? (
        <img
          src={img}
          alt={playlist.name}
          className="playlist-card__image"
        />
      ) : (
        <div className="playlist-card__image playlist-card__image--placeholder" />
      )}

      <div className="playlist-card__title">{playlist.name}</div>
      <div className="playlist-card__owner">
        {playlist.owner?.display_name || playlist.owner}
      </div>

      <a
        href={playlist.external_urls?.spotify}
        target="_blank"
        rel="noreferrer"
        className="playlist-card__link"
        aria-label={`Open playlist ${playlist.name} on Spotify`}
      >
        Open
      </a>
    </div>
  );
}
