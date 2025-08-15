import React, { memo } from 'react'; 
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const PlaylistGrid = ({ playlists = [] }) => {
  const validPlaylists = playlists.filter(p => p);
  if (validPlaylists.length === 0) return null;

  return (
    <div className="playlists-container">
      <h2 className="section-title">Recommended Playlists</h2>
      <div className="grid playlists">
        {validPlaylists.map((playlist) => (
          <motion.a
            key={playlist.id}
            href={playlist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="playlist-card group"
            whileHover={{ y: -5 }}
          >
            <img src={playlist.images[0]?.url} alt={playlist.name} className="playlist-image" />
            <div className="playlist-info">
              <h3 className="playlist-title">{playlist.name}</h3>
              <p className="playlist-desc">{playlist.owner.display_name}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

PlaylistGrid.propTypes = {
  playlists: PropTypes.array,
};

export default memo(PlaylistGrid); 