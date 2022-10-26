import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import './ActionButtons.css';

const ActionButtons = ({
  isEditMode,
  handleEditMode,
  handleCancel,
  handleSave,
  isUpdating,
}: {
  isEditMode: boolean;
  handleEditMode: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  isUpdating?: boolean;
}) => {
  if (isUpdating) return <CircularProgress sx={{ alignSelf: 'flex-end' }} />;
  return (
    <div>
      {!isEditMode ? (
        <Button
          variant="contained"
          className="button-container"
          onClick={handleEditMode}
          sx={{ width: 100 }}
        >
          Edit
        </Button>
      ) : (
        <div className="button-container">
          <Button
            id="Button"
            color="error"
            variant="contained"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id="Button"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
