export type Profile = {
  firstName: string;
  lastName: string;
  dob: string;
  profilePictureURL: string;
  salary: number;
  city: string;
};

let profile: Profile = {
  firstName: "Dua",
  lastName: "Clipa",
  dob: "1995-08-22",
  profilePictureURL: "https://i.postimg.cc/CKCgkKqV/profile.jpg",
  salary: 40000,
  city: "London",
};

export function getUserProfile() {
  return new Promise<Profile>((resolve) => {
    setTimeout(() => resolve(profile), 1e3);
  });
}

export function setUserProfile(newProfile: Profile) {
  return new Promise<"OK">((resolve) => {
    setTimeout(() => {
      const { firstName, lastName, dob, profilePictureURL, salary, city } =
        newProfile;
      profile = {
        firstName,
        lastName,
        dob,
        profilePictureURL,
        salary,
        city,
      };
      resolve("OK");
    }, 2e3);
  });
}
