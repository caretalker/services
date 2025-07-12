const CLOUD_RUN_URL = 'https://loginservice-family-sucmscarza-an.a.run.app';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loadingMessage = document.getElementById('loadingMessage');
    const loginButton = document.getElementById('loginButton');
    const rememberMe = document.getElementById('rememberMe');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // ページ読み込み時に保存されたログイン情報を復元
    loadRememberedCredentials();

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // フォームデータを取得
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // 入力値の検証
        if (!email || !password) {
            showError('メールアドレスとパスワードを入力してください');
            return;
        }
        
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
                
                // 「ログインを保持する」がチェックされている場合
                if (rememberMe.checked) {
                    localStorage.setItem('rememberedEmail', email);
                    localStorage.setItem('rememberLogin', 'true');
                } else {
                    localStorage.removeItem('rememberedEmail');
                    localStorage.removeItem('rememberLogin');
                }
                
                // トップページにリダイレクト
                window.location.href = 'top.html';
            } else {
                // ログイン失敗
                showError(data.message || 'メールアドレスまたはパスワードが間違っています');
            }
        } catch (error) {
            console.error('ログインエラー:', error);
            showError('ネットワークエラーが発生しました。インターネット接続を確認してください。');
        } finally {
            hideLoading();
        }
    });
    
    // パスワードを忘れた場合のクリックイベント
    document.querySelector('.forgot').addEventListener('click', function() {
        alert('パスワードリセット機能は現在準備中です。管理者にお問い合わせください。');
    });
    
    // 新規登録のクリックイベント
    document.querySelector('.register').addEventListener('click', function() {
        alert('新規登録機能は現在準備中です。管理者にお問い合わせください。');
    });
    
    function showLoading() {
        loadingMessage.style.display = 'block';
        loginButton.disabled = true;
        loginButton.textContent = 'ログイン中...';
    }
    
    function hideLoading() {
        loadingMessage.style.display = 'none';
        loginButton.disabled = false;
        loginButton.textContent = '次へ';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        // エラー表示時にフォームを少し上にスクロール
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function hideError() {
        errorMessage.style.display = 'none';
    }
    
    function loadRememberedCredentials() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberLogin = localStorage.getItem('rememberLogin');
        
        if (rememberLogin === 'true' && rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMe.checked = true;
        }
    }
    
    // フォームの入力時にエラーメッセージを隠す
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', function() {
            if (errorMessage.style.display === 'block') {
                hideError();
            }
        });
    });
    
    // Enterキーでログイン
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    });
});
