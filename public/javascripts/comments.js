// Grab elements
const form = document.getElementById('comment-form');
const submitBtn = document.getElementById('submit-btn');
const commentsList = document.getElementById('comments-list');
const errorDiv = document.getElementById('error-message');

let currentPage = 1;

// LOAD COMMENTS (WITH PAGINATION)
async function loadComments(page = 1) {
    currentPage = page;

    try {
        const response = await fetch(`/api/comments?page=${page}`);

        if (!response.ok) throw new Error('Server unreachable');

        const comments = await response.json();

        if (comments.length === 0) {
            commentsList.innerHTML = '<p>No comments yet. Be the first!</p>';
            return;
        }

        // Render comments
        commentsList.innerHTML = comments.map(comment => `
            <article class="comment">
                <strong>${comment.name}</strong> 
                <span class="timestamp">- ${new Date(comment.timestamp).toLocaleString()}</span>
                <p>${comment.text}</p>
            </article>
        `).join('');

        // Pagination buttons
        document.getElementById('pagination').innerHTML = `
            <button onclick="loadComments(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
            <button onclick="loadComments(${currentPage + 1})">Next</button>
        `;

    } catch (err) {
        commentsList.innerHTML = '<p style="color:red;">Error loading comments.</p>';
    }
}


// SUBMIT COMMENT
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = 'Posting...';
    errorDiv.style.display = 'none';

    const payload = {
        name: document.getElementById('name').value.trim(),
        text: document.getElementById('text').value.trim()
    };

    // Validation
    if (!payload.name || !payload.text) {
        errorDiv.innerText = 'Fields cannot be empty';
        errorDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerText = 'Post Comment';
        return;
    }

    if (payload.text.length > 500) {
        errorDiv.innerText = 'Comment too long (max 500 characters)';
        errorDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerText = 'Post Comment';
        return;
    }

    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Server error.');
        }

        form.reset();
        loadComments(currentPage);

    } catch (err) {
        errorDiv.innerText = err.message;
        errorDiv.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Post Comment';
    }
});

// Initial load
loadComments();