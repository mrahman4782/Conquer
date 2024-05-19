import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Message = ({ show, message, type = 'error'}) => {

  let msgColor = '#FF7871'; // Default color for error messages
  if (type === 'success') {
    msgColor = '#76DC76'; // Change color for success messages
  }

  return (
    show ?
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -400%)',
        padding: '20px',
        backgroundColor: msgColor, 
        color: 'white',
        borderRadius: '5px',
        zIndex: 9999,
      }}
    >
      {message}
    </Box>
    : null
  )};

export default Message;
