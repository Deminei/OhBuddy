function generatePostHtml(post) {
    return `
      <div class="card right" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${post.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
          <p class="card-text">${post.post}</p>
          <label for="">Tags: </label>
          <span class="tags">${post.tags}</span>
          <div>
              <a href="#" class="card-link">Update</a>
            <a href="#" class="card-link" class="delete-btn">Delete</a>
            </div>
        </div>
      </div>
    `;
}

let container = document.querySelector('#posts-container');
let localPosts = JSON.parse(localStorage.getItem('posts')) || [];


localPosts.forEach(post => {
    let postHtml = generatePostHtml(post);
    container.insertAdjacentHTML('beforeend', postHtml);
});
