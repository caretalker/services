document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーアイコンの設定
    setupHeaderIcons();
    
    // フッターアイコンの設定
    setupFooterIcons();
    
    // 日付表示を更新
    updateHeaderDate();
});

function updateHeaderDate() {
    const dateElement = document.querySelector('.header .date');
    if (dateElement) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        dateElement.textContent = `${year} ${month}/${day}`;
    }
}

function setupHeaderIcons() {
    // 通知アイコン
    const notificationIcon = document.querySelector('.header-icons img[alt="通知"]');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            window.location.href = 'notifications.html';
        });
    }
    
    // 設定アイコン
    const settingsIcon = document.querySelector('.header-icons img[alt="設定"]');
    if (settingsIcon) {
        settingsIcon.addEventListener('click', function() {
            window.location.href = 'settings.html';
        });
    }
    
    // プロフィールアイコン
    const profileIcon = document.querySelector('.header-icons img[alt="プロフィール"]');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            window.location.href = 'account.html';
        });
    }
}

function setupFooterIcons() {
    const footerIcons = document.querySelectorAll('.footer img');
    
    footerIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const alt = icon.getAttribute('alt');
            
            switch(alt) {
                case 'ホーム':
                    window.location.href = 'top.html';
                    break;
                case '記録':
                    window.location.href = 'calendar.html';
                    break;
                case 'カルテ':
                    window.location.href = 'record.html';
                    break;
                case '設定':
                    window.location.href = 'settings.html';
                    break;
            }
        });
    });
}
