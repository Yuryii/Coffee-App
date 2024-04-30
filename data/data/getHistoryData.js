import { getFirestore } from "firebase/firestore";
import app from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(app);

const getHistoryData = async (email) => {
    const data = [];
    const querySnapshot = await getDocs(query(collection(db, "history"), where("email", "==", email.toLowerCase())));
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    let reversedData = data.reverse();
    return reversedData;
}
export default getHistoryData;