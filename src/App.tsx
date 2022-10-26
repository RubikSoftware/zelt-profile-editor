import * as React from 'react';
import Box from '@mui/material/Box';
import { Routes, Route, Navigate } from 'react-router-dom';
import PersonalData from './pages/PersonalData';
import ContractData from './pages/ContractData';
import NotFound from './pages/NotFound';
import { Navbar } from './common/components';
import './App.css';

const drawerWidth = 240;
export default function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar drawerWidth={drawerWidth} />
      <Box
        className="box-container"
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 10,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Routes>
          <Route path={'/personal'} element={<PersonalData />} />
          <Route path={'/contract'} element={<ContractData />} />
          <Route path={'/'} element={<Navigate replace to="/personal" />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}
