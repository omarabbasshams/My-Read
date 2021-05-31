import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Book from "./book";

class Searchbar extends Component {
  state = {
    books: [],
    condition: "",
  };
  searchbook = (e) => {
    const query = e.target.value;
    if (query) {
      search(query).then((books) => {
        if (books.error === "empty query") {
          this.setState({ condition: false });
        } else {
          const shelfbook = books.map((b) => {
            for (let x in this.props.booksforshelf) {
              if (b.id === this.props.booksforshelf[x].id) {
                b.shelf = this.props.booksforshelf[x].shelf;
              }
            }
            return b;
          });

          this.setState({ books: shelfbook, condition: true });
        }
      });
    } else {
      this.setState({ books: "", condition: false });
    }
  };

  render() {
    const { OnMove } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.searchbook(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.condition &&
              this.state.books.map((book) => (
                <Book OnMove={OnMove} book={book} key={`${book.id}`} />
              ))}
            {!this.state.condition && <h1>Not Found</h1>}
          </ol>
        </div>
      </div>
    );
  }
}
export default Searchbar;
