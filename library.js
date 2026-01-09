function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID()
  this.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.id;
  };
}

let myLibrary = [];

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310);
const book2 = new Book("1984", "George Orwell", 328);
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", 281);
const book4 = new Book("Pride and Prejudice", "Jane Austen", 279);
const book5 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180);

myLibrary.push(book1, book2, book3, book4, book5);

function addBookToLibrary(title, author, pages, id) {
    const book = new Book(title, author, pages, id);
    myLibrary.push(book);
  return ;
}

function displayBooks() {
  const bookList = document.getElementById("book-list");

  myLibrary.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerText = book.info();
    bookList.appendChild(bookItem);
  });
}

// Initial display of books
document.addEventListener("DOMContentLoaded", displayBooks);





