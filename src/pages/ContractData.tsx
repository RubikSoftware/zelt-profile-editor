import React from 'react';
import { Contract } from '../api/mock-api';
import { CustomizedField, ActionButtons } from '../common/components';
import { CircularProgress, Alert, Snackbar } from '@mui/material';
import {
  fetchContract,
  updateNewContract,
} from '../features/profile/contractSlice';
import { useAppSelector } from '../common/hooks/reduxHooks';
import { useForm } from '../common/hooks';

const ContractData = () => {
  const myContract = useAppSelector((state) => state.contract.contract);
  const error = useAppSelector((state) => state.contract.error);

  const {
    loading,
    isUpdating,
    isEditMode,
    handleChange,
    handleEditMode,
    handleCancel,
    notification,
    closeNotification,
    handleSave,
    handleChangeDate,
    fetchedData: updatedContract,
  } = useForm<Contract>({
    fetch: fetchContract,
    update: updateNewContract,
    data: myContract,
  });
  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  return (
    <div style={{ marginRight: '5vw' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ActionButtons
          isUpdating={isUpdating}
          isEditMode={isEditMode}
          handleEditMode={handleEditMode}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      </div>

      <CustomizedField
        isEditMode={isEditMode}
        id={'salary'}
        type={'number'}
        value={updatedContract?.salary}
        label={'Salary'}
        handleChange={handleChange}
      />
      <CustomizedField
        isEditMode={isEditMode}
        id={'bonus'}
        type={'number'}
        value={updatedContract?.bonus}
        label={'Bonus'}
        handleChange={handleChange}
      />
      <CustomizedField
        isEditMode={isEditMode}
        type="date"
        id={'startDate'}
        value={updatedContract?.startDate}
        label={'Start Date'}
        handleChangeDate={handleChangeDate}
      />
      <CustomizedField
        isEditMode={isEditMode}
        id={'leaveDays'}
        type={'number'}
        value={updatedContract?.leaveDays}
        label={'Leave Days'}
        handleChange={handleChange}
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

export default ContractData;
