// js/pages/about.js

document.addEventListener("DOMContentLoaded", () => {
    
    // Inject centralized premium footer
    const footerContainer = document.getElementById("dynamic-footer");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="glass-card" style="margin-top: 50px; padding: 40px 20px; text-align: center; border-radius: 30px 30px 0 0; border-bottom: none;">
                <h2 class="cinzel-font text-gold">${CONFIG.BRAND}</h2>
                <p style="font-size: 0.75rem; color: #444;">&copy; 2026 ${CONFIG.BRAND}. Verified Official Hub.</p>
            </div>
        `;
    }

    // Connect Gateway Injection Mapping
    const cardsContainer = document.getElementById("connect-cards-container");
    if (cardsContainer) {
        cardsContainer.innerHTML = `
            <!-- Card 1: Official Corporate Mail Box -->
            <div class="glass-card contact-card">
                <i class="fas fa-envelope-open-text text-gold"></i>
                <h4 class="cinzel-font" style="font-size: 0.95rem;">Business Inquiries</h4>
                <p style="font-size: 0.8rem; color: var(--text-gray); margin-top: 5px;">${CONFIG.SOCIALS.EMAIL}</p>
                <a href="mailto:${CONFIG.SOCIALS.EMAIL}" class="btn-gold">Send Message</a>
            </div>

            <!-- Card 2: Instagram Handles Ecosystem -->
            <div class="glass-card contact-card">
                <i class="fab fa-instagram text-gold"></i>
                <h4 class="cinzel-font" style="font-size: 0.95rem;">Instagram Feed</h4>
                <p style="font-size: 0.8rem; color: var(--text-gray); margin-top: 5px;">@aayusignature</p>
                <a href="${CONFIG.SOCIALS.INSTA}" target="_blank" class="btn-gold">Follow Artist</a>
            </div>

            <!-- Card 3: Facebook Communities Network -->
            <div class="glass-card contact-card">
                <i class="fab fa-facebook-square text-gold"></i>
                <h4 class="cinzel-font" style="font-size: 0.95rem;">Facebook Space</h4>
                <p style="font-size: 0.8rem; color: var(--text-gray); margin-top: 5px;">Official Page Connect</p>
                <a href="${CONFIG.SOCIALS.FB}" target="_blank" class="btn-gold">Join Network</a>
            </div>
        `;
    }

    // GSAP Aesthetic Micro Interactions Layout
    gsap.from(".profile-banner", { scale: 0.9, opacity: 0, duration: 0.6, ease: "power2.out" });
    gsap.from(".glass-card", { y: 25, opacity: 0, duration: 0.5, delay: 0.2 });
    gsap.from(".contact-card", { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.4 });
});
