// // SEARCH FUNCTIONALITY


function searchPosts() {
  let keyWord = document.getElementsByClassName("search-input").value;
  console.log(keyWord);

  current_posts = JSON.parse(localStorage.getItem("post"));

  if (keyWord && keyWord.length > 0) {
    keyWord = keyWord.toLowerCase();
    let post = current_posts.filter(
      (current_post) => current_post.tags === keyWord
    );
    console.log(post);
    return post;
  } else {
    alert("No results found. Try another tag!");
  }
}

let searchButton = document.getElementsByClassName("clear-btn")[0];
searchButton.addEventListener("click", searchPosts);
