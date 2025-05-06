import { getAuth } from "firebase/auth";

import { firebaseApp } from "./firebase";

export function verifySession() {
  const firebaseUser = getAuth(firebaseApp).currentUser;
  if (!firebaseUser) {
    return null;
  }
  return firebaseUser.uid;
}
