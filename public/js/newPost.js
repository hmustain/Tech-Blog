const newPost = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#project-name').value.trim();
    const content = document.querySelector('#project-desc').value.trim();

    if (title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
    };

    const deleteButtons = document.querySelectorAll('.delete-button');

    for (const button of deleteButtons) {
        button.addEventListener('click', async (event) => {
            const postId = event.target.dataset.id;
    
            // Send a DELETE request to the API endpoint
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // If successful, reload the page
                location.reload();
            } else {
                alert(response.statusText);
            }
        });
    }

    
document.querySelector('#create').addEventListener('click', newPost);


const updateButton = document.querySelectorAll('.update-button');

updateButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const postId = event.target.dataset.id;
    const updatedTitle = document.querySelector('#project-name').value;
    const updatedContent = document.querySelector('#project-desc').value;

    // Send a PUT request to the API endpoint
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
    });

    if (response.ok) {
        // If successful, reload the page
        location.reload();
    } else {
        alert(response.statusText);
    }
});
