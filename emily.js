// SEARCH FUNCTIONALITY

function searchPosts(event) {
  event.preventDefault();

  let keyword = document.getElementsByClassName("search-input").value;
  let current_posts = JSON.parse(localStorage.getItem("post"));

  if (keyword && keyword.length > 0) {
    keyword = keyword.toLowerCase();
    let post = current_posts.filter((current_post) => current_post.tags === keyword);
    return post;
  } 
  else {
    alert("No results found. Try another tag!");
  }
}


let searchButton = document.getElementsByClassName("clear-btn")[0];
searchButton.addEventListener("click", searchPosts);
