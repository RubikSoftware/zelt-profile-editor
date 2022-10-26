import React from 'react';
import { Profile } from '../api/mock-api';
import { CustomizedField, PersonalDataHeader } from '../common/components';
import {
  fetchPersonalData,
  updatePersonalData,
} from '../features/profile/personalSlice';
import { useAppSelector } from '../common/hooks/reduxHooks';
import { CircularProgress, Alert, Snackbar } from '@mui/material';
import { useForm } from '../common/hooks';

const PersonalData = () => {
  const profile = useAppSelector((state) => state.personal.profile);
  const error = useAppSelector((state) => state.personal.error);

  const {
    loading,
    isUpdating,
    isEditMode,
    handleChange,
    handleEditMode,
    handleCancel,
    handleSave,
    fetchedData: updatedProfile,
    handleChangeDate,
    closeNotification,
    notification,
  } = useForm<Profile>({
    fetch: fetchPersonalData,
    update: updatePersonalData,
    data: profile,
  });

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  return (
    <div style={{ marginRight: '5vw' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <PersonalDataHeader
          isUpdating={isUpdating}
          isEditMode={isEditMode}
          profile={profile}
          handleEditMode={handleEditMode}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      </div>

      <CustomizedField
        isEditMode={isEditMode}
        id={'firstName'}
        value={updatedProfile?.firstName}
        label={'First Name'}
        handleChange={handleChange}
      />
      <CustomizedField
        isEditMode={isEditMode}
        id={'lastName'}
        value={updatedProfile?.lastName}
        label={'Last Name'}
        handleChange={handleChange}
      />
      <CustomizedField
        isEditMode={isEditMode}
        type="date"
        id={'dob'}
        value={updatedProfile?.dob}
        label={'Date of Birth'}
        handleChangeDate={handleChangeDate}
      />
      <Snackbar
        open={notification === null ? false : true}
        autoHideDuration={6000}
        onClose={closeNotification}
      >
        <Alert onClose={closeNotification} severity={notification?.type}>
          {notification?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PersonalData;