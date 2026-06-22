import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyBw4ghCp0irgtVxOmlgdeqMjL1nzDb1Lls",

authDomain: "ziroxoft-ccf7c.firebaseapp.com",

projectId: "ziroxoft-ccf7c",

storageBucket: "ziroxoft-ccf7c.firebasestorage.app",

messagingSenderId: "630600066039",

appId: "1:630600066039:web:c99fda5ce2aba5c9d304f2"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getFirestore(app);

export {
auth,
db
};