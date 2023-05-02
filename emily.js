// SEARCH FUNCTIONALITY

//Elements
const searchInput = document.getElementsByClassName("search-input");
const clearBtn = document.getElementsByClassName("clear-btn"); 
// const list = document.getElementById("search-results");

// check: if input exists and if input is larger than 0
//redefine 'value' to exclude white space and change input to all lowercase
//return the results only if the value of the search is included
//(a function for filtering through our data to include the search input value)
//returning only the results of setList if the value of the search is included
searchInput[0].addEventListener("click", (e) => {
  let value = e.target.value;
  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
    setList(
      localPosts.filter((post) => {
        return post.name.includes(value);
      })
    );
  } else {
    clearList();
  }
});

clearBtn[0].addEventListener("click", () => {
  clearList();
});

// creating a li element for each result item
function setList(results) {
  clearList();
  for (const localPost of results) {
    const resultItem = document.createElement("li");
    resultItem.classList.add("result-item");
    const text = document.createTextNode(localPost.name); 
    resultItem.appendChild(text);
    list.appendChild(resultItem);
  }
  if (results.length === 0) {
    noResults();
  }
}

// looping through each child of the search results list and remove each child
function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

// create an element for the error; a list item ("li")
// adding a class name of "error-message" to our error element
// creating text for our element
// appending the text to our element
// appending the error to our list element
function noResults() {
  const error = document.createElement("li");
  error.classList.add("error-message");
  const text = document.createTextNode("No results found. Sorry!");
  error.appendChild(text);
  list.appendChild(error);
}
