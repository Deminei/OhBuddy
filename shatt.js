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