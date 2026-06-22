const videoContainer = document.querySelector('.video-container');
const video = document.getElementById('custom-video');
const playPauseBtn = document.getElementById('play-pause');
const muteUnmuteBtn = document.getElementById('mute-unmute');
const progressBar = document.querySelector('.progress-bar');
const progressArea = document.querySelector('.progress-area');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const fullscreenBtn = document.getElementById('fullscreen');

// 1. تشغيل وإيقاف الفيديو
function togglePlay() {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

playPauseBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// 2. تحديث شريط التقدم والوقت
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

video.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    
    // تحريك شريط التقدم نسبةً وممتداً
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    
    currentTimeEl.innerText = formatTime(currentTime);
});

// عند تحميل بيانات الفيديو (معرفة الوقت الإجمالي)
video.addEventListener('loadeddata', () => {
    durationEl.innerText = formatTime(video.duration);
});

// 3. التقديم والترجيع عند الضغط على الشريط
progressArea.addEventListener('click', (e) => {
    const videoDuration = video.duration;
    let progressWidthValue = progressArea.clientWidth;
    let clickOffsetX = e.offsetX;
    
    video.currentTime = (clickOffsetX / progressWidthValue) * videoDuration;
});

// 4. كتم وتفعيل الصوت
muteUnmuteBtn.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        video.muted = true;
        muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// 5. الشاشة الكاملة (Fullscreen)
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            console.error(`خطأ أثناء تفعيل الوضع المليء بالشاشة: ${err.message}`);
        });
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
});

// تغيير أيقونة الشاشة الكاملة إذا تم الخروج بزر ESC
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
});