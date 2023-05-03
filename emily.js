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

function deletePostById(posts, id) {
  // use findIndex to find the index of the post with id that we are trying to target. I had to wrap the id in Number because it was being passed as a string from id attribute in the card class
  const index = posts.findIndex(post => post.id === Number(id));

  // if the id is found, update the post array, set it in local storage, and remove the item with the id
  if (index !== -1) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.removeItem(id);
  }
}

const input = document.querySelector(".search-input");

function searchPost() {
  const posts = JSON.parse(localStorage.getItem("posts"));
  const searchInput = document
    .querySelector(".search-input")
    .value.toLowerCase();

  let postsObjects = posts.filter(post => post.tags.includes(searchInput));

  let postHtml = "";
  let div = document.querySelector("#posts-container");
  div.textContent = "";
  postsObjects.forEach((post) => {
    postHtml += generatePostHtml(post);
  });
  div.insertAdjacentHTML('beforeend', postHtml);

  // Update delete and update buttons for the filtered posts
  const deletePostButtons = document.querySelectorAll(".delete-btn");
  deletePostButtons.forEach(function (button, index) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      // get the post element that contains the delete button
      const post = button.parentElement.parentElement.parentElement;

      // get the id of that parent class to use to delete. The id is the same as the id in the post object
      const postId = post.id

      // remove the post element from the DOM
      post.remove();
      deletePostById(posts, postId)
    });
  });

  const updateButtons = document.querySelectorAll(".update-btn");
  updateButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      // get the post ID from the data attribute
      // const postId = button.getAttribute('data-post-id');
      const post = button.parentElement.parentElement.parentElement;

      const postId = post.id;

      // get the post element for the current button
      const postElement = button.closest('.card');

      // get the post title, subtitle, and content elements
      const titleElement = postElement.querySelector('.card-title');
      const subtitleElement = postElement.querySelector('.card-subtitle');
      const contentElement = postElement.querySelector('.card-text');
      const tagsElement = postElement.querySelector('.tags');

      // get the current title, subtitle, and content values
      const currentTitle = titleElement.textContent;
      const currentSubtitle = subtitleElement.textContent;
      const currentContent = contentElement.textContent;
      const currentTags = tagsElement.textContent;

      // create a form element to allow the user to edit the post
      const form = document.createElement('form');
      form.classList.add('update-form');

      // create input fields for the title, subtitle, and content
      const titleInput = document.createElement('input');
      titleInput.setAttribute('type', 'text');
      titleInput.setAttribute('placeholder', 'Title');
      titleInput.setAttribute('value', currentTitle);
      titleInput.classList.add('form-control');
      form.appendChild(titleInput);

      const subtitleInput = document.createElement('input');
      subtitleInput.setAttribute('type', 'text');
      subtitleInput.setAttribute('placeholder', 'Subtitle');
      subtitleInput.setAttribute('value', currentSubtitle);
      subtitleInput.classList.add('form-control');
      form.appendChild(subtitleInput);

      const contentInput = document.createElement('textarea');
      contentInput.setAttribute('placeholder', 'Content');
      contentInput.textContent = currentContent;
      contentInput.classList.add('form-control');
      form.appendChild(contentInput);

      const tagsInput = document.createElement('input');
      tagsInput.setAttribute('type', 'text');
      tagsInput.setAttribute('placeholder', 'Tags');
      tagsInput.setAttribute('value', currentTags);
      tagsInput.classList.add('form-control');
      form.appendChild(tagsInput);

      // create a save button to allow the user to save their changes
      const saveButton = document.createElement('button');
      saveButton.setAttribute('type', 'button');
      saveButton.textContent = 'Save';
      saveButton.classList.add('btn', 'btn-primary');

      // insert the save button after the postElement
      postElement.appendChild(saveButton);

      // replace the post title, subtitle, and content with the form
      titleElement.replaceWith(form);
      subtitleElement.replaceWith(subtitleInput);
      contentElement.replaceWith(contentInput);
      tagsElement.replaceWith(tagsInput);

      // add an event listener to the save button
      saveButton.addEventListener('click', () => {
        // get the new title, subtitle, and content values
        const newTitle = titleInput.value;
        const newSubtitle = subtitleInput.value;
        const newContent = contentInput.value;
        const newTags = tagsInput.value;

        // update the post title, subtitle, and content elements with the new values
        titleElement.textContent = newTitle;
        subtitleInput.replaceWith(subtitleElement);
        subtitleElement.textContent = newSubtitle;
        contentInput.replaceWith(contentElement);
        contentElement.textContent = newContent;
        tagsInput.replaceWith(tagsElement);
        tagsElement.textContent = newTags;

        // update the post object in local storage with the new values
        let posts = JSON.parse(localStorage.getItem('posts'));
        const postIndex = posts.findIndex((post) => post.id === Number(postId));

        if (postIndex !== -1) {
          posts[postIndex].name = newTitle;
          // posts[postIndex].subtitle = newSubtitle;
          posts[postIndex].post = newContent;
          posts[postIndex].tags = newTags;
          localStorage.setItem('posts', JSON.stringify(posts));
        }

        // remove the event listener from the save button
        saveButton.removeEventListener('click', () => { });

        // remove the save button from the DOM
        saveButton.remove();

        // replace the form with the updated post title, subtitle, and content
        form.replaceWith(titleElement);
      });
    });
  });
}



// const searchBtn = document.querySelector(".search-btn");
input.addEventListener("input", event => {
  event.preventDefault();
  searchPost();
});