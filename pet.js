class VirtualPet {
    constructor() {
        this.mood = 100;
        this.energy = 100;
        this.isSleeping = false;
        this.message = '';
        this.lastAction = Date.now();
        
        // DOM 元素
        this.petElement = document.getElementById('pet');
        this.moodBar = document.getElementById('mood-bar');
        this.energyBar = document.getElementById('energy-bar');
        this.messageElement = document.getElementById('pet-message');
        
        // 按钮
        this.feedBtn = document.getElementById('feed-btn');
        this.playBtn = document.getElementById('play-btn');
        this.sleepBtn = document.getElementById('sleep-btn');
        
        // 绑定事件
        this.feedBtn.addEventListener('click', () => this.feed());
        this.playBtn.addEventListener('click', () => this.play());
        this.sleepBtn.addEventListener('click', () => this.sleep());
        
        // 初始化
        this.updateStatus();
        this.startAutoUpdate();
    }
    
    updateStatus() {
        this.moodBar.style.width = `${this.mood}%`;
        this.energyBar.style.width = `${this.energy}%`;
        
        // 更新宠物状态
        this.petElement.className = 'pet';
        if (this.isSleeping) {
            this.petElement.classList.add('sleeping');
            this.petElement.classList.remove('happy', 'sad');
        } else if (this.mood > 70) {
            this.petElement.classList.add('happy');
            this.petElement.classList.remove('sleeping', 'sad');
        } else if (this.mood < 30) {
            this.petElement.classList.add('sad');
            this.petElement.classList.remove('sleeping', 'happy');
        } else {
            this.petElement.classList.remove('sleeping', 'happy', 'sad');
        }
    }
    
    showMessage(message) {
        this.message = message;
        this.messageElement.textContent = message;
    }
    
    feed() {
        if (this.isSleeping) {
            this.showMessage('小兔子正在睡觉...');
            return;
        }
        
        this.energy = Math.min(100, this.energy + 20);
        this.mood = Math.min(100, this.mood + 10);
        this.showMessage('小兔子吃饱了，很开心！');
        this.updateStatus();
    }
    
    play() {
        if (this.isSleeping) {
            this.showMessage('小兔子正在睡觉...');
            return;
        }
        
        if (this.energy < 20) {
            this.showMessage('小兔子太累了，需要休息...');
            return;
        }
        
        this.energy = Math.max(0, this.energy - 20);
        this.mood = Math.min(100, this.mood + 30);
        this.showMessage('小兔子玩得很开心！');
        this.updateStatus();
    }
    
    sleep() {
        if (this.isSleeping) {
            this.isSleeping = false;
            this.showMessage('小兔子醒来了！');
        } else {
            this.isSleeping = true;
            this.showMessage('小兔子睡着了...');
        }
        this.updateStatus();
    }
    
    startAutoUpdate() {
        setInterval(() => {
            if (!this.isSleeping) {
                this.energy = Math.max(0, this.energy - 1);
                this.mood = Math.max(0, this.mood - 1);
            } else {
                this.energy = Math.min(100, this.energy + 2);
            }
            
            // 根据状态显示消息
            if (this.energy < 20 && !this.isSleeping) {
                this.showMessage('小兔子看起来很累...');
            } else if (this.mood < 20 && !this.isSleeping) {
                this.showMessage('小兔子心情不太好...');
            }
            
            this.updateStatus();
        }, 5000); // 每5秒更新一次
    }
}

// 初始化虚拟宠物
document.addEventListener('DOMContentLoaded', () => {
    const pet = new VirtualPet();
}); 