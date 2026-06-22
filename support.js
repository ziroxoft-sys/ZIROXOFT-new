document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch("https://formsubmit.co/ziroxoft@gmail.com", {
    method: "POST",
    body: formData
  }).then(response => {
    if (response.ok) {
      document.getElementById("success-message").classList.remove("hidden");
      form.reset(); // تفريغ الحقول
    } else {
      alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
    }
  }).catch(error => {
    alert("حدث خطأ في الاتصال.");
  });
});












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