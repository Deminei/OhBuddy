
 const deletePostButtons = document.querySelectorAll('#delete-btn');

// add event listener to each delete button
deletePostButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // get the post element that contains the delete button
    const post = button.parentElement;
    // remove the post element from the DOM
    post.remove();
  });
});

function deletePostById(posts, id) {
    let postFound = false;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        posts.splice(i, 1); // Remove the post from the array
        postFound = true;
        break;
      }
    }
    if (!postFound) {
      throw new Error(`Post with id ${id} not found`);
    }
  }
  
  const posts = JSON.parse(localStorage.getItem('posts'));

try {
  deletePostById(posts, 123); // Delete post with id 123
  localStorage.setItem('posts', JSON.stringify(posts)); // Save updated posts to local storage
} catch (error) {
  console.error(error); // Log the error message
}
