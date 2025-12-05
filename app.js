const input = document.getElementById('question-input');
const postBtn = document.getElementById('post-btn');
const feed = document.getElementById('feed-container');

// --- FIREBASE INTEGRATION START (Paste Person 3's code here) ---
// TODO: Person 3 pastes exports here
// --- FIREBASE INTEGRATION END ---

postBtn.addEventListener('click', handlePost);
input.addEventListener('keypress', (e) => e.key === 'Enter' && handlePost());

async function handlePost() {
    const text = input.value.trim();
    if (!text) return;

    try {
        // Replace with actual: await addQuestion(text);
        console.log("Mock Save:", text); 
        input.value = '';
    } catch (err) {
        console.error(err);
        alert("Failed to post");
    }
}

function render(data) {
    feed.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'q-card';
        card.innerHTML = `
            <div class="q-text">${escapeHtml(item.text)}</div>
            <div class="vote-box">
                <button class="upvote-btn" onclick="triggerVote('${item.id}')">▲</button>
                <span class="vote-count">${item.votes}</span>
            </div>
        `;
        feed.appendChild(card);
    });
}

// Global scope for onclick attribute
window.triggerVote = (id) => {
    // Replace with actual: upvoteQuestion(id);
    console.log("Mock Vote:", id);
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// TODO: Call listenToFeed(render) here once Firebase is ready