// js/pages/song-details.js

// Hardcoded Lyrics Storehouse - Just map with YouTube Video IDs
const LYRICS_DATABASE = {
    "SAMPLE_VIDEO_ID": `[Verse 1]\nHere go your beautiful lyrics line 1\nLine 2 of your premium song...\n\n[Chorus]\nAayu Signature official track tune...`,
    // Tum yahan apni video IDs paste karke unke lyrics add kar sakte ho
};

document.addEventListener("DOMContentLoaded", async () => {
    
    // Inject global luxury footer
    const footerContainer = document.getElementById("dynamic-footer");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="glass-card" style="margin-top: 50px; padding: 40px 20px; text-align: center; border-radius: 30px 30px 0 0; border-bottom: none;">
                <h2 class="cinzel-font text-gold">${CONFIG.BRAND}</h2>
                <p style="font-size: 0.75rem; color: #444;">&copy; 2026 ${CONFIG.BRAND}. Secure Stream Engine.</p>
            </div>
        `;
    }

    // URL Analytics Parameter Extractor (?id=xxxx)
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id');

    // Security Fallback Rule: Agar ID missing hai toh home page par feko
    if (!videoId) {
        window.location.href = 'index.html';
        return;
    }

    // Wire up fluid Iframe Cinema Player
    document.getElementById("cinema-frame").src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;

    // Toast triggers function
    const triggerToast = (msg) => {
        const toast = document.getElementById("toast-bar");
        toast.innerText = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
    };

    // Pull high-fidelity specifications from YouTube Data Core
    const videoData = await fetchVideoDetails(videoId);
    
    if (videoData) {
        const snippet = videoData.snippet;
        const stats = videoData.statistics;
        
        document.getElementById("track-title").innerText = snippet.title;
        document.getElementById("track-date").innerText = `Premiered on: ${new Date(snippet.publishedAt).toLocaleDateString()}`;
        document.getElementById("track-description").innerText = snippet.description || "No official description provided.";
        
        // Metrics presentation mapping
        const fmt = (num) => new Intl.NumberFormat('en-US').format(num);
        document.getElementById("meta-views").innerText = stats.viewCount ? fmt(stats.viewCount) : "N/A";
        document.getElementById("meta-likes").innerText = stats.likeCount ? fmt(stats.likeCount) : "Hidden";
        
        // Duration conversion (ISO 8601 -> readable human string)
        let isoDuration = videoData.contentDetails?.duration || "";
        let cleanDuration = isoDuration.replace("PT", "").replace("M", "m ").replace("S", "s");
        document.getElementById("meta-duration").innerText = cleanDuration || "Live Track";

        // Lyrics Injection Layer
        const lyricsZone = document.getElementById("lyrics-render-zone");
        if (LYRICS_DATABASE[videoId]) {
            lyricsZone.innerText = LYRICS_DATABASE[videoId];
        } else {
            lyricsZone.innerHTML = `<span style="color: var(--text-gray); font-style: italic;">Lyrics haven't been uploaded for this track yet. Stay tuned!</span>`;
        }

        // Action Item 1: Copy System Logic
        document.getElementById("btn-copy-lyrics").addEventListener("click", () => {
            if(LYRICS_DATABASE[videoId]) {
                navigator.clipboard.writeText(LYRICS_DATABASE[videoId]);
                triggerToast("🎵 Lyrics copied to clipboard!");
            } else {
                triggerToast("❌ No lyrics available to copy!");
            }
        });

        // Action Item 2: Native Share Framework Integration
        document.getElementById("btn-share-song").addEventListener("click", async () => {
            const shareData = {
                title: snippet.title,
                text: `Listen to ${snippet.title} on AAYU SIGNATURE Hub!`,
                url: window.location.href
            };
            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(window.location.href);
                    triggerToast("🔗 Web Link copied to clipboard!");
                }
            } catch (err) {
                console.log("Sharing interface cancelled");
            }
        });

        // GSAP Core Intros
        gsap.from(".video-player-container", { scale: 0.95, opacity: 0, duration: 0.8, ease: "power3.out" });
        gsap.from(".split-layout > *", { y: 30, opacity: 0, duration: 0.6, stagger: 0.15, delay: 0.3 });
    } else {
        document.getElementById("track-title").innerText = "Error Loading Track";
        document.getElementById("lyrics-render-zone").innerText = "Unable to connect to YouTube database server.";
    }
});
          
