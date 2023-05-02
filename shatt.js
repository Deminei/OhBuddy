// let updatePost = (id, name, post, tags) => {
//     let localPosts = JSON.parse(localStorage.getItem('posts'));
  
//     let postIndex = localPosts.findIndex(post => post.id === id);
  
//     if (postIndex !== -1) {
//       localPosts[postIndex].name = name;
//       localPosts[postIndex].post = post;
//       localPosts[postIndex].tags = tags;
//       localStorage.setItem('posts', JSON.stringify(localPosts));
//     }
//   };
  
//   // Add event listener to the update button on each post
//   let updateButtons = document.querySelectorAll('.update-btn');
//   updateButtons.forEach(button => {
//     button.addEventListener('click', event => {
//       event.preventDefault();
  
//       // Get the id of the post to update
//       let postId = event.target.getAttribute('data-id');
  
//       // Find the post in localStorage and fill in the form with its current data
//       let localPosts = JSON.parse(localStorage.getItem('posts'));
//       let postIndex = localPosts.findIndex(post => post.id === Number(postId));
//       if (postIndex !== -1) {
//         let post = localPosts[postIndex];
//         document.querySelector('#name').value = post.name;
//         document.querySelector('#message-area').value = post.post;
//         document.querySelector('#tags').value = post.tags;
//         document.querySelector('#submit').value = 'Update';
  
//         // Replace the submit event listener to use the update function
//         submitButton.removeEventListener('click', addPost);
//         submitButton.addEventListener('click', () => {
//           updatePost(post.id, document.querySelector('#name').value, document.querySelector('#message-area').value, document.querySelector('#tags').value);
//           form.reset();
//           document.querySelector('#submit').value = 'Send It!';
//           submitButton.removeEventListener('click', updatePost);
//           submitButton.addEventListener('click', addPost);
//         });
//       }
//     });
//   });


function updatePost(postId, updatedName, updatedPost, updatedTags) {
    let localPosts = JSON.parse(localStorage.getItem('posts'));
  
    const updatedPosts = localPosts.map(post => {
      if (!postId || post.id === postId) {
        return {
          ...post,
          name: updatedName,
          post: updatedPost,
          tags: updatedTags,
        };
      } else {
        return post;
      }
    });
  
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  }