const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzRjMWMxZWJhNGM1OWNkZmUxNTFlZmMxZTVhYmZiNzhhYmQxYjhjYzMxODFkN2U2MTgwYjFkMzFmMzdhYTljYTYyZjA4MWFhNTFmYjFhZTQiLCJpYXQiOjE3NTI0MTY3OTEuMzI0NDIyLCJuYmYiOjE3NTI0MTY3OTEuMzI0NDI0LCJleHAiOjQ5MDgwOTAzOTEuMzIwNDYzLCJzdWIiOiI3MjQyMjk2OCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.Rzqa4JQOI5cNKsTVRCVYBzdzOj284pLYN9NJHc14zYyL3Viz0t_WC_9D6NpVQLnPUtwHp75NaMjKIcLGxZNqe9gqafgv5PlAfoGXCryOVmVKpdQofxVWtQsCMjXMTgKR6AHYeyd-y6FRD32ZH5ZenorOe7PeiZZuo_60dmMgAvvTnW6ojLmXRbj5VgB9_EJMBBxyd5g8PpjE7PqwE7XrW40U5XfZw50a62ZprE4U-H-uvFOwRL8Wj5fBNl9gS2IstzK8_tYjpvrgQfHWqHlshiXJgM9qYjDePgBGEAqyTZyyKcvbN7Rmh4iNZ02GwBEdB0cJPZsD4jnyfLhib00bvBo-8rdYBL5SA1oTsNvMdAX2qEYzlSmKP7Zfe5OOCubWR6nRWcwULMoc3cg3JfRMiA1owAFMhyrBvn7OY2t97CsWBoknkh_DaQYKSIzSZMbW7Yj9tAjbTDX3Yt3kk-2bwLdBrF0kQJas3xx5yUgjvYbGraZFafPnSlAAtmwC_HrFj9XbsVBUcyLnaizAkKP_S_K8wDcgIxyodtjgyBSGNGiOExWLcaAw1Oyyybkz14-ZeVz2MHhrx1mJLby3Xk-iCnec1yK-KCo0YB8pruViE6iydKViK3_vc_klT7KQujJlFuslPaVe896SNG1KIs13Xd5FCUuBnVA0CAxWx9gG9uA";

document.getElementById("convertBtn").addEventListener("click", async () => {
  const input = document.getElementById("videoInput");
  const status = document.getElementById("status");
  const downloadLink = document.getElementById("downloadLink");

  if (!input.files.length) {
    status.innerText = "يرجى اختيار فيديو أولاً.";
    return;
  }

await useTool();


  const file = input.files[0];
  status.innerText = "⬆️ جاري رفع الفيديو وتحويله...";

  const formData = new FormData();
  formData.append("file", file);

  try {
    // 1. Create job
    const jobRes = await fetch("https://api.cloudconvert.com/v2/jobs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tasks: {
          "import-file": {
            operation: "import/upload"
          },
          "convert-file": {
            operation: "convert",
            input: "import-file",
            output_format: "mp3"
          },
          "export-file": {
            operation: "export/url",
            input: "convert-file"
          }
        }
      })
    });

    const jobData = await jobRes.json();
    const uploadUrl = jobData.data.tasks.find(t => t.name === "import-file").result.form.url;
    const uploadParams = jobData.data.tasks.find(t => t.name === "import-file").result.form.parameters;

    // 2. Upload file
    const uploadData = new FormData();
    Object.entries(uploadParams).forEach(([key, value]) => uploadData.append(key, value));
    uploadData.append("file", file);

    await fetch(uploadUrl, {
      method: "POST",
      body: uploadData
    });

    status.innerText = "🔄 جاري التحويل... انتظر لحظات";

    // 3. Poll job status
    let fileUrl = "";
    while (!fileUrl) {
      const pollRes = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobData.data.id}`, {
        headers: {
          "Authorization": `Bearer ${apiKey}`
        }
      });
      const pollData = await pollRes.json();
      const exportTask = pollData.data.tasks.find(t => t.name === "export-file" && t.status === "finished");
      if (exportTask) {
        fileUrl = exportTask.result.files[0].url;
        break;
      }
      await new Promise(r => setTimeout(r, 2000)); // wait 2s
    }

    status.innerText = "✅ تم التحويل! اضغط لتحميل الملف.";
    downloadLink.href = fileUrl;
    downloadLink.style.display = "inline-block";

  } catch (err) {
    console.error(err);
    status.innerText = "❌ فشل في التحويل، حاول مرة أخرى.";
  }
});
