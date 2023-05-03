
const deletePostButtons = document.querySelectorAll('.delete-btn');
const posts = JSON.parse(localStorage.getItem('posts'));

// add event listener to each delete button
deletePostButtons.forEach(function (button, index) {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    // get the post element that contains the delete button
    const post = button.parentElement.parentElement.parentElement;

    // get the id of that parent class to use to delete. The id is the same as the id in the post object
    const postId = post.id

    // remove the post element from the DOM
    post.remove();
    deletePostById(posts, postId)
  });
});


function deletePostById(posts, id) {
  // use findIndex to find the index of the post with id that we are trying to target. I had to wrap the id in Number because it was being passed as a string from id attribute in the card class
  const index = posts.findIndex(post => post.id === Number(id));

  // if the id is found, update the post array, set it in local storage, and remove the item with the id
  if (index !== -1) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.removeItem(id);
  }
}

// const posts = JSON.parse(localStorage.getItem('posts'));


// try {
//   deletePostById(posts, 2); // Delete post with id 123
//   localStorage.setItem('posts', JSON.stringify(posts)); // Save updated posts to local storage
// } catch (error) {
//   console.error(error); // Log the error message
// }
