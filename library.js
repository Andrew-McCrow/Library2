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

function addBookToLibrary(title, author, pages, id) {
    const book = new Book(title, author, pages, id);
    myLibrary.push(book);
  return ;
}

