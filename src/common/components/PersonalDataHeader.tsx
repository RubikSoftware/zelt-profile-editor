import React from 'react';
import { Profile } from '../../api/mock-api';
import { Avatar } from '@mui/material';
import ActionButtons from './ActionButtons';

const PersonalDataHeader = ({
  profile,
  ...actionProps
}: {
  profile: Profile | undefined;
  handleEditMode: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  isEditMode: boolean;
  isUpdating: boolean;
}) => {
  return (
    <>
      {
        <Avatar
          sx={{ width: 176, height: 176 }}
          alt={profile?.firstName}
          src={profile?.profilePictureURL}
        />
      }
      <ActionButtons {...actionProps} />
    </>
  );
};

export default PersonalDataHeader;
