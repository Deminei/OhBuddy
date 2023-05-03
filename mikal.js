function generatePostHtml(post) {
  return `
      <div class="card" id="${post.id}">
        <div class="card-body">
          <h5 class="card-title">${post.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted"><sub>${post.date}</sub></h6>
          <p class="card-text">${post.post}</p>
          <label for="">Tags: </label>
          <a href="#" class="tags">${post.tags}</a>
          <div>
              <a href="#" class="card-link update-btn">Update</a>
            <a href="#" class="card-link delete-btn">Delete</a>
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
