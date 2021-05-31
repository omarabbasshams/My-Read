import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";
import Searchbar from "./Searchbar";
import NoMatch from "./NoMatch";
class BooksApp extends React.Component {
  state = {
    books: [],
    omar: "",
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }));
  }
  movebooks = (book, shelf) => {
    let books = this.state.books.map((b) => {
      if (b.id === book.id) {
        b.shelf = shelf;
      }
      return b;
    });

    this.setState({ books });
    BooksAPI.update(book, shelf);
  };

  render() {
    return (
      // <div />
      <div className="app">
        <Switch>
          <Route
            exact
            path="/search"
            render={() => (
              <Searchbar
                OnMove={this.movebooks}
                booksforshelf={this.state.books}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Bookshelf
                      key="Currently Reading"
                      OnMove={this.movebooks}
                      books={this.state.books.filter(
                        (book) => book.shelf === "currentlyReading"
                      )}
                      shelf="Currently Reading"
                    />
                    <Bookshelf
                      key="Want To Read"
                      OnMove={this.movebooks}
                      books={this.state.books.filter(
                        (book) => book.shelf === "wantToRead"
                      )}
                      shelf="Want To Read"
                    />
                    <Bookshelf
                      key="Read"
                      OnMove={this.movebooks}
                      books={this.state.books.filter(
                        (book) => book.shelf === "read"
                      )}
                      shelf="Read"
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            )}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
