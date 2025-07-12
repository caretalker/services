// Cloud Runのエンドポイント（デプロイ後に更新してください）
const CLOUD_RUN_URL = 'https://your-cloud-run-service-url.run.app';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loadingMessage = document.getElementById('loadingMessage');
    const loginButton = document.getElementById('loginButton');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // フォームデータを取得
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // UI状態を更新
        showLoading();
        hideError();
        
        try {
            // Cloud Runにログイン要求を送信
            const response = await fetch(`${CLOUD_RUN_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // ログイン成功
                // シリアル番号をセッションストレージに保存
                sessionStorage.setItem('userSerial', data.serial);
                sessionStorage.setItem('userEmail', email);
                
                // トップページにリダイレクト
                window.location.href = 'top.html';
            } else {
                // ログイン失敗
                showError(data.message || 'メールアドレスまたはパスワードが間違っています');
            }
        } catch (error) {
            console.error('ログインエラー:', error);
            showError('ネットワークエラーが発生しました。もう一度お試しください。');
        } finally {
            hideLoading();
        }
    });
    
    function showLoading() {
        loadingMessage.style.display = 'block';
        loginButton.disabled = true;
        loginButton.textContent = 'ログイン中...';
    }
    
    function hideLoading() {
        loadingMessage.style.display = 'none';
        loginButton.disabled = false;
        loginButton.textContent = 'ログイン';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    function hideError() {
        errorMessage.style.display = 'none';
    }
});

// フォームの入力時にエラーメッセージを隠す
document.addEventListener('input', function(e) {
    if (e.target.type === 'email' || e.target.type === 'password') {
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage.style.display === 'block') {
            errorMessage.style.display = 'none';
        }
    }
});
