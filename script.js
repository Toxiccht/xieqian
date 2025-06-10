// 设置生日日期（格式：年, 月-1, 日）
const birthday = new Date(2024, 11, 25); // 这里设置为12月25日，请根据实际情况修改

// 倒计时功能
function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

// 每秒更新倒计时
setInterval(updateCountdown, 1000);
updateCountdown();

// 照片上传功能
const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
photoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    placeholder.style.backgroundImage = `url(${e.target.result})`;
                    placeholder.style.backgroundSize = 'cover';
                    placeholder.style.backgroundPosition = 'center';
                    placeholder.textContent = '';
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });
});

// 留言板功能
const messageInput = document.getElementById('message-input');
const submitButton = document.getElementById('submit-message');
const messagesList = document.getElementById('messages-list');

// 从localStorage加载留言
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    messagesList.innerHTML = '';
    messages.forEach(message => {
        addMessageToDOM(message);
    });
}

// 添加留言到DOM
function addMessageToDOM(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `
        <p>${message}</p>
        <small>${new Date().toLocaleString()}</small>
    `;
    messagesList.insertBefore(messageElement, messagesList.firstChild);
}

// 保存留言
function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    messages.unshift(message);
    localStorage.setItem('birthdayMessages', JSON.stringify(messages));
}

// 提交留言
submitButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessageToDOM(message);
        saveMessage(message);
        messageInput.value = '';
    }
});

// 加载已保存的留言
loadMessages();

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
}); 