// SEARCH FUNCTIONALITY

// function searchPosts() {
//   // event.preventDefault();

//   let keyword = document.getElementsByClassName(".search-input")[0].value;
//   let taggedPosts = JSON.parse(localStorage.getItem("posts"));

//   if (keyword && keyword.length > 0) {
//     keyword = keyword.toLowerCase();
//     let post = taggedPosts.filter(
//       (taggedPost) => taggedPost.tags === keyword
//     );
// console.log(post)
//     return post;
//   } else {
//     alert("No results found. Try another tag!");
//   }
// }

// let searchButton = document.getElementsByClassName("search-btn")[0];
// searchButton.addEventListener("click", searchPosts);


function searchPost() {
  const posts =JSON.parse(localStorage.getItem("posts"));
  console.log(posts);
}

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", searchPost)