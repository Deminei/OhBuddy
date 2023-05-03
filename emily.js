// SEARCH FUNCTIONALITY
function generatePostHtml(post) {
  let tagsHtml = post.tags[0] === ' ' ? post.tags[0] : '#' + post.tags[0];

  //loop through the post.tags string, starting from the second character
  for (let i = 1; i < post.tags.length; i++) {
    //if the current character is not a whitespace and the previous character is a whitespace,
    // add a '#' before the current character
    if (post.tags[i - 1] === ' ' && post.tags[i] !== ' ') {
      tagsHtml += '#';
    }
    //appends the current character to the tagsHtml string
    tagsHtml += post.tags[i];
  }

  return `
  <div class="card" id="${post.id}">
    <div class="card-body">
      <h5 class="card-title">${post.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted"><sub>${post.date}</sub></h6>
      <p class="card-text">${post.post}</p>
      <label for="">Tags: </label>
      <a href="#" class="tags">${tagsHtml}</a>
      <div>
        <a href="#" class="card-link update-btn">Update</a>
        <a href="#" class="card-link delete-btn">Delete</a>
      </div>
    </div>
  </div>`
    ;
}

const input = document.querySelector(".search-input");

function searchPost() {
  const posts = JSON.parse(localStorage.getItem("posts"));
  const searchInput = document
    .querySelector(".search-input")
    .value.toLowerCase();

  if (searchInput.trim() === '') {
    // if search input is empty, reload all posts
    let postHtml = "";
    let div = document.querySelector("#posts-container");
    div.textContent = "";
    posts.forEach((post) => {
      postHtml += generatePostHtml(post);
    });
    div.insertAdjacentHTML('beforeend', postHtml);
    return;
  }

  let postsObjects = posts.filter(post => post.tags.includes(searchInput));

  let postHtml = "";
  let div = document.querySelector("#posts-container");
  div.textContent = "";
  postsObjects.forEach((post) => {
    postHtml += generatePostHtml(post);
  });
  div.insertAdjacentHTML('beforeend', postHtml);
  // console.log(postsObjects);
}


// const searchBtn = document.querySelector(".search-btn");
input.addEventListener("input", event => {
  event.preventDefault();
  searchPost();
});