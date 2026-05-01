// Grab our HTML elements
const form = document.getElementById('comment-form');
const submitBtn = document.getElementById('submit-btn');
const commentsList = document.getElementById('comments-list');
const errorDiv = document.getElementById('error-message');

// Fetch comments from our Express backend
async function loadComments() {
    try {
        const response = await fetch('/api/comments');
        
        // Edge Case: Server is down or unreachable
        if (!response.ok) throw new Error('Server unreachable');
        
        const comments = await response.json();
        
        // Handle empty database
        if (comments.length === 0) {
            commentsList.innerHTML = '<p>No comments yet. Be the first!</p>';
            return;
        }

        // Build HTML for each comment (reverse puts newest at the top)
        commentsList.innerHTML = comments.map(comment => `
            <article class="comment" style="background: white; padding: 1rem; margin-bottom: 1rem; border-radius: 4px; border: 1px solid #ccc;">
                <strong>${comment.name}</strong> 
                <span class="timestamp" style="color: #666; font-size: 0.85rem;">- ${new Date(comment.timestamp).toLocaleString()}</span>
                <p style="margin-top: 0.5rem;">${comment.text}</p>
            </article>
        `).reverse().join(''); 
        
    } catch (err) {
        // Show a friendly error instead of breaking the UI
        commentsList.innerHTML = '<p style="color: red;">Oops! Trouble loading comments right now. Please try again later.</p>';
    }
}

// Handle new comment submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    // Edge Case: Disable button to prevent spam/double-clicks
    submitBtn.disabled = true;
    submitBtn.innerText = 'Posting...';
    errorDiv.style.display = 'none';

    // Package the user's input
    const payload = {
        name: document.getElementById('name').value,
        text: document.getElementById('text').value
    };

    try {
        // Send to backend
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // Check if backend validation failed (e.g., too long)
        if (!response.ok) {
            throw new Error(data.error || 'Server error.');
        }

        // Success: Clear form and reload comments
        form.reset();
        loadComments();

    } catch (err) {
        // Display backend errors to the user
        errorDiv.innerText = err.message;
        errorDiv.style.display = 'block';
    } finally {
        // Always turn the button back on
        submitBtn.disabled = false;
        submitBtn.innerText = 'Post Comment';
    }
});

// Initial load
loadComments();