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
    id: Date.now(),
    name: name,
    post: post,
    tags: tags,
    date: new Date().toDateString()
  }

  localPosts.push(postObj);

  localStorage.setItem('posts', JSON.stringify(localPosts));
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
      } else {
        $('label').eq(required.indexOf(element)).removeClass('text-danger');
      }
    });

    if (!$('label').hasClass('text-danger')) {
      addPost(name.val(), post.val(), tags.val());
      charCount.textContent = `50 characters remaining`;
      form.reset();
    }
  });

  textarea.on('input', () => {
    const remainingChars = textarea.attr('maxlength') - textarea.val().length;
    charCount.textContent = `${remainingChars} characters remaining`;
  });
});

initializeCart();
