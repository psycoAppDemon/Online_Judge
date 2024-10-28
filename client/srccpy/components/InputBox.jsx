import React from 'react';
import { Box, TextField } from '@mui/material';

const InputBox = ({label, placeholder}) => (
  <TextField
    multiline
    fullWidth
    placeholder={placeholder}
    label={label}
    variant="outlined"
    InputProps={{
      sx: {
        alignItems: 'start', // Align text to top
        height: '100%',
        overflow: 'auto',
        '& textarea': {
          height: '100%',
          resize: 'none',
          padding: '8px', // Ensure padding for better appearance
        },
      },
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        height: '100%', // Match parent's height
        overflow: 'hidden', // Prevent layout issues
      },
    }}
  />
);

export default InputBox;
