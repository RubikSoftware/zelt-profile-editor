import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch } from './reduxHooks';
import { AlertColor } from '@mui/material';

import { Dispatch } from 'react';
import moment from 'moment';

const useForm = <T extends object>({
  fetch,
  update,
  data,
}: {
  fetch: () => void;
  update: Dispatch<any>;
  data: T;
}) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: AlertColor | undefined;
  } | null>(null);
  const [fetchedData, setFetchedData] = React.useState<T | null>(null);

  const fetchData = useCallback(async () => {
    if (!data) {
      await dispatch(fetch());
    } else {
      setFetchedData(data);
      setLoading(false);
    }
  }, [dispatch, data, fetch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFetchedData((prevState: any) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const handleChangeDate = (
    e: React.ChangeEvent<HTMLInputElement> & moment.Moment,
    id: string
  ) => {
    setFetchedData((prevState: any) => {
      return { ...prevState, [id]: moment(e).format('YYYY-MM-DD') };
    });
  };

  const handleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };
  const handleCancel = () => {
    setFetchedData(data);
    setIsEditMode((prevState) => !prevState);
  };
  const handleSave = async () => {
    setIsUpdating(true);
    await dispatch(update(fetchedData));
    setIsEditMode(false);
    setIsUpdating(false);
    setNotification({ message: 'Form has been updated successfully.', type: 'success' });
  };
  const closeNotification = () => {
    setNotification(null);
  };
  return {
    loading,
    isUpdating,
    isEditMode,
    handleChange,
    notification,
    closeNotification,
    handleEditMode,
    handleCancel,
    handleSave,
    fetchedData,
    handleChangeDate,
  };
};

export default useForm;
