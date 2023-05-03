// get the update button elements
const updateButtons = document.querySelectorAll('.update-btn');

// loop through all update buttons and add an event listener for the click event
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
