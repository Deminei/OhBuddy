//function to generate the HTML for a post, including adding '#' before each tag
function generatePostHtml(post) {
  //initialize's the tagsHtml variable with a '#' before the first character
  // if it is not a whitespace character
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

  //returns the HTML template for the post, including the formatted tagsHtml
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
      </div>
    `;
}

  let postHtml = generatePostHtml(post);
  container.insertAdjacentHTML("beforeend", postHtml);
});
