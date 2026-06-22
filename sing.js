import {
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import {
    auth,
    db
}
from "./firebase.js";

const loginBtn =
document.getElementById(
"googleLogin"
);

loginBtn.addEventListener(
"click",
async ()=>{

try{

await setPersistence(
auth,
browserLocalPersistence
);

const provider =
new GoogleAuthProvider();

const result =
await signInWithPopup(
auth,
provider
);

const user =
result.user;

const userRef =
doc(
db,
"users",
user.uid
);

const userSnap =
await getDoc(
userRef
);

if(!userSnap.exists()){

await setDoc(
userRef,
{

uid:user.uid,

email:user.email,

googleName:
user.displayName,

displayName:
"Ziroxoft User",

coins:100,

level:1,

toolsUsed:0,

minutesUsed:0,

createdAt:
serverTimestamp(),

lastReward:
serverTimestamp()

}
);

}

window.location.href =
"sing-dashboard.html";

}


catch(error){

console.error(error);

alert(
"Login Failed"
);

}

});



loginBtn.addEventListener(
"click",
async ()=>{

try{

await setPersistence(
auth,
browserLocalPersistence
);

const provider =
new GoogleAuthProvider();

const result =
await signInWithPopup(
auth,
provider
);

const user =
result.user;

const userRef =
doc(
db,
"users",
user.uid
);

const userSnap =
await getDoc(
userRef
);

if(!userSnap.exists()){

await setDoc(
userRef,
{
uid:user.uid,
email:user.email,
googleName:user.displayName,
displayName:"Ziroxoft User",
coins:100,
level:1,
toolsUsed:0,
minutesUsed:0,
createdAt:serverTimestamp(),
lastReward:serverTimestamp()
}
);

}

window.location.href =
"sing-dashboard.html";

}
catch(error){

console.error(error);

alert(
"Firebase Error:\n\n" +
error.code +
"\n\n" +
error.message
);

}

});