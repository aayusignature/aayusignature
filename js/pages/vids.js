// js/pages/vids.js

document.addEventListener("DOMContentLoaded", async () => {
    
    // Inject centralized premium footer
    const footerContainer = document.getElementById("dynamic-footer");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="glass-card" style="margin-top: 50px; padding: 40px 20px; text-align: center; border-radius: 30px 30px 0 0; border-bottom: none;">
                <h2 class="cinzel-font text-gold">${CONFIG.BRAND}</h2>
                <p style="font-size: 0.75rem; color: #444;">&copy; 2026 ${CONFIG.BRAND}. Multi-Format Media Hub.</p>
            </div>
        `;
    }

    const landscapeGrid = document.getElementById("landscape-vids-grid");
    const portraitGrid = document.getElementById("portrait-shorts-grid");
    
    const vidsBtn = document.getElementById("btn-show-vids");
    const shortsBtn = document.getElementById("btn-show-shorts");

    let allMediaItems = [];

    // Step 1: Fetch robust block of up to 45 items from data core
    allMediaItems = await fetchLatestVideos(45);
    
    // Engine mapping logic: Separate standard videos and shorts
    const officialVideos = [];
    const shortsVideos = [];

    allMediaItems.forEach(item => {
        const desc = item.snippet.description.toLowerCase();
        const title = item.snippet.title.toLowerCase();
        
        // Smart Check: Agar description ya title me #shorts tag hai, toh use vertical bucket me daalo
        if (desc.includes("#shorts") || title.includes("#shorts") || desc.includes("short")) {
            shortsVideos.push(item);
        } else {
            officialVideos.push(item);
        }
    });

    // Render Engine for Official Videos (Landscape Grid)
    const renderLandscape = () => {
        landscapeGrid.innerHTML = "";
        if (officialVideos.length === 0) {
            landscapeGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--text-gray);">No official release videos found.</p>`;
            return;
        }

        officialVideos.forEach(vid => {
            const snip = vid.snippet;
            const card = `
                <div class="glass-card video-card" style="padding: 0; overflow: hidden;">
                    <img src="${snip.thumbnails.high.url}" alt="${snip.title}">
                    <div style="padding: 20px;">
                        <h4 class="cinzel-font" style="font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 12px;">${snip.title}</h4>
                        <a href="song-details.html?id=${vid.id.videoId}" class="btn-gold" style="display: block; text-align: center; text-decoration: none; font-size: 0.8rem;">
                            <i class="fas fa-play"></i> Launch Cinema Player
                        </a>
                    </div>
                </div>
            `;
            landscapeGrid.innerHTML += card;
        });
        gsap.from("#landscape-vids-grid .video-card", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 });
    };

    // Render Engine for Shorts (Portrait Mesh)
    const renderPortrait = () => {
        portraitGrid.innerHTML = "";
        if (shortsVideos.length === 0) {
            portraitGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--text-gray); padding: 40px;">No custom Shorts detected on channel.</p>`;
            return;
        }

        shortsVideos.forEach(short => {
            const snip = short.snippet;
            // Native direct routing link to YouTube full screen app player
            const youtubeShortsUrl = `https://youtube.com/shorts/${short.id.videoId}`;
            
            const card = `
                <div class="shorts-card">
                    <img class="shorts-thumb" src="${snip.thumbnails.high.url}" alt="${snip.title}">
                    <div class="shorts-info">
                        <h5 style="font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 10px; font-weight: 400;">${snip.title}</h5>
                        <a href="${youtubeShortsUrl}" target="_blank" class="btn-gold" style="padding: 5px 12px; font-size: 0.7rem; display: inline-flex; width: 100%; justify-content: center; text-decoration: none;">
                            <i class="fas fa-bolt" style="margin-top:2px; margin-right:5px;"></i> View Loop
                        </a>
                    </div>
                </div>
            `;
            portraitGrid.innerHTML += card;
        });
        gsap.from("#portrait-shorts-grid .shorts-card", { scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.05 });
    };

    // Initial Execution Rule
    renderLandscape();
    renderPortrait();

    // Tab Interface Toggling Rules
    vidsBtn.addEventListener("click", () => {
        shortsBtn.classList.remove("active");
        vidsBtn.add("active");
        portraitGrid.style.display = "none";
        landscapeGrid.style.display = "grid";
        renderLandscape();
    });

    shortsBtn.addEventListener("click", () => {
        vidsBtn.classList.remove("active");
        shortsBtn.classList.add("active");
        landscapeGrid.style.display = "none";
        portraitGrid.style.display = "grid";
        renderPortrait();
    });
});
