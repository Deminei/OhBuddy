// get the update button elements
const updateButtons = document.querySelectorAll('.update-btn');

// loop through all update buttons and add an event listener for the click event
updateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // get the post ID from the data attribute
    const postId = button.getAttribute('data-post-id');

    // get the post element for the current button
    const postElement = button.closest('.card');

    // get the post title and content elements
    const titleElement = postElement.querySelector('.card-title');
    const contentElement = postElement.querySelector('.card-text');

    // get the current title and content values
    const currentTitle = titleElement.textContent;
    const currentContent = contentElement.textContent;

    // create a form element to allow the user to edit the post
    const form = document.createElement('form');
    form.classList.add('update-form');

    // create input fields for the title and content
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Title');
    titleInput.setAttribute('value', currentTitle);
    titleInput.classList.add('form-control');
    form.appendChild(titleInput);

    const contentInput = document.createElement('textarea');
    contentInput.setAttribute('placeholder', 'Content');
    contentInput.textContent = currentContent;
    contentInput.classList.add('form-control');
    form.appendChild(contentInput);

    // replace the post title and content with the form
    titleElement.replaceWith(form);
    contentElement.replaceWith(contentInput);

    // create a save button to allow the user to save their changes
    const saveButton = document.createElement('button');
    saveButton.setAttribute('type', 'button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('btn', 'btn-primary');
    form.appendChild(saveButton);

    // add an event listener to the save button
    saveButton.addEventListener('click', () => {
      // get the new title and content values
      const newTitle = titleInput.value;
      const newContent = contentInput.value;

      // update the post title and content elements with the new values
      titleElement.textContent = newTitle;
      contentInput.replaceWith(contentElement);
      contentElement.textContent = newContent;

      // update the post object in local storage with the new values
      let posts = JSON.parse(localStorage.getItem('posts'));
      const postIndex = posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        posts[postIndex].title = newTitle;
        posts[postIndex].content = newContent;
        localStorage.setItem('posts', JSON.stringify(posts));
      }

      // replace the form with the updated post title and content
      form.replaceWith(titleElement);
    });
  });
});

