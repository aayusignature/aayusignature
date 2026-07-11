// js/pages/songs.js

document.addEventListener("DOMContentLoaded", async () => {
    
    // Inject Custom Footer from config
    const footerContainer = document.getElementById("dynamic-footer");
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="glass-card" style="margin-top: 50px; padding: 40px 20px; text-align: center; border-radius: 30px 30px 0 0; border-bottom: none;">
                <h2 class="cinzel-font text-gold">${CONFIG.BRAND}</h2>
                <div style="margin: 20px 0;">
                    <a href="${CONFIG.SOCIALS.FB}" target="_blank" style="color: white; margin: 0 15px; font-size: 1.3rem;"><i class="fab fa-facebook"></i></a>
                    <a href="${CONFIG.SOCIALS.INSTA}" target="_blank" style="color: white; margin: 0 15px; font-size: 1.3rem;"><i class="fab fa-instagram"></i></a>
                    <a href="mailto:${CONFIG.SOCIALS.EMAIL}" style="color: white; margin: 0 15px; font-size: 1.3rem;"><i class="fas fa-envelope"></i></a>
                </div>
                <p style="font-size: 0.75rem; color: #444;">&copy; 2026 ${CONFIG.BRAND}. Catalog Live-Sync Protocol.</p>
            </div>
        `;
    }

    const libraryGrid = document.getElementById("songs-library-grid");
    const searchInput = document.getElementById("track-search-input");
    let masterTracksArray = []; // Storehouse for search comparison

    // Core Render Engine
    const displayTracks = (tracksList) => {
        libraryGrid.innerHTML = "";
        
        if (tracksList.length === 0) {
            libraryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-gray);">
                    <i class="fas fa-music-slash" style="font-size: 2rem; margin-bottom: 10px; color: var(--gold-solid);"></i>
                    <p>No gold tracks match your current search criteria.</p>
                </div>`;
            return;
        }

        tracksList.forEach(track => {
            const info = track.snippet;
            const videoId = track.id.videoId;
            const detailsLink = `song-details.html?id=${videoId}`;

            const cardHTML = `
                <div class="glass-card song-card" style="padding: 0; overflow: hidden;">
                    <img src="${info.thumbnails.high.url}" alt="${info.title}">
                    <div style="padding: 20px;">
                        <h4 class="cinzel-font" style="font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 8px;" title="${info.title}">${info.title}</h4>
                        <p style="font-size: 0.75rem; color: var(--text-gray); margin-bottom: 15px;">Published: ${new Date(info.publishedAt).toLocaleDateString()}</p>
                        <a href="${detailsLink}" class="btn-gold" style="display: block; text-align: center; text-decoration: none; font-size: 0.8rem;">
                            <i class="fas fa-disc-drive"></i> Track Specs & Lyrics
                        </a>
                    </div>
                </div>
            `;
            libraryGrid.innerHTML += cardHTML;
        });

        // Trigger GSAP micro-staggers on search modifications
        gsap.from("#songs-library-grid .song-card", { 
            y: 20, 
            opacity: 0, 
            duration: 0.4, 
            stagger: 0.05 
        });
    };

    // Step 1: Query API up to 50 items maximum
    masterTracksArray = await fetchLatestVideos(50);
    displayTracks(masterTracksArray);

    // Step 2: Instant UI Filter Event
    searchInput.addEventListener("input", (event) => {
        const queryText = event.target.value.toLowerCase().trim();
        
        const filteredArray = masterTracksArray.filter(track => 
            track.snippet.title.toLowerCase().includes(queryText) || 
            track.snippet.description.toLowerCase().includes(queryText)
        );
        
        displayTracks(filteredArray);
    });
});

