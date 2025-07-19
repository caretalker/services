document.addEventListener('DOMContentLoaded', function() {
    // 設定アイコンのクリックイベント
    const settingsIcon = document.querySelector('.header-icons img[alt="設定"]');
    if (settingsIcon) {
        settingsIcon.addEventListener('click', function() {
            window.location.href = 'settings.html';
        });
        
        // カーソルをポインターに変更
        settingsIcon.style.cursor = 'pointer';
    }
    
    // その他のヘッダーアイコンにもクリックイベントを追加（必要に応じて）
    const notificationIcon = document.querySelector('.header-icons img[alt="通知"]');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('通知機能は現在準備中です。');
        });
        notificationIcon.style.cursor = 'pointer';
    }
    
    const profileIcon = document.querySelector('.header-icons img[alt="プロフィール"]');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            alert('プロフィール機能は現在準備中です。');
        });
        profileIcon.style.cursor = 'pointer';
    }
    
    // フッターアイコンのクリックイベント
    const footerIcons = document.querySelectorAll('.footer img');
    footerIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        
        icon.addEventListener('click', function() {
            const alt = icon.getAttribute('alt');
            switch(alt) {
                case 'ホーム':
                    // 既にホームページにいるので何もしない
                    break;
                case '記録':
                    alert('記録機能は現在準備中です。');
                    break;
                case 'カルテ':
                    alert('カルテ機能は現在準備中です。');
                    break;
                case '設定':
                    window.location.href = 'settings.html';
                    break;
            }
        });
    });
});
