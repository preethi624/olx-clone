import { useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import "./View.css";
import { firebaseContext } from "../../store/firebaseContext";
import { PostContext } from "../../store/PostContext";

function View() {
  const { postDetails } = useContext(PostContext);
  const { auth } = useContext(firebaseContext);
  const db = getFirestore(); 
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails?.userId) {
        console.log("User ID:", postDetails.userId);

        
        const userDocRef = doc(db, "users", postDetails.userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserDetails({
            username: userData.username || "Unknown User",
            phone: userData.phone || "No phone number",
            email: userData.email || "No email",
          });
          console.log("Fetched user details from Firestore:", userData);
        } else {
          console.log("No matching user found in Firestore");
        }
      }
    };

    fetchUserDetails();
  }, [postDetails, db]);

  return (
    <div className="viewParentDiv">
      <div className="viewImageShowDiv">
        <img src={postDetails.imageUrl} alt="Post" />
      </div>
      <div className="viewRightSection">
        <div className="viewProductDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails ? (
          <div className="viewContactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.email}</p>
            <p>{userDetails.phone}</p>
          </div>
        ) : (
          <div className="viewContactDetails">
            <p>Seller details</p>
            <p>Seller Name</p>
            <p>Seller Phone number</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
