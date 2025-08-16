// src/auth/authService.js
import {
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { api } from "../lib/api";

// login
export async function signInWithEmailPassword(email, password) {
  const cred = await firebaseSignIn(auth, email, password);
  const idToken = await cred.user.getIdToken();
    await api.post("/auth/sessionLogin", { idToken });
    const { data } = await api.get("/api/me");
  return data.user;
}

// registro
export async function signUpWithEmailPassword(email, password, username) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await cred.user.getIdToken();
  await api.post("/auth/sessionLogin", { idToken, username });
  const { data } = await api.get("/api/me");
  return data.user;
}

// logout
export async function signOutEverywhere() {
  try {
    await api.post("/auth/logout");
  } finally {
    await firebaseSignOut(auth);
  }
}
