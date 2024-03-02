//Book list class
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}
//Ui class
class UI {
    static displayBooks() {
        const books = store.getBooks()
        Books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr')
        row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row)
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form)
        //remove in 2 sec
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000
        )
    }
    static clearFields() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }

    }
}
class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') == null) {
            books = [];

        }
        else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBooks(book) {
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringyfy(books));
    }
    static removeBooks(isbn) {
        const books = store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn == isbn) {
                books.splice(index, 1);
            }
        }
        )
        localStorage, setItem('books', JSON.stringify(books))
    }

}
//event:display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)
//event Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //validtae
    if (title == '' || author == '' || isbn == '') {
        UI.showAlert('Please fill all required  details', 'danger')
    }
    else {
        UI.showAlert('Your Book is Successfully  Added', 'success')
    }
    {
        //intiatate book
        const book = new Book(title, author, isbn)
        // console.log(book)
        UI.addBookToList(book)
        //add book to store
        store.addBook(book);
        //clear fields
        UI.clearFields();
    }

})

document.querySelector('#book-list').addEventListener('click', (e) => {
    e.preventDefault()
    //remove book from ui
    UI.deleteBook(e.target)
    //remove book from store
    store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('Book is removed', 'success')
})