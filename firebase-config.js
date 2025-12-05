import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy, 
    doc, 
    updateDoc, 
    increment 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    // PASTE KEYS HERE
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COL_NAME = "questions";

export async function addQuestion(text) {
    await addDoc(collection(db, COL_NAME), {
        text: text,
        votes: 0,
        timestamp: Date.now()
    });
}

export async function upvoteQuestion(id) {
    const ref = doc(db, COL_NAME, id);
    await updateDoc(ref, {
        votes: increment(1)
    });
}

export function listenToFeed(callback) {
    const q = query(collection(db, COL_NAME), orderBy("votes", "desc"), orderBy("timestamp", "desc"));
    
    onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    });
}