import React from 'react';
import { motion } from 'framer-motion';

const Square = ({ value, onClick }) => {
  return (
    <motion.button
      className="flex items-center justify-center w-16 h-16 bg-white border-2 border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {value}
    </motion.button>
  );
};
const Board = ({ squares, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default Board;





