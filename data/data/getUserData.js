import { getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(app);
const getCartData = async (email) => {
    const data = [];
    const querySnapshot = await getDocs(query(collection(db, "user"), where("email", "==", email.toLowerCase())));
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}
export default getCartData;