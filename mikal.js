// setting up local storage
let postManager = (function () {
    let posts = [];

    function addPost(post) {
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts)); //stores post in localStorage
        displayPosts(); //call to update the list when a new post is added
    }

    function displayPosts() {
        let postList = document.getElementById("postList"); //gets the ??? element
        postList.innerHTML = ""; //clear the existing list

        for (let i = 0; i < posts.length; i++) {
            let postItem = document.createElement("???"); //creates a new ??? element
            postItem.textContent = tasks[i]; //sets the text content to the task
            postItem.addEventListener("click", function () { //click event listener to remove task when clicked
                tasks.splice(i, 1); //removes the post from the posts array
                displayTasks(); //call to update the list after task is removed
                localStorage.setItem('posts', JSON.stringify(posts)); //stores updated posts array in local storage

            });
            postList.appendChild(postItem); //appends the list item to the unordered list
            console.log(postItem.textContent);
        }
    }

    //loads posts from local storage if available
    let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = storedPosts;
    displayPosts(); //displays posts from local storage

    return {
        addPost: addPost,
        displayPosts: displayPosts
    };
})();
