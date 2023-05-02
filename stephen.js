const submitButton = document.querySelector('#submit');
const form = document.querySelector('#form');
let nextId = 1;

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
    id: nextId,
    name: name,
    post: post,
    tags: tags,
    date: new Date().toDateString()
  }

  localPosts.push(postObj);

  localStorage.setItem('posts', JSON.stringify(localPosts));

  nextId++;
}

submitButton.addEventListener('click', event => {
  event.preventDefault();
  let name = document.querySelector('#name').value;
  let post = document.querySelector('#message-area').value;
  let tags = document.querySelector('#tags').value;

  addPost(name, post, tags);
  form.reset();
});

// console.log(new Date().toDateString());

// addPost('Stephen', 'Here is a new post', ['food', 'newbie']);
// addPost('Mikal', 'My post', ['gamer', 'android']);