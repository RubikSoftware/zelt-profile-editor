import * as React from 'react';
import Box from '@mui/material/Box';
import { Routes, Route, Navigate } from 'react-router-dom';
import PersonalData from './pages/PersonalData';
import ContractData from './pages/ContractData';
import NotFound from './pages/NotFound';
import { Navbar } from './common/components';

const drawerWidth = 240;
export default function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar drawerWidth={drawerWidth} />
      
    </Box>
  );
}
