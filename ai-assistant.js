let qr;




// 1. تعديل دالة التوليد (أضفنا event بين القوسين)
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

// 2. تعديل دالة تحميل الـ PDF (أضفنا event وتحقق من الكود)
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

// 3. تعديل دالة نسخ الكود (أضفنا event واستبدلنا الـ alert بالإشعار بتاعك)
function copyQR(event) {
  const canvas = document.getElementById("qr-code");
  if (!canvas || canvas.width <= 100) {
    alert("لم يتم توليد QR بعد.");
    return;
  }

  canvas.toBlob((blob) => {
    if (!blob) {
      alert("حدث خطأ في معالجة الصورة.");
      return;
    }
    const item = new ClipboardItem({ "image/png": blob });
    navigator.clipboard.write([item]).then(() => {
      // هنا استخدمنا الإشعار المتوهج بتاعك تلقائياً بدل الـ alert القديم
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

// 🧱 إنشاء الحاوية إذا مش موجودة
function createContainer() {
  const container = document.createElement('div');
  container.className = 'notification-container';
  document.body.appendChild(container);
  return container;
}



