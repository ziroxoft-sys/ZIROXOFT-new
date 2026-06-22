import { auth, db } from "./firebase.js";

import {
doc,
updateDoc,
increment
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

window.useTool = async function(){

const user = auth.currentUser;

if(!user) return;

await updateDoc(
doc(db,"users",user.uid),
{
toolsUsed:increment(1),
coins:increment(-1)
}
);

};