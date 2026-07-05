let qr;

// دالة تفاعل الأداة
async function useTool() {
  console.log("الأداة جاهزة والتفاعل نشط.");
}
 
// 1. دالة توليد الـ QR
async function generateQR(event) {
  const url = document.getElementById("url-input").value.trim();
 
  if (!url) {
    alert("من فضلك أدخل رابطًا صالحًا.");
    return;
  }

  await useTool();
  
  if (!qr) {
    qr = new QRious({
      element: document.getElementById("qr-code"),
      size: 250,
      value: url
    });
  } else {
    qr.value = url;
  }
}

// 2. دالة تحميل الـ PDF
function downloadPDF(event) {
  const canvas = document.getElementById("qr-code");
  if (!canvas || canvas.width <= 100) {
    alert("لم يتم توليد QR بعد.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("رمز QR للرابط:", 10, 10);
  doc.addImage(canvas.toDataURL("image/png"), "PNG", 10, 20, 100, 100);
  doc.save("qr-code.pdf");
}

// 3. دالة نسخ الـ QR (تشغل الإعلان هنا حصرياً + النسخ + الإشعار المتوهج)
function copyQR(event) {
  const canvas = document.getElementById("qr-code");
  if (!canvas || canvas.width <= 100) {
    alert("لم يتم توليد QR بعد.");
    return;
  }

  // 🚀 تشغيل الإعلان حصرياً عند الضغط على زرار النسخ فقط ومنع تشغيله في الفراغ
  const adScript = document.createElement("script");
  adScript.src = "https://pl27679956.effectivecpmnetwork.com/e2/96/92/e2969277e330fe8328e30a8bcbb86e20.js";
  document.body.appendChild(adScript);

  // 📋 تنفيذ عملية نسخ الكيو آر
  canvas.toBlob((blob) => {
    if (!blob) {
      alert("حدث خطأ في معالجة الصورة.");
      return;
    }
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]).then(() => {
      // إشعارك المتوهج الجميل
      showNotification("تم نسخ رمز QR بنجاح!");
    }).catch(err => {
      alert("حدث خطأ أثناء النسخ: " + err);
    });
  });
}

// 📢 إنشاء إشعار متوهج
function showNotification(message) {
  const container = document.querySelector('.notification-container') || createContainer();

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  container.appendChild(notification);

  // حذف بعد 4 ثواني
  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// 🧱 إنشاء الحاوية إذا لم تكن موجودة
function createContainer() {
  const container = document.createElement('div');
  container.className = 'notification-container';
  document.body.appendChild(container);
  return container;
}









































































































// 📢 إنشاء إشعار متوهج
function showNotification(message) {
  const container = document.querySelector('.notification-container') || createContainer();

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  container.appendChild(notification);

  // حذف بعد 4 ثواني
  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// 🧱 إنشاء الحاوية إذا مش موجودة
function createContainer() {
  const container = document.createElement('div');
  container.className = 'notification-container';
  document.body.appendChild(container);
  return container;
}



