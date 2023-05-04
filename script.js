const deletePostButtons = document.querySelectorAll('.delete-btn');
const posts = JSON.parse(localStorage.getItem('posts'));
const submitButton = document.querySelector('#submit');
const form = document.querySelector('#form');
const textarea = $('#message-area');
const input = document.querySelector(".search-input");
const container = document.querySelector('#posts-container');

function initializeCart() {
  let posts = JSON.parse(localStorage.getItem('posts'));
  if (!posts) {
    posts = [];
    localStorage.setItem('posts', JSON.stringify(posts));
  }
}

let addPost = (name, post, tags) => {
  let localPosts = JSON.parse(localStorage.getItem('posts'));

  let postObj = {
    id: Date.now(),
    name: name,
    post: post,
    tags: tags,
    date: new Date().toDateString()
  }

  localPosts.push(postObj);

  localStorage.setItem('posts', JSON.stringify(localPosts));

  container.insertAdjacentHTML('beforeend', generatePostHtml(postObj));

  setUpUpdateButtons();

  addDeleteEventListener();
}


function generatePostHtml(post) {
  let tagsHtml = post.tags[0] === ' ' ? post.tags[0] : '#' + post.tags[0];

  for (let i = 1; i < post.tags.length; i++) {
    if (post.tags[i - 1] === ' ' && post.tags[i] !== ' ') {
      tagsHtml += '#';
    }

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
      </div>
    `;
}

function displayPosts() {
  let localPosts = JSON.parse(localStorage.getItem('posts')) || [];

  localPosts.forEach(post => {
    let postHtml = generatePostHtml(post);
    container.insertAdjacentHTML('beforeend', postHtml);
  });
}

function displayFilteredPosts(postsObjects) {
  let postHtml = "";
  let div = document.querySelector("#posts-container");
  div.textContent = "";
  postsObjects.forEach((post) => {
    postHtml += generatePostHtml(post);
  });
  div.insertAdjacentHTML('beforeend', postHtml);
}



function setUpUpdateButtons() {
  const updateButtons = document.querySelectorAll('.update-btn');

  updateButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const post = button.parentElement.parentElement.parentElement;
      const postId = post.id;

      const postElement = button.closest('.card');
      const titleElement = postElement.querySelector('.card-title');
      const subtitleElement = postElement.querySelector('.card-subtitle');
      const contentElement = postElement.querySelector('.card-text');
      const tagsElement = postElement.querySelector('.tags');

      const currentTitle = titleElement.textContent;
      const currentSubtitle = subtitleElement.textContent;
      const currentContent = contentElement.textContent;
      const currentTags = tagsElement.textContent;

      const form = document.createElement('form');
      form.classList.add('update-form');

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

      const saveButton = document.createElement('button');
      saveButton.setAttribute('type', 'button');
      saveButton.textContent = 'Save';
      saveButton.classList.add('btn', 'btn-primary');

      postElement.appendChild(saveButton);

      titleElement.replaceWith(form);
      subtitleElement.replaceWith(subtitleInput);
      contentElement.replaceWith(contentInput);
      tagsElement.replaceWith(tagsInput);

      saveButton.addEventListener('click', () => {
        const newTitle = titleInput.value;
        const newSubtitle = subtitleInput.value;
        const newContent = contentInput.value;
        const newTags = tagsInput.value;

        titleElement.textContent = newTitle;
        subtitleInput.replaceWith(subtitleElement);
        subtitleElement.textContent = newSubtitle;
        contentInput.replaceWith(contentElement);
        contentElement.textContent = newContent;
        tagsInput.replaceWith(tagsElement);
        tagsElement.textContent = newTags;

        let posts = JSON.parse(localStorage.getItem('posts'));
        const postIndex = posts.findIndex((post) => post.id === Number(postId));

        if (postIndex !== -1) {
          posts[postIndex].name = newTitle;
          posts[postIndex].post = newContent;
          posts[postIndex].tags = newTags;
          localStorage.setItem('posts', JSON.stringify(posts));
        }

        saveButton.removeEventListener('click', () => { });

        saveButton.remove();

        form.replaceWith(titleElement);
      });
    });
  });
}

function addDeleteEventListener() {
  const deletePostButtons = document.querySelectorAll('.delete-btn');
  const localPosts = JSON.parse(localStorage.getItem('posts'));

  deletePostButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const post = button.parentElement.parentElement.parentElement;

      const postId = post.id

      post.remove();
      deletePostById(localPosts, postId)
    });
  });
}

function deletePostById(posts, id) {
  console.log(id);
  const index = posts.findIndex(post => post.id === Number(id));
  console.log(index);

  if (index !== -1) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    // localStorage.removeItem(id);
  }
}

function searchPost() {
  const searchPosts = JSON.parse(localStorage.getItem("posts"));
  const searchInput = document
    .querySelector(".search-input")
    .value.toLowerCase();

  let postsObjects = searchPosts.filter(post => post.tags.includes(searchInput));

  displayFilteredPosts(postsObjects)


  addDeleteEventListener();

  setUpUpdateButtons();
}

$(document).ready(() => {
  $('#submit').click((event) => {
    event.preventDefault();
    const name = $('#name');
    const post = $('#message-area');
    const tags = $('#tags');
    const required = [name, post, tags];

    required.forEach(element => {
      if (element.val() === "") {
        $('#error-message').html('Please Fill Out Required Fields').addClass('text-danger');
        $('label').eq(required.indexOf(element)).addClass('text-danger');
        element.addClass('border');
        element.addClass('border-danger');
      } else {
        $('label').eq(required.indexOf(element)).removeClass('text-danger');
        element.removeClass('border');
        element.removeClass('border-danger');
      }
    });

    if (!$('label').hasClass('text-danger') && !$('label').hasClass('border-danger')) {
      addPost(name.val(), post.val(), tags.val());
      charCount.textContent = `200 characters remaining`;
      $('#error-message').html('');
      form.reset();
    }
  });

  textarea.on('input', () => {
    const remainingChars = textarea.attr('maxlength') - textarea.val().length;
    charCount.textContent = `${remainingChars} characters remaining`;
  });
});


input.addEventListener("input", event => {
  event.preventDefault();
  searchPost();
});

initializeCart();

displayPosts();

addDeleteEventListener();

setUpUpdateButtons();
