import { getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";

const db = getFirestore(app);
const getData = async () => {
    const data = [];
    try {
        const querySnapshot = await getDocs(collection(db, "Product"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    }
    catch (error) {
        console.log("Error getting documents: ", error);
    }
};
// This code is not used in the app. It is used to update the review field in the database 
// because the review field is do not have a default value in the database
const updateReviewField = async (idList) => {
    try {
        idList.forEach(async (id) => {
            const docRef = doc(db, "Product", id);
            await updateDoc(docRef, { review: [] });
        });
    }
    catch (error) {
        console.log("Error updating document: ", error);
    }
    return 'suscess'
};
// ------------------------------------------------------------
const updateReview = async (data) => {
    try {
        const docRef = doc(db, "Product", data.idProduct);
        await updateDoc(docRef, { review: arrayUnion(data.review)});
    }
    catch (error) {
        console.log("Error updating document: ", error);
    }
    return 'Update review success'
}
export { getData, updateReviewField, updateReview };
