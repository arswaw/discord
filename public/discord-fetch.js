export async function fetchList() {
    try {
        const response = await fetch('http://localhost:3000/list');
        // CRITICAL: Always check response.ok. 
        // Fetch does NOT reject on HTTP errors like 404 or 500!
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Network or parsing error:', error);
    }
}
export async function fetchFolders() {
    try {
        const response = await fetch('http://localhost:3000/folders');
        // CRITICAL: Always check response.ok. 
        // Fetch does NOT reject on HTTP errors like 404 or 500!
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Network or parsing error:', error);
    }
}
export async function fetchConversation(id) {
    try {
        const response = await fetch(`http://localhost:3000/conversation/${id}`);
        // CRITICAL: Always check response.ok. 
        // Fetch does NOT reject on HTTP errors like 404 or 500!
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Network or parsing error:', error);
    }
}
