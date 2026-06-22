import { auth, db } from "./firebase.js";

import {
doc,
updateDoc,
increment,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

export async function useTool(){

const user = auth.currentUser;

if(!user) return;

const userRef =
doc(db,"users",user.uid);

const snap =
await getDoc(userRef);

if(!snap.exists()) return;

const data = snap.data();

let currentTools =
data.toolsUsed || 0;

let currentLevel =
data.level || 1;

/* زيادة الاستخدام */

currentTools++;

/* كل 10 استخدامات = ليفل */

let newLevel =
Math.floor(currentTools / 10) + 1;

await updateDoc(
userRef,
{
toolsUsed:increment(1),
level:newLevel
}
);

}