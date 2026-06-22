const fileInput = document.getElementById('fileInput');
const listEl = document.getElementById('fileList');
const mergeBtn = document.getElementById('mergeBtn');
const outputName = document.getElementById('outputName');
let filesArr = [];

function download(bytes, filename, mimeType) {
  const blob = new Blob([bytes], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

fileInput.addEventListener('change', () => {
  filesArr = Array.from(fileInput.files);
  drawList();
});

function drawList() {
  listEl.innerHTML = '';
  filesArr.forEach((f,i) => {
    const li = document.createElement('li');
    li.textContent = f.name;
    li.draggable = true;
    li.dataset.index = i;
    listEl.appendChild(li);
  });
  enableDragDrop();
}

function enableDragDrop() {
  let dragSrc = null;
  listEl.querySelectorAll('li').forEach(li => {
    li.addEventListener('dragstart', () => {
      dragSrc = li;
      li.classList.add('dragging');
    });
    li.addEventListener('dragend', () => {
      dragSrc.classList.remove('dragging');
    });
    li.addEventListener('dragover', e => e.preventDefault());
    li.addEventListener('drop', e => {
      e.preventDefault();
      const from = +dragSrc.dataset.index;
      const to = +li.dataset.index;
      filesArr.splice(to,0,filesArr.splice(from,1)[0]);
      drawList();
    });
  });
}






mergeBtn.addEventListener('click', async () => {

  if (!filesArr.length)
    return alert('حدد ملفات PDF أولاً.');

  await useTool();

  
 
 
 
 
 
 
 
 
  try {
    const merged = await PDFLib.PDFDocument.create();
    for (const f of filesArr) {
      const buf = await f.arrayBuffer();
      const doc = await PDFLib.PDFDocument.load(buf);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach(p => merged.addPage(p));
    }
    const bytes = await merged.save();
    const name = (outputName.value.trim() || 'merged') + '.pdf';
    download(bytes, name, 'application/pdf');
  } catch (err) {
    console.error(err);
    alert('حدث خطأ أثناء الدمج، حاول مجددًا');
  }
});



