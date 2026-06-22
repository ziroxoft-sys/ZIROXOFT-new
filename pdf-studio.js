const imageInput =
document.getElementById(
"imageInput"
);

const addImagesBtn =
document.getElementById(
"addImagesBtn"
);

const projectImages =
document.getElementById(
"projectImages"
);

const mainPreview =
document.getElementById(
"mainPreview"
);

const emptyPreview =
document.getElementById(
"emptyPreview"
);

const imagesCount =
document.getElementById(
"imagesCount"
);

const pagesCount =
document.getElementById(
"pagesCount"
);

const totalSize =
document.getElementById(
"totalSize"
);

let images = [];


let cropper = null;



let pdfSettings = {

pageSize: "A4",

orientation: "portrait",

quality: "high",

margin: "small",

backgroundColor: "#ffffff",

autoEnhance: true,

compression: 80

};





const pageSize =
document.getElementById(
"pageSize"
);

const portraitSetting =
document.getElementById(
"portraitSetting"
);

const landscapeSetting =
document.getElementById(
"landscapeSetting"
);

const backgroundColor =
document.getElementById(
"backgroundColor"
);

const autoEnhance =
document.getElementById(
"autoEnhance"
);

const compressionRange =
document.getElementById(
"compressionRange"
);























pageSize.addEventListener(
"change",
()=>{

pdfSettings.pageSize =
pageSize.value;

}
);









portraitSetting.addEventListener(
"click",
()=>{

pdfSettings.orientation =
"portrait";

portraitSetting.classList.add(
"active"
);

landscapeSetting.classList.remove(
"active"
);

}
);

landscapeSetting.addEventListener(
"click",
()=>{

pdfSettings.orientation =
"landscape";

landscapeSetting.classList.add(
"active"
);

portraitSetting.classList.remove(
"active"
);

}
);



backgroundColor.addEventListener(
"input",
()=>{

pdfSettings.backgroundColor =
backgroundColor.value;

}
);



autoEnhance.addEventListener(
"change",
()=>{

pdfSettings.autoEnhance =
autoEnhance.checked;

}
);





compressionRange.addEventListener(
"input",
()=>{

pdfSettings.compression =
parseInt(
compressionRange.value
);

}
);






const marginButtons =
document.querySelectorAll(".setting-group:nth-of-type(4) .options button");

marginButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

marginButtons.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const value = btn.textContent.trim();

if(value==="بدون")
pdfSettings.margin="none";

if(value==="صغيرة")
pdfSettings.margin="small";

if(value==="متوسطة")
pdfSettings.margin="medium";

if(value==="كبيرة")
pdfSettings.margin="large";

});

});


































addImagesBtn.addEventListener(
"click",
()=>{
imageInput.click();
}
);

imageInput.addEventListener(
"change",
(event)=>{

const files =
Array.from(
event.target.files
);

files.forEach(file=>{

const reader =
new FileReader();

reader.onload =
function(e){

images.push({

name:file.name,

size:file.size,

url:e.target.result,

rotation:0

});

renderImages();

};

reader.readAsDataURL(
file
);

});

}
);

function renderImages(){

projectImages.innerHTML = "";

let size = 0;

images.forEach(
(image,index)=>{

size += image.size;

const card =
document.createElement(
"div"
);

card.className =
"image-card";

card.innerHTML = `

<img
src="${image.url}"
style="
width:100%;
height:120px;
object-fit:cover;
border-radius:10px;
">

<p style="
margin-top:8px;
font-size:12px;
overflow:hidden;
">

${image.name}

</p>

`;

card.addEventListener(
"click",
()=>{

showPreview(index);

}
);

projectImages.appendChild(
card
);

}
);

imagesCount.innerText =
images.length;

pagesCount.innerText =
images.length;

totalSize.innerText =
(
size /
1024 /
1024
).toFixed(2)
+
" MB";

if(images.length){

showPreview(0);

}

}

function showPreview(index){

mainPreview.src =
images[index].url;

mainPreview.style.display =
"block";

emptyPreview.style.display =
"none";

}






let currentImageIndex = 0;
let currentZoom = 100;

function showPreview(index){

currentImageIndex = index;

mainPreview.src =
images[index].url;

mainPreview.style.display =
"block";

emptyPreview.style.display =
"none";

mainPreview.style.transform =
`scale(${currentZoom / 100})
 rotate(${images[index].rotation}deg)`;

}




document
.getElementById("zoomIn")
.addEventListener(
"click",
()=>{

currentZoom += 10;

mainPreview.style.transform =
`scale(${currentZoom / 100})
 rotate(${images[currentImageIndex].rotation}deg)`;

document
.getElementById("zoomValue")
.innerText =
currentZoom + "%";

}
);



document
.getElementById("zoomOut")
.addEventListener(
"click",
()=>{

if(currentZoom <= 20) return;

currentZoom -= 10;

mainPreview.style.transform =
`scale(${currentZoom / 100})
 rotate(${images[currentImageIndex].rotation}deg)`;

document
.getElementById("zoomValue")
.innerText =
currentZoom + "%";

}
);



document
.getElementById("rotateRight")
.addEventListener(
"click",
()=>{

if(!images.length) return;

images[currentImageIndex]
.rotation += 90;

showPreview(
currentImageIndex
);

}
);





document
.getElementById("rotateLeft")
.addEventListener(
"click",
()=>{

if(!images.length) return;

images[currentImageIndex]
.rotation -= 90;

showPreview(
currentImageIndex
);

}
);








document
.getElementById("cropBtn")
.addEventListener(
"click",
()=>{

if(!images.length) return;

if(cropper){

const canvas =
cropper.getCroppedCanvas();

const newImage =
canvas.toDataURL(
"image/jpeg",
1
);

images[currentImageIndex]
.url = newImage;

cropper.destroy();

cropper = null;

showPreview(
currentImageIndex
);

renderImages();

return;

}

cropper =
new Cropper(
mainPreview,
{

viewMode:1,

dragMode:"move",

autoCropArea:1,

responsive:true,

background:false,

movable:true,

zoomable:true,

rotatable:true,

scalable:true

}

);

alert(
"حدد الجزء المطلوب ثم اضغط زر القص مرة ثانية للتطبيق"
);

}
);
















document
.getElementById("cropBtn")
.addEventListener(
"click",
()=>{

const btn =
document.getElementById(
"cropBtn"
);

if(cropper){

btn.innerHTML =
`
<i class="fa-solid fa-crop"></i>
قص الصورة
`;

}else{

btn.innerHTML =
`
<i class="fa-solid fa-check"></i>
تطبيق القص
`;

}

}
);








new Sortable(
projectImages,
{

animation:200,

ghostClass:"sortable-ghost",

onEnd:(event)=>{

const movedItem =
images.splice(
event.oldIndex,
1
)[0];

images.splice(
event.newIndex,
0,
movedItem
);

renderImages();

showPreview(
event.newIndex
);

}

}
);










document
.getElementById("createPdfBtn")
.addEventListener(
"click",
async()=>{

if(!images.length){

alert(
"أضف صورة واحدة على الأقل"
);

return;

}

try{

/* خصم كوين واحد */

await useTool();

}catch(error){

console.error(error);

}

/* إظهار شاشة التحويل */

document
.getElementById(
"loaderOverlay"
)
.style.display =
"flex";

try{

    const { jsPDF } =
window.jspdf;





const pdf =
new jsPDF({

orientation:
pdfSettings.orientation,

unit:"pt",

format:
pdfSettings.pageSize

});






let margin = 20;

if(pdfSettings.margin === "none")
margin = 0;

if(pdfSettings.margin === "small")
margin = 20;

if(pdfSettings.margin === "medium")
margin = 40;

if(pdfSettings.margin === "large")
margin = 60;




















for(
let i = 0;
i < images.length;
i++
){




    const img =
new Image();

img.src =
images[i].url;

await new Promise(
resolve=>{

img.onload =
resolve;

}
);




const canvas = document.createElement("canvas");

let scale = 1;

if(pdfSettings.quality === "normal")
scale = 0.6;

if(pdfSettings.quality === "high")
scale = 0.8;

if(pdfSettings.quality === "ultra")
scale = 1;

canvas.width = Math.round(img.width * scale);
canvas.height = Math.round(img.height * scale);

const picaInstance = pica();

await picaInstance.resize(
img,
canvas
);









const pageWidth =
pdf.internal.pageSize.getWidth() -
(margin * 2);

const pageHeight =
pdf.internal.pageSize.getHeight() -
(margin * 2);








const ratio =
Math.min(
pageWidth / img.width,
pageHeight / img.height
);

const width =
img.width * ratio;

const height =
img.height * ratio;





const x =
((pageWidth - width) / 2)
+ margin;

const y =
((pageHeight - height) / 2)
+ margin;








if(i > 0){

pdf.addPage();

}





const color = pdfSettings.backgroundColor;

const r = parseInt(color.substring(1,3),16);
const g = parseInt(color.substring(3,5),16);
const b = parseInt(color.substring(5,7),16);

pdf.setFillColor(r, g, b);

pdf.rect(
0,
0,
pdf.internal.pageSize.getWidth(),
pdf.internal.pageSize.getHeight(),
"F"
);




































pdf.addImage(
images[i].url,
"JPEG",
x,
y,
width,
height,
undefined,
"SLOW"
);

}

pdf.save(
"Ziroxoft-PDF.pdf"
);

}catch(error){

console.error(error);

alert(
"حدث خطأ أثناء إنشاء الملف"
);

}



document
.getElementById(
"loaderOverlay"
)
.style.display =
"none";

}
);














document
.getElementById("newProjectBtn")
.addEventListener(
"click",
()=>{

if(
confirm(
"هل تريد إنشاء مشروع جديد؟ سيتم حذف الصور الحالية."
)
){

images = [];

projectImages.innerHTML = "";

mainPreview.src = "";

mainPreview.style.display = "none";

emptyPreview.style.display = "flex";

imagesCount.innerText = "0";

pagesCount.innerText = "0";

totalSize.innerText = "0 MB";

}

}
);










const qualityButtons = document.querySelectorAll(".setting-group:nth-of-type(3) .options button");

qualityButtons.forEach(btn => {

btn.addEventListener("click", () => {

qualityButtons.forEach(b => b.classList.remove("active"));

btn.classList.add("active");

const text = btn.textContent.trim();

if(text === "عادية")
pdfSettings.quality = "normal";

if(text === "عالية")
pdfSettings.quality = "high";

if(text === "فائقة")
pdfSettings.quality = "ultra";

});

});








document.getElementById("enhanceBtn")
.addEventListener("click",()=>{

if(!images.length) return;

const img = new Image();

img.src = images[currentImageIndex].url;

img.onload = ()=>{

const canvas = document.createElement("canvas");

canvas.width = img.width;

canvas.height = img.height;

const ctx = canvas.getContext("2d");

ctx.filter =
"contrast(110%) brightness(105%) saturate(110%)";

ctx.drawImage(img,0,0);

images[currentImageIndex].url =
canvas.toDataURL("image/jpeg",1);

showPreview(currentImageIndex);

renderImages();

alert("تم تحسين جودة الصورة");

};

});