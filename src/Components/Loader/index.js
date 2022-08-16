import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((themes) => ({
    CircularIndeterminate: {
      display : 'flex',
    }, 
}));

export default function CircularIndeterminate() {
    const classes = useStyles();
  return (
    <Box sx={{ display: 'flex' }}   
     >
      <CircularProgress  size={30} style={{margin : 'auto'}}  color='inherit'/>
    </Box>
  );
}