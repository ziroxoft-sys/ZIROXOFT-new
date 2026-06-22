import {
auth
}
from "./firebase.js";

import {
onAuthStateChanged,
signOut
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
db
}
from "./firebase.js";

import {
doc,
getDoc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* عناصر الصفحة */

const userPhoto =
document.getElementById(
"userPhoto"
);

const userName =
document.getElementById(
"userName"
);

const userEmail =
document.getElementById(
"userEmail"
);

const coinsEl =
document.getElementById(
"coins"
);

const levelEl =
document.getElementById(
"level"
);

const toolsEl =
document.getElementById(
"toolsUsed"
);

const minutesEl =
document.getElementById(
"minutesUsed"
);

const logoutBtn =
document.getElementById(
"logoutBtn"
);

const progressFill =
document.getElementById(
"progressFill"
);

const progressText =
document.getElementById(
"progressText"
);

/* حماية الصفحة */

onAuthStateChanged(
auth,
async(user)=>{

if(!user){

window.location.replace(
"sing.html"
);

return;

}

/* بيانات الحساب */


userPhoto.src =
user.photoURL || "user.png";

userPhoto.onerror = () => {
userPhoto.src = "user.png";
};




userName.innerText =
"Ziroxoft User";

userEmail.innerText =
user.email;








/* جلب البيانات */

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

if(userSnap.exists()){

const data =
userSnap.data();

coinsEl.innerText =
data.coins || 100;

levelEl.innerText =
data.level || 1;





const totalTools =
data.toolsUsed || 0;

const calculatedLevel =
Math.floor(totalTools / 10) + 1;

if(calculatedLevel !== (data.level || 1)){

await updateDoc(
userRef,
{
level: calculatedLevel
}
);

levelEl.innerText =
calculatedLevel;

}
























toolsEl.innerText =
data.toolsUsed || 0;

minutesEl.innerText =
data.minutesUsed || 0;

/* مكافأة 24 ساعة */

if(data.lastReward){

const lastReward =
data.lastReward.toDate();

const now =
new Date();

const diff =
now - lastReward;

if(diff >= 86400000){





const newCoins =
Math.min(
(data.coins || 0) + 100,
100
);





await updateDoc(
userRef,
{
coins:newCoins,
lastReward:new Date()
}
);

coinsEl.innerText =
newCoins;

progressText.innerText =
"🎉 Daily Reward Claimed";
}

}

/* شريط التقدم */




let progress =
((data.toolsUsed || 0) % 10) * 10;











progressFill.style.width =
progress + "%";

if(progress >= 100){

progressText.innerText =
"🏆 AI Master";

}else if(progress >= 50){

progressText.innerText =
"🚀 Power User";

}else{

progressText.innerText =
"Keep Exploring Ziroxoft";
}

/* عداد الاستخدام */

setInterval(
async()=>{

let currentMinutes =
parseInt(
minutesEl.innerText
);

currentMinutes++;

minutesEl.innerText =
currentMinutes;

await updateDoc(
userRef,
{
minutesUsed:
currentMinutes
}
);

},
60000
);

}

}
);

/* تسجيل الخروج */

logoutBtn.addEventListener(
"click",
async()=>{

await signOut(auth);

window.location.replace(
"sing.html"
);

}
);