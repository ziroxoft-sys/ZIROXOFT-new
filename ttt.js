let questions = [];

document.getElementById('addQ').onclick = () => {
  questions.push({ text: '', options: ['', '', '', ''] });
  renderQuestions();
};

function renderQuestions() {
  const container = document.getElementById('questions');
  container.innerHTML = '';
  questions.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'question-block';

    const textarea = document.createElement('textarea');
    textarea.placeholder = `السؤال ${i + 1}`;
    textarea.value = q.text;
    textarea.oninput = () => q.text = textarea.value;
    block.appendChild(textarea);

    const options = document.createElement('div');
    options.className = 'options-container';

    q.options.forEach((opt, j) => {
      const optDiv = document.createElement('div');
      optDiv.className = 'option-item';

      const optInput = document.createElement('input');
      optInput.placeholder = `اختيار ${j + 1}`;
      optInput.value = opt;
      optInput.oninput = () => q.options[j] = optInput.value;

      optDiv.appendChild(optInput);
      options.appendChild(optDiv);
    });

    const addOptBtn = document.createElement('button');
    addOptBtn.textContent = '+ اختيار';
    addOptBtn.onclick = () => {
      q.options.push('');
      renderQuestions();
    };
    block.appendChild(options);
    block.appendChild(addOptBtn);

    if (q.options.length > 2) {
      const delOptBtn = document.createElement('button');
      delOptBtn.textContent = '- حذف اختيار';
      delOptBtn.onclick = () => {
        q.options.pop();
        renderQuestions();
      };
      block.appendChild(delOptBtn);
    }

    container.appendChild(block);
  });
}

document.getElementById('renderBtn').onclick = () => {
  const title = document.getElementById('examTitle').value || 'امتحان بدون عنوان';
  const preview = document.getElementById('preview');
  preview.innerHTML = '';

  const titleEl = document.createElement('h2');
  titleEl.style.textAlign = 'center';
  titleEl.style.marginBottom = '20px';
  titleEl.textContent = title;
  preview.appendChild(titleEl);

  questions.forEach((q, i) => {
    const qBlock = document.createElement('div');
    qBlock.className = 'question-preview';
    qBlock.style.background = getRandomGradient(); // خلفية السؤال

    const qText = document.createElement('div');
    qText.className = 'question-title';
    qText.style.color = '#000'; // لون السؤال أسود
    qText.style.fontSize = '18px';
    qText.textContent = `(${i + 1})  ${q.text}`; // <-- التعديل هنا فقط (مسافتين)
    qBlock.appendChild(qText);

    const opts = document.createElement('div');
    opts.className = 'options-container';
    opts.style.flexWrap = 'nowrap';
    opts.style.overflow = 'hidden';

    q.options.forEach((opt, j) => {
      const op = document.createElement('div');
      op.className = 'option-item';
      op.style.flex = `1 1 ${100 / q.options.length}%`;
      op.style.background = getRandomGradient(true);
      op.style.color = '#000';
      op.innerHTML = `<span style="margin-left: 6px;">☐</span><span>${opt}</span>`;
      opts.appendChild(op);
    });

    qBlock.appendChild(opts);
    preview.appendChild(qBlock);
  });

  document.getElementById('downloadPdfBtn').classList.remove('hidden');
  document.getElementById('downloadWordBtn').classList.remove('hidden');
};

document.getElementById('downloadPdfBtn').onclick = () => {
  const element = document.getElementById('preview');

  const opt = {
    margin: [0.3, 0.3, 0.3, 0.3],
    filename: 'exam.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      scrollX: 0,
      allowTaint: true
    },
    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(opt).from(element).save();
};

document.getElementById('downloadWordBtn').onclick = () => {
  const html = "<html><body>" + document.getElementById("preview").innerHTML + "</body></html>";
  const blob = window.htmlDocx.asBlob(html);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "exam.docx";
  link.click();
};

function getRandomGradient(isOption = false) {
  const gradients = isOption
    ? [
        'linear-gradient(to right, #fff1eb, #ace0f9)',
        'linear-gradient(to right, #d9afd9, #97d9e1)',
        'linear-gradient(to right, #fbc2eb, #a6c1ee)'
      ]
    : [
        'linear-gradient(to right, #2193b0, #6dd5ed)',
        'linear-gradient(to right, #cc2b5e, #753a88)',
        'linear-gradient(to right, #ee9ca7, #ffdde1)'
      ];
  return gradients[Math.floor(Math.random() * gradients.length)];
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