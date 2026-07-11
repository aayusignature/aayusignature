// js/pages/home.js

document.addEventListener("DOMContentLoaded", async () => {
    
    // Inject Custom Footer from Central config.js
    const footerContainer = document.getElementById("dynamic-footer");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="glass-card" style="margin-top: 50px; padding: 40px 20px; text-align: center; border-radius: 30px 30px 0 0; border-bottom: none;">
                <h2 class="cinzel-font text-gold">${CONFIG.BRAND}</h2>
                <p style="margin: 10px 0; font-size: 0.9rem; color: var(--text-gray);">Official Premium Music Hub</p>
                <div style="margin: 20px 0;">
                    <a href="${CONFIG.SOCIALS.FB}" target="_blank" style="color: white; margin: 0 15px; font-size: 1.3rem; transition: 0.3s;"><i class="fab fa-facebook"></i></a>
                    <a href="${CONFIG.SOCIALS.INSTA}" target="_blank" style="color: white; margin: 0 15px; font-size: 1.3rem; transition: 0.3s;"><i class="fab fa-instagram"></i></a>
                    <a href="mailto:${CONFIG.SOCIALS.EMAIL}" style="color: white; margin: 0 15px; font-size: 1.3rem; transition: 0.3s;"><i class="fas fa-envelope"></i></a>
                </div>
                <p style="font-size: 0.75rem; color: #444;">&copy; 2026 ${CONFIG.BRAND}. Engine Powered by YouTube API.</p>
            </div>
        `;
    }

    // Number formatter utility (10,000 -> 10K, etc.)
    const formatCount = (num) => {
        return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
    };

    // Task 1: Fetch and Map Channel Analytics
    const channelStats = await fetchChannelStats();
    if (channelStats) {
        const stats = channelStats.statistics;
        
        document.getElementById("stat-subs").innerText = formatCount(stats.subscriberCount);
        document.getElementById("stat-views").innerText = formatCount(stats.viewCount);
        document.getElementById("stat-count").innerText = stats.videoCount;
        
        // Dynamic Banner Update from Channel Header Artwork
        if(channelStats.brandingSettings?.image?.bannerExternalUrl) {
            document.getElementById("hero-bg").style.backgroundImage = `url('${channelStats.brandingSettings.image.bannerExternalUrl}=w1440-fcrop64=1,00005a57ffffa5a7-k-c0xffffffff-no-nd-rj')`;
        }
    }

    // Task 2: Fetch and Populates Latest 6 Videos
    const latestReleases = await fetchLatestVideos(6);
    const grid = document.getElementById("home-songs-grid");

    if (latestReleases && latestReleases.length > 0) {
        // Map Hero Banner details to the single fresh upload
        const topTrack = latestReleases[0];
        document.getElementById("hero-title").innerText = topTrack.snippet.title;
        document.getElementById("hero-desc").innerText = topTrack.snippet.description.substring(0, 160) + "...";
        document.getElementById("hero-link").href = `https://youtube.com/watch?v=${topTrack.id.videoId}`;

        // Clear Loader
        grid.innerHTML = "";

        // Loop to generate rest cards
        latestReleases.forEach(track => {
            const snip = track.snippet;
            const vId = track.id.videoId;
            
            // Link directly to individual template page with unique query parameter
            const songPageUrl = `song-details.html?id=${vId}`;

            const cardStructure = `
                <div class="glass-card song-card" style="padding: 0; overflow: hidden;">
                    <img src="${snip.thumbnails.high.url}" alt="${snip.title}">
                    <div style="padding: 20px;">
                        <h4 class="cinzel-font" style="font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 8px;">${snip.title}</h4>
                        <p style="font-size: 0.75rem; color: var(--text-gray); margin-bottom: 15px;">Date: ${new Date(snip.publishedAt).toLocaleDateString()}</p>
                        <a href="${songPageUrl}" class="btn-gold" style="display: block; text-align: center; text-decoration: none; font-size: 0.8rem;">
                            <i class="fas fa-headphones"></i> Listen & Details
                        </a>
                    </div>
                </div>
            `;
            grid.innerHTML += cardStructure;
        });

        // GSAP Animations Engine Integration
        gsap.from(".navbar", { y: -60, opacity: 0, duration: 0.8, ease: "power2.out" });
        gsap.from(".hero-content > *", { x: -40, opacity: 0, duration: 0.7, stagger: 0.15 });
        gsap.from(".stat-box", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.3 });
        gsap.from(".song-card", { scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.5 });
    } else {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-gray);">No videos found or API limit reached.</p>`;
    }
});

