/* ========================= */
/* ELEMENTS */
/* ========================= */

const cards =
document.querySelectorAll(".feature-card");

const panel =
document.getElementById("contentPanel");

const panelTitle =
document.getElementById("panelTitle");

const panelBody =
document.getElementById("panelBody");

const closePanel =
document.getElementById("closePanel");

/* ========================= */
/* CONTENTS */
/* ========================= */

const pages = {











    assistantPage: `
<div class="dynamic-page" style="height:100%;">
    <iframe
        src="ai-assistant.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,























imagePage: `
<div class="dynamic-page" style="height:100%;">
    <iframe
        src="image-generator.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,






















pdfPage: `
<div class="dynamic-page" style="height:100%;">
    <iframe
        src="pdf.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,
































voicePage: `
<div class="dynamic-page" style="height:100%;">
    <iframe
        src="voice.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,










developerPage: `
<div style="height:100%;">
    <iframe
        src="developer.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,


assistantPag: `

<div style="height:100%;">
    <iframe
        src="ai.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,



supportPage: `
<div style="height:100%;">
    <iframe
        src="support.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,




aitoolspage: `
<div style="height:100%;">
    <iframe
        src="ttt.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,




mediatoolspage: `
<div style="height:100%;">
    <iframe
        src="ooo.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,



storepage: `
<div style="height:100%;">
    <iframe
        src="sss.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,

homePage: ` 
<div style="height:100%;">
    <iframe
        src="sing.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,


templatesPage: `
<div style="height:100%;">
    <iframe
        src="sing-dashboard.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,




yousfPage: `
<div style="height:100%;">
    <iframe
        src="yousf.html"
        style="
        width:100%;
        height:100%;
        border:none;
        border-radius:20px;">
    </iframe>
</div>
`,































































};























/* ========================= */
/* OPEN PANEL */
/* ========================= */

cards.forEach(card => {

card.addEventListener("click", () => {

const pageName =
card.dataset.page;

const title =
card.querySelector("h3").innerText;

panelTitle.innerText = title;

panelBody.innerHTML =
pages[pageName] ||
"<h1>Coming Soon...</h1>";

panel.classList.add("active");

card.classList.add("clicked");

setTimeout(() => {

card.classList.remove("clicked");

}, 600);

});

});

/* ========================= */
/* CLOSE PANEL */
/* ========================= */

closePanel.addEventListener("click", () => {

panel.classList.remove("active");

});

/* ========================= */
/* ESC KEY */
/* ========================= */

document.addEventListener(
"keydown",
(event)=>{

if(event.key==="Escape"){

panel.classList.remove("active");

}

}
);

/* ========================= */
/* OUTSIDE CLICK */
/* ========================= */

window.addEventListener(
"click",
(event)=>{

if(event.target===panel){

panel.classList.remove("active");

}

}
);

/* ========================= */
/* MENU ACTIVE */
/* ========================= */

const menuButtons =
document.querySelectorAll(".menu-btn");

menuButtons.forEach(button=>{

button.addEventListener(
"click",
()=>{

menuButtons.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

});

});

/* ========================= */
/* SEARCH */
/* ========================= */

const searchInput =
document.querySelector(
".search-box input"
);

searchInput.addEventListener(
"keyup",
function(){

let value =
this.value.toLowerCase();

cards.forEach(card=>{

let title =
card.innerText.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}
);

/* ========================= */
/* HERO BUTTONS */
/* ========================= */

const exploreBtn =
document.getElementById(
"exploreBtn"
);

const plansBtn =
document.getElementById(
"plansBtn"
);

exploreBtn.addEventListener(
"click",
()=>{

panelTitle.innerText =
"Explore Tools";

panelBody.innerHTML=`

<h1>Explore Tools</h1>

<p>
All tools will appear here.
</p>

`;

panel.classList.add("active");

}
);

plansBtn.addEventListener(
"click",
()=>{

panelTitle.innerText =
"Pricing Plans";

panelBody.innerHTML=`

<h1>Premium Plans</h1>

<p>
Pricing information goes here.
</p>

`;

panel.classList.add("active");

}
);

/* ========================= */
/* FUTURE SYSTEM READY */
/* ========================= */

function loadCustomPage(
title,
htmlContent
){

panelTitle.innerText =
title;

panelBody.innerHTML =
htmlContent;

panel.classList.add("active");

}

/*
مثال مستقبلي:

loadCustomPage(
"Settings",
"<h1>Settings</h1>"
);

*/

/* ========================= */
/* STARTUP ANIMATION */
/* ========================= */

window.addEventListener(
"load",
()=>{

document.body.style.opacity="0";

setTimeout(()=>{

document.body.style.transition=
".7s";

document.body.style.opacity="1";

},100);

});











/* ========================= */
/* SIDEBAR PANEL SYSTEM */
/* ========================= */

document.querySelectorAll(".menu-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const pageName = btn.dataset.page;

        if (!pageName) return;

        const title =
        btn.querySelector("span").innerText;

        panelTitle.innerText = title;

        panelBody.innerHTML =
        pages[pageName] ||
        "<h1>Coming Soon...</h1>";

        panel.classList.add("active");

    });

});







const maximizeBtn =
document.getElementById(
"maximizePanel"
);

maximizeBtn.addEventListener(
"click",
()=>{

panel.classList.toggle(
"maximized"
);

}
);












































const mobileMenuBtn =
document.getElementById(
"mobileMenuBtn"
);

const sidebar =
document.querySelector(
".sidebar"
);

const overlay =
document.getElementById(
"sidebarOverlay"
);

mobileMenuBtn.addEventListener(
"click",
()=>{

sidebar.classList.toggle(
"active"
);

overlay.classList.toggle(
"active"
);

});

overlay.addEventListener(
"click",
()=>{

sidebar.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);

});




















const closeSidebar =
document.getElementById(
"closeSidebar"
);

closeSidebar.addEventListener(
"click",
()=>{

sidebar.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);

}
);









/* ========================= */
/* NOTIFICATION SYSTEM */
/* ========================= */

const notificationBtn =
document.getElementById(
"notificationBtn"
);

const notificationPanel =
document.getElementById(
"notificationPanel"
);

const notificationDot =
document.getElementById(
"notificationDot"
);

const markReadBtn =
document.getElementById(
"markReadBtn"
);

notificationBtn.addEventListener(
"click",
()=>{

notificationPanel.classList.toggle(
"active"
);

}
);

markReadBtn.addEventListener(
"click",
()=>{

notificationDot.style.display =
"none";

}
);














document.addEventListener(
"click",
function(event){

    if(
        !notificationPanel.contains(event.target)
        &&
        !notificationBtn.contains(event.target)
    ){

        notificationPanel.classList.remove(
        "active"
        );

    }

}
);















