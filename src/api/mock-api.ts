export type Profile = {
  firstName: string;
  lastName: string;
  dob: string;
  profilePictureURL: string | null;
  salary: number;
  // add in any other fields that make sense for a user profile
};

let profile: Profile = {
  firstName: "Dua",
  lastName: "Clipa",
  dob: "1995-08-22",
  profilePictureURL: null,
  salary: 40000,
};

export function getUserProfile() {
  return new Promise<Profile>((resolve) => {
    setTimeout(() => resolve(profile), 1e3);
  });
}

export function setUserProfile(newProfile: Profile) {
  return new Promise<"OK">((resolve) => {
    setTimeout(() => {
      const { firstName, lastName, dob, profilePictureURL, salary } =
        newProfile;
      profile = {
        firstName,
        lastName,
        dob,
        profilePictureURL,
        salary,
      };
      resolve("OK");
    }, 2e3);
  });
}
