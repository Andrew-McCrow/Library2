// Book class definition
class Book {
  constructor(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleRead() {
    this.read = !this.read;
  }

  getInfo() {
    return `${this.title} by ${this.author}, ${this.id}`;
  }
}


// library array to hold Book objects
let myLibrary = [];

// Sample books
const book1 = new Book("The Hobbit", "J.R.R. Tolkien");
const book2 = new Book("1984", "George Orwell");
const book3 = new Book("To Kill a Mockingbird", "Harper Lee");
const book4 = new Book("Pride and Prejudice", "Jane Austen");
const book5 = new Book("The Great Gatsby", "F. Scott Fitzgerald");

// Adding sample books to the library
myLibrary.push(book1, book2, book3, book4, book5);

// Function to add a new book to the library
function addBookToLibrary(title, author) {
    const book = new Book(title, author);
    myLibrary.push(book);
  return book;
}

// From validation function - check tile and author are not empty in "New Book" form
function validateFrom() {
    const title = document.getElementById("book-title");
    const author = document.getElementById("book-author");

    // Validate on input
    title.addEventListener("input", () => {
        if (title.value.trim() === "") {
            title.setCustomValidity("Title cannot be empty.");
        } else {
            title.setCustomValidity("");
        }
        title.reportValidity();
    });

    author.addEventListener("input", () => {
        if (author.value.trim() === "") {
            author.setCustomValidity("Author cannot be empty.");
        } else {
            author.setCustomValidity("");
        }
        author.reportValidity();
    });
}

// Function to display books in the library
function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // 👈 Clear Old Books before addign new list

  myLibrary.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";

    // Title (bold, top)
    const title = document.createElement("strong");
    title.textContent = book.title;

    // Author (new line)
    const author = document.createElement("div");
    author.textContent = `by ${book.author}`;

    // ID (last line)
    const id = document.createElement("small");
    id.textContent = `ID: ${book.id}`;

    // Add remove button to book item
    const bookRemoveButton = document.createElement("button"); 
    bookRemoveButton.textContent = "Remove";
    bookRemoveButton.className = "remove-button";
    bookRemoveButton.addEventListener("click", () => {
      myLibrary = myLibrary.filter((b) => b.id !== book.id);
      displayBooks();
    });

    // radio button to change read status
    const readToggleWrapper = document.createElement("label");
    readToggleWrapper.className = "read-status-toggle";

    const readToggleInput = document.createElement("input");
    readToggleInput.type = "radio";
    readToggleInput.name = `read-status-${book.id}`;
    readToggleInput.checked = book.read;
    readToggleInput.setAttribute("aria-label", "Read status");

    const readToggleText = document.createElement("small");
    readToggleText.textContent = book.read ? "Read" : "Not Read";

    readToggleInput.addEventListener("click", (event) => {
      event.preventDefault();
      book.toggleRead();
      readToggleInput.checked = book.read;
      readToggleText.textContent = book.read ? "Read" : "Not Read";
    });

    readToggleWrapper.appendChild(readToggleInput);
    readToggleWrapper.appendChild(readToggleText);
    
    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(id);
    bookItem.appendChild(readToggleWrapper);
    bookItem.appendChild(bookRemoveButton);   

    bookList.appendChild(bookItem);
  });
}

// Initial display of books
document.addEventListener("DOMContentLoaded", () => {
    displayBooks();
    validateFrom();
});

// Modal and form handling
const modal = document.getElementById("new-book-modal");
const form = document.getElementById("new-book-form");
const cancelButton = document.getElementById("cancel-button");
const newBookButton = document.getElementById("new-book-button");

//
function resetForm() {
    form.reset();
}

// Opening and closing the modal
newBookButton.addEventListener("click", () => {
    modal.showModal();
});
// cancel button functionality
cancelButton.addEventListener("click", () => {
    modal.close();
    resetForm();
});

// Adding a new book to library on form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Check if form is valid
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    addBookToLibrary(title, author);
    displayBooks()
    modal.close();
    resetForm();
});
