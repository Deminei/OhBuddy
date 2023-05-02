const submitButton = document.querySelector('#submit');
const form = document.querySelector('#form');
const textarea = $('#message-area');

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
    id: localPosts.length ? localPosts.length + 1 : 1,
    name: name,
    post: post,
    tags: tags,
    date: new Date().toDateString()
  }

  localPosts.push(postObj);

  localStorage.setItem('posts', JSON.stringify(localPosts));
}

// let deletePost = (id) => {

// }

// submitButton.addEventListener('click', event => {
//   event.preventDefault();
//   let name = document.querySelector('#name').value;
//   let post = document.querySelector('#message-area').value;
//   let tags = document.querySelector('#tags').value;

//   if (name === '' || post === '' || tags === '') {

//   }

//   addPost(name, post, tags);
//   form.reset();
// });

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
      } else {
        $('label').eq(required.indexOf(element)).removeClass('text-danger');
      }
    });

    if (!$('label').hasClass('text-danger')) {
      addPost(name.val(), post.val(), tags.val());
      const remainingChars = textarea.attr('maxlength') - textarea.val().length;
      charCount.textContent = `100 characters remaining`;
      form.reset();
    }
  });

  textarea.on('input', () => {
    const remainingChars = textarea.attr('maxlength') - textarea.val().length;
    charCount.textContent = `${remainingChars} characters remaining`;
  });
});

initializeCart();

// console.log(new Date().toDateString());

// addPost('Stephen', 'Here is a new post', ['food', 'newbie']);
// addPost('Mikal', 'My post', ['gamer', 'android']);