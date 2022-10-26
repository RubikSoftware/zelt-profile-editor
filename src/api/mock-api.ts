export type Profile = {
  firstName: string;
  lastName: string;
  dob: string;
  profilePictureURL: string;
};

let profile: Profile = {
  firstName: 'Dua',
  lastName: 'Clipa',
  dob: '1995-08-22',
  profilePictureURL: 'https://i.postimg.cc/V6BRPmnx/profile.png',
};

export function getUserProfile() {
  return new Promise<Profile>((resolve) => {
    setTimeout(() => resolve(profile), 1e3);
  });
}

export function setUserProfile(newProfile: Profile) {
  return new Promise<'OK'>((resolve) => {
    setTimeout(() => {
      const { firstName, lastName, dob, profilePictureURL } = newProfile;
      profile = {
        firstName,
        lastName,
        dob,
        profilePictureURL,
      };
      resolve('OK');
    }, 2e3);
  });
}

//////////////////

export type Contract = {
  salary: number;
  bonus: number;
  startDate: string;
  leaveDays: number;
};

let contract: Contract = {
  salary: 40000,
  bonus: 10000,
  startDate: '2021-01-19',
  leaveDays: 12,
};

export function getUserContract() {
  return new Promise<Contract>((resolve) => {
    setTimeout(() => resolve(contract), 1e3);
  });
}

export function setUserContract(newContract: Contract) {
  return new Promise<'OK'>((resolve) => {
    setTimeout(() => {
      const { salary, bonus, startDate, leaveDays } = newContract;
      contract = {
        salary,
        bonus,
        startDate,
        leaveDays,
      };
      resolve('OK');
    }, 2e3);
  });
}
