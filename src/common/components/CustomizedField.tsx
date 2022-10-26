import React from 'react';
import { TextField, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './CustomizedField.css';

const CustomizedField = ({
  isEditMode,
  value,
  label,
  id,
  type = 'text',
  handleChange = function () {},
  handleChangeDate = function () {},
}: {
  isEditMode: boolean;
  value: string | undefined | number;
  label: string;
  id: string;
  type?: string;
  handleChange?: (val: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate?: (val?: any, id?: any) => any;
}) => {
  return (
    <>
      <Divider variant="inset" sx={{ mt: 4, mb: 4, ml: 0 }} />
      <div data-testid={id} className="field-container">
        <span className="field-label">{label}:</span>
        {isEditMode ? (
          type === 'date' ? (
            <DatePicker
              value={value}
              onChange={(e) => handleChangeDate(e, id)}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            <TextField
              inputProps={{ 'data-testid': `${id}-input` }}
              type={type}
              id={id}
              value={value}
              onChange={handleChange}
            />
          )
        ) : (
          <div className="field-value">{value}</div>
        )}
      </div>
    </>
  );
};

export default CustomizedField;
