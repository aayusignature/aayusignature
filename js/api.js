// js/api.js

// 1. YouTube Channel Information Fetch Karna (Subs, Banner, Views)
async function fetchChannelStats() {
    const url = `${CONFIG.BASE_URL}/channels?part=snippet,statistics,brandingSettings&id=${CONFIG.CHANNEL_ID}&key=${CONFIG.YOUTUBE_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API fetch failed');
        const data = await response.json();
        return data.items ? data.items[0] : null;
    } catch (error) {
        console.error("Error fetching channel stats:", error);
        return null;
    }
}

// 2. Latest Videos & Uploads Fetch Karna (Grid layouts ke liye)
async function fetchLatestVideos(maxResults = 9) {
    const url = `${CONFIG.BASE_URL}/search?part=snippet&channelId=${CONFIG.CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${CONFIG.YOUTUBE_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API fetch failed');
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching latest videos:", error);
        return [];
    }
}

// 3. Single Video Custom details nikalna (Duration, Views count for song-details page)
async function fetchVideoDetails(videoId) {
    const url = `${CONFIG.BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${CONFIG.YOUTUBE_API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API fetch failed');
        const data = await response.json();
        return data.items ? data.items[0] : null;
    } catch (error) {
        console.error("Error fetching specific video details:", error);
        return null;
    }
}

