import React from "react";
import { Button } from "@material-ui/core";
import { UK_CITITES } from "../../constants";
import {
  FormTextField,
  FormSelect,
  FormKeyboardDatePicker,
  Form,
} from "../../components";
import { DateTime } from "luxon";
import { MenuItem, CircularProgress } from "@mui/material";
import { Profile } from "../../api/mock-api";

const getDate = (date: number) =>
  date
    ? DateTime.fromMillis(date)
        .setLocale("en-US")
        .toFormat("LL/dd/yyyy")
        .toLocaleString()
    : date;

type Props = {
  getProfile: () => Promise<Profile>;
  updateProfile: (newProfile: Profile) => Promise<"OK" | Error>;
};

export const EditProfile: React.FC<Props> = ({ getProfile, updateProfile }) => {
  const onSubmit = React.useCallback(
    (formValue: any) => {
      const newProfile = {
        ...formValue,
        dob: formValue?.dob?.ts ? getDate(formValue?.dob?.ts) : formValue.dob,
      };
      updateProfile(newProfile);
      alert("Information is saved");
    },
    [updateProfile]
  );

  const [loadingProfile, setLoadingProfile] = React.useState(true);
  const [profile, setProfile] = React.useState<Profile>();

  React.useEffect(() => {
    getProfile().then((initialProfile) => {
      setProfile(initialProfile);
      setLoadingProfile(false);
    });
  });

  return (
    <Form
      initialValues={{ ...profile }}
      onSubmit={onSubmit}
      formNodeProps={{
        style: {
          padding: 10,
          border: !loadingProfile ? "1px solid purple" : undefined,
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          gridGap: 10,
        },
      }}
    >
      {({ resetForm }) =>
        loadingProfile ? (
          <CircularProgress />
        ) : (
          <>
            <FormTextField
              inputProps={{
                label: "First Name",
                variant: "outlined",
              }}
              fieldProps={{ name: "firstName" }}
            />
            <FormTextField
              inputProps={{
                label: "Last Name",
                variant: "outlined",
              }}
              fieldProps={{ name: "lastName" }}
            />
            <FormTextField
              inputProps={{
                label: "Salary",
                variant: "outlined",
              }}
              fieldProps={{ name: "salary" }}
            />
            <FormKeyboardDatePicker
              datePickerProps={{
                allowKeyboardControl: true,
                disableFuture: true,
                inputVariant: "outlined",
                label: "Date of birth",
                variant: "inline",
                format: "yyyy MMM dd",
              }}
              fieldProps={{ name: "dob" }}
            />
            <FormSelect
              selectProps={{
                children: UK_CITITES.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                )),
                variant: "outlined",
              }}
              fieldProps={{ name: "city" }}
            />

            <Button
              size="medium"
              variant="outlined"
              onClick={() => resetForm()}
            >
              Cancel
            </Button>

            <Button variant="contained" type="submit" color={"primary"}>
              Save changes
            </Button>
          </>
        )
      }
    </Form>
  );
};
