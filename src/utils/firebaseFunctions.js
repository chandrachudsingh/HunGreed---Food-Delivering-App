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
export const saveCartItem = async (data) => {
  const docRef = doc(firestore, "cartItems", data.id);

  // check if item already present
  const cartItems = await getCartItems();
  const item = cartItems.find((obj) => obj.id === data.id);
  if (item) {
    await updateCartItem(item, 1);
    return;
  }

  await setDoc(docRef, data, { merge: true });
};

// Updating a cart item
export const updateCartItem = async (item, val) => {
  const docRef = doc(firestore, "cartItems", item.id);
  if (item.qty + val !== 0) {
    await updateDoc(docRef, { qty: item.qty + val });
  } else {
    await deleteCartItem(item);
  }
};

// Deleting a cart item
export const deleteCartItem = async (item) => {
  const docRef = doc(firestore, "cartItems", item.id);
  await deleteDoc(docRef);
};

// Deleting entire collection
export const deleteAllCartItem = async () => {
  const dbRef = collection(firestore, "cartItems");
  const docsSnap = await getDocs(query(dbRef, orderBy("id", "desc")));

  // Delete documents in a batch
  const batch = writeBatch(firestore);
  docsSnap.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

// Get Cart items
export const getCartItems = async () => {
  const dbRef = collection(firestore, "cartItems");
  const docsSnap = await getDocs(query(dbRef, orderBy("id", "desc")));
  return docsSnap.docs.map((doc) => doc.data());
};
