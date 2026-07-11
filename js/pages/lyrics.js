// js/pages/lyrics.js

// Local sync matching song-details database structure
const DYNAMIC_LYRICS_DATA = {
    "SAMPLE_VIDEO_ID": {
        title: "Sample Official Track",
        text: `[Verse 1]\nHere go your beautiful lyrics line 1\nLine 2 of your premium song...\n\n[Chorus]\nAayu Signature official track tune...`
    }
    // Tum yahan apni video IDs ke sath unka specific object inject kar sakte ho
};

document.addEventListener("DOMContentLoaded", async () => {
    
    // Inject centralized premium footer
    const footerContainer = document.getElementById("dynamic-footer");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="glass-card" style="margin-top: 50px; padding: 40px 20px; text-align: center; border-radius: 30px 30px 0 0; border-bottom: none;">
                <h2 class="cinzel-font text-gold">${CONFIG.BRAND}</h2>
                <p style="font-size: 0.75rem; color: #444;">&copy; 2026 ${CONFIG.BRAND}. Lyrics Syndication Desk.</p>
            </div>
        `;
    }

    const archiveGrid = document.getElementById("lyrics-archive-grid");
    const searchField = document.getElementById("lyrics-search");
    
    let videoBackupItems = [];

    const toastTrigger = (message) => {
        const toast = document.getElementById("lyrics-toast");
        toast.innerText = message;
        toast.classList.add("active");
        setTimeout(() => toast.classList.remove("active"), 2000);
    };

    // Main Renderer for Lyrics Listing
    const renderArchive = (items) => {
        archiveGrid.innerHTML = "";
        
        // Target directly variables that have active entries mapped in database
        const activeIds = Object.keys(DYNAMIC_LYRICS_DATA);
        
        // Filter elements that have actual data configuration inside local storage
        const targets = items.filter(item => activeIds.includes(item.id.videoId));

        if (targets.length === 0) {
            archiveGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-gray);">
                    <i class="fas fa-file-signature" style="font-size: 2rem; margin-bottom: 10px; color: var(--gold-solid);"></i>
                    <p>No verified lyrics cards found for your current tracks.</p>
                </div>`;
            return;
        }

        targets.forEach(track => {
            const vId = track.id.videoId;
            const lyricObj = DYNAMIC_LYRICS_DATA[vId];

            const cardHTML = `
                <div class="glass-card lyrics-card">
                    <div>
                        <h4 class="cinzel-font text-gold" style="font-size: 1rem; margin-bottom: 5px;">${lyricObj.title}</h4>
                        <div class="lyrics-preview">${lyricObj.text}</div>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <a href="song-details.html?id=${vId}" class="btn-gold" style="flex: 1; text-align: center; text-decoration: none; font-size: 0.75rem; padding: 8px 0;">
                            <i class="fas fa-eye"></i> View Full
                        </a>
                        <button class="btn-gold copy-trigger-btn" data-id="${vId}" style="background: transparent; border: 1px solid var(--gold-solid); color: #fff; font-size: 0.75rem; padding: 8px 12px;">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            `;
            archiveGrid.innerHTML += cardHTML;
        });

        // Attach listeners dynamically to each copy button injected
        document.querySelectorAll(".copy-trigger-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const targetId = btn.getAttribute("data-id");
                const fullText = DYNAMIC_LYRICS_DATA[targetId].text;
                navigator.clipboard.writeText(fullText);
                toastTrigger("📋 Full lyrics copied to clipboard!");
            });
        });

        gsap.from("#lyrics-archive-grid .lyrics-card", { y: 15, opacity: 0, duration: 0.4, stagger: 0.05 });
    };

    // Step 1: Initialize database matching via live stream channels
    videoBackupItems = await fetchLatestVideos(50);
    renderArchive(videoBackupItems);

    // Step 2: Keyframe input listener logic
    searchField.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        const filtered = videoBackupItems.filter(item => {
            const id = item.id.videoId;
            return DYNAMIC_LYRICS_DATA[id] && DYNAMIC_LYRICS_DATA[id].title.toLowerCase().includes(query);
        });
        
        renderArchive(filtered);
    });
});

