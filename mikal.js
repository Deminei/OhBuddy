// Retrieve data from local storage
const data = JSON.parse(localStorage.getItem('myData'));

// Loop through the data and create a new card element for each object
data.forEach((item) => {
  // Create a new card element
  const card = document.createElement('div');
  card.classList.add('card', 'right');
  card.style.width = '18rem';

  // Set the inner HTML of the card element
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item.subtitle}</h6>
      <p class="card-text">${item.content}</p>
      <label for="">Tags</label>
      <span class="tags">${item.tags.join(', ')}</span>
      <a href="#" class="card-link">Update</a>
      <a href="#" class="card-link">Delete</a>
    </div>
  `;

  // Append the card element to the post list
  document.querySelector('.post-list').appendChild(card);
});