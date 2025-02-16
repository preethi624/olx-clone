
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import "firebase/storage"
import { getStorage } from "firebase/storage";
import {toast}from "react-toastify"


const firebaseConfig = {
  apiKey: "AIzaSyBrtTz5rKHyNYWVu7A6I2bH8qoOTXIdwqo",
  authDomain: "olxclone-2c27f.firebaseapp.com",
  projectId: "olxclone-2c27f",
  storageBucket: "olxclone-2c27f.firebasestorage.app",
  messagingSenderId: "396111257708",
  appId: "1:396111257708:web:78b227477f56169e833849"
};


 const app = initializeApp(firebaseConfig);
 const auth=getAuth(app);
 const  db=getFirestore(app);
 const storage=getStorage(app)
 
const googleProvider=new GoogleAuthProvider()
const uploadImageToCloudinary=async (file)=>{
  const formData=new FormData();
  formData.append("file",file);
  formData.append("upload_preset","olx-clone");
  formData.append("folder","olx-products");
  const response=await fetch("https://api.cloudinary.com/v1_1/dckmi7m7y/image/upload",{
    method:"POST",
    body:formData,
  });
  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  const data = await response.json();
  console.log(data);
  
    return data.secure_url; 
}
const createProduct=async (productData,imageFile)=>{
  try {
    const imageUrl = await uploadImageToCloudinary(imageFile);
    console.log(imageUrl);
    
      const productsRef = collection(db, "products");
      await addDoc(productsRef, {
        ...productData,
        imageUrl,
      });
      toast.success("Product added successfully!");
    

  } catch (error) {
    console.error("Error adding product:", error);
      toast.error("Failed to add product: " + error.message);
    
  }
}
export {  auth, db, storage, googleProvider,  createProduct };
