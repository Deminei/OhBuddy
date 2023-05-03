// SEARCH FUNCTIONALITY
function generatePostHtml(post) {
  return `
      <div class="card right" id="${post.id}"style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${post.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
          <p class="card-text">${post.post}</p>
          <label for="">Tags: </label>
          <span class="tags">${post.tags}</span>
          <div>
              <a href="#" class="card-link">Update</a>
            <a href="#" class="card-link delete-btn">Delete</a>
            </div>
        </div>
      </div>
    `;
}

function searchPost() {
  const posts = JSON.parse(localStorage.getItem("posts"));
  const searchInput = document
    .querySelector(".search-input")
    .value.toLowerCase();

  //manipulate HTML to show only the cards with the tags searched
  let feed = document.querySelector(".post-list").children; //pulls array of all objects
  let postsArray = Array.from(feed);
  let taggedPosts = postsArray.filter(
    (post) => post.children[0].children[4].textContent === searchInput
  );

  let postHtml = "";
  taggedPosts.forEach((post) => {
    postHtml += generatePostHtml(post);
  });

  let div = document.querySelector(".post-list");
  div.innerHTML = postHtml;
}

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", searchPost);
