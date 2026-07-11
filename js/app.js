// js/app.js

// 1. PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log("Premium PWA Active!"))
            .catch(err => console.error("PWA registration failed:", err));
    });
}

// 2. Custom Mobile Install Event Listener
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('install-pwa');
    if (installBtn) installBtn.style.display = 'inline-block';
});

document.addEventListener('DOMContentLoaded', () => {
    const installBtn = document.getElementById('install-pwa');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.style.display = 'none';
                }
                deferredPrompt = null;
            }
        });
    }
});

