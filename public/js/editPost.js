const editPost = async (event) => {
    event.preventDefault();
  
    // Collect values from the form
    const title = document.querySelector('#project-name').value.trim();
    const content = document.querySelector('#project-desc').value.trim();
    const postId = document.querySelector('#post-id').value; // add this line to get the post id
  
    if (title && content) {
        // Send a PUT request to the API endpoint
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'PUT',
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
  
  document.querySelector('#update').addEventListener('click', editPost);