const newComment = async (event) => {
    event.preventDefault();
  
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        // If not, redirect to login page
        document.location.replace('/login');
        return;
    }
  
    // Collect values from the comment form
    const comment = document.querySelector('#comment-text').value.trim();
    const postId = document.querySelector('input[name="postId"]').value;

    if (comment && postId) {
        // Send a POST request to the API endpoint
        try {
            const response = await fetch('/comments', {
                method: 'POST',
                body: JSON.stringify({ comment, postId, user_id: user.id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // If successful, redirect to post page
                document.location.replace(`/post/${postId}`);
            } else {
                const data = await response.json();
                if (data.error === 'Unauthorized') {
                    // session expired, redirect to login page
                    document.location.replace('/login');
                } else {
                    alert(data.error);
                }
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while posting the comment. Please try again later.');
        }
    }
};

document.querySelector('button[type="submit"]').addEventListener('click', newComment);
