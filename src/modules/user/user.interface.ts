// export interface UserInterface {
//   name: string;
//   pin: string;
//   mobileNumber: string;
//   email: string;
//   accountType: "User" | "Agent";
//   nid: string;
//   balance: number;
// }

// export interface UserRegistrationData {
//   name: string;
//   pin: string;
//   mobileNumber: string;
//   email: string;
//   accountType: "User" | "Agent";
//   nid: string;
// }

// export interface UserLoginData {
//   mobileNumber: string;
//   pin: string;
// }

export interface Admin {
  name: string;
  pin: string;
  mobileNumber: string;
  email: string;
}

export interface User {
  name: string;
  pin: string;
  mobileNumber: string;
  email: string;
  accountType: string;
  nid: string;
  balance: number;
}

export interface Agent {
  name: string;
  pin: string;
  mobileNumber: string;
  email: string;
  nid: string;
  balance: number;
  approved: boolean;
}
