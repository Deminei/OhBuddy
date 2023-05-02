// SEARCH FUNCTIONALITY

//Elements
const searchInput = document.getElementsByClassName("search-input");
// const searchBtn = document.getElementsByClassName("search");
const clearBtn = document.getElementsByClassName("clear-btn"); //MAKE ONE

searchInput.addEventListener("input", (e) => {
  let value = e.target.value;

  // check: if input exists and if input is larger than 0
  if (value && value.trim().length > 0) {
    //redefine 'value' to exclude white space and change input to all lowercase
    value = value.trim().toLowerCase();
    //return the results only if the value of the search is included
    //(a function for filtering through our data to include the search input value)
    //returning only the results of setList if the value of the search is included
    setList(
      people.filter((person) => {
        return post.name.includes(value);
      })
    );
  } else {
    clearList();
  }
});

clearBtn.addEventListener("clear", () => {
  clearList();
});

function setList(results) {
  clearList();
  for (const post of results) {
    // creating a li element for each result item
    const resultItem = document.createElement("li");
    resultItem.classList.add("result-item");
    const text = document.createTextNode(post.name);
    resultItem.appendChild(text);
    list.appendChild(resultItem);
  }
  if (results.length === 0) {
    noResults();
  }
}

function clearList() {
  // looping through each child of the search results list and remove each child
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function noResults() {
  // create an element for the error; a list item ("li")
  const error = document.createElement("li");
  // adding a class name of "error-message" to our error element
  error.classList.add("error-message");

  // creating text for our element
  const text = document.createTextNode("No results found. Sorry!");
  // appending the text to our element
  error.appendChild(text);
  // appending the error to our list element
  list.appendChild(error);
}
