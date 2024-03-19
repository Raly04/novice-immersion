/** @format */

import { atom } from "recoil";

export const registerCompenentState = atom({
  key: "registerComponent",
  default: "Login",
});
export const authenticatedState = atom({
  key: "authorized",
  default: false,
});

export const dashMenuState = atom({
  key : "dashMenu",
  default : "Orientation"
})

export const currentUserState = atom({
  key : "currentUser",
  default : JSON.parse(localStorage.getItem("currentUser")) || {
    username : "John Smith"
  }
})
