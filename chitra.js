
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
