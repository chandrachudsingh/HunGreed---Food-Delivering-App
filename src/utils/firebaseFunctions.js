import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  const docRef = doc(firestore, "foodItems", `${Date.now()}`);
  await setDoc(docRef, data, { merge: true });
};

// Get all food items
export const getAllFoodItems = async () => {
  const dbRef = collection(firestore, "foodItems");
  const docsSnap = await getDocs(query(dbRef, orderBy("id", "desc")));
  return docsSnap.docs.map((doc) => doc.data());
};

// Saving Cart items
export const saveCartItem = async (uid, data) => {
  const docRef = doc(firestore, uid + "_cartItems", data.id);

  // check if item already present
  const cartItems = await getCartItems(uid);
  const item = cartItems.find((obj) => obj.id === data.id);
  if (item) {
    await updateCartItem(uid, item, 1);
    return;
  }

  await setDoc(docRef, data, { merge: true });
};

// Updating a cart item
export const updateCartItem = async (uid, item, val) => {
  const docRef = doc(firestore, uid + "_cartItems", item.id);
  if (item.qty + val !== 0) {
    await updateDoc(docRef, { qty: item.qty + val });
  } else {
    await deleteCartItem(uid, item);
  }
};

// Deleting a cart item
export const deleteCartItem = async (uid, item) => {
  const docRef = doc(firestore, uid + "_cartItems", item.id);
  await deleteDoc(docRef);
};

// Deleting entire collection
export const deleteAllCartItem = async (uid) => {
  const dbRef = collection(firestore, uid + "_cartItems");
  const docsSnap = await getDocs(query(dbRef, orderBy("id", "desc")));

  // Delete documents in a batch
  const batch = writeBatch(firestore);
  docsSnap.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

// Get Cart items
export const getCartItems = async (uid) => {
  const dbRef = collection(firestore, uid + "_cartItems");
  const docsSnap = await getDocs(query(dbRef, orderBy("id", "desc")));
  return docsSnap.docs.map((doc) => doc.data());
};
