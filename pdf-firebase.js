import { auth, db } from "./firebase.js";

import {
collection,
addDoc,
query,
where,
getDocs,
orderBy,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

export async function savePdfProject(imagesCount){

const user = auth.currentUser;

if(!user) return;

try{

await addDoc(
collection(db,"pdfProjects"),
{
uid:user.uid,
projectName:`مشروع PDF (${imagesCount} صور)`,
imagesCount:imagesCount,
createdAt:serverTimestamp()
}
);

}catch(error){

console.error(
"خطأ حفظ المشروع:",
error
);

}

}

export async function loadPdfProjects(){

const user = auth.currentUser;

if(!user) return [];

try{

const q = query(
collection(db,"pdfProjects"),
where("uid","==",user.uid)
);

const snapshot =
await getDocs(q);

const projects = [];

snapshot.forEach(doc=>{

projects.push({
id:doc.id,
...doc.data()
});

});

return projects;

}catch(error){

console.error(error);

return [];

}

}