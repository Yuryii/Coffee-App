import { getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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
export default getData;
