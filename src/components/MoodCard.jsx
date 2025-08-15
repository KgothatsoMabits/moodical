import React, { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const MoodCard = ({ mood, onSelect, selected = false, isAvailable = false }) => {
  const cardClassName = `mood-card ${selected ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`;
  return (
    <motion.button
      onClick={() => onSelect(mood)}
      className={cardClassName}
      disabled={!isAvailable}
      whileHover={{ scale: isAvailable ? 1.05 : 1.0 }}
      whileTap={{ scale: isAvailable ? 0.95 : 1.0 }}
    >
      <img src={mood.image} alt={mood.label} className="mood-image" />
      <h3 className="mood-title">{mood.label}</h3>
      <p className="mood-desc">{mood.desc}</p>
      {!isAvailable && <div className="unavailable-overlay">Not Available</div>}
    </motion.button>
  );
};

MoodCard.propTypes = {
  mood: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  isAvailable: PropTypes.bool,
};

export default memo(MoodCard); 