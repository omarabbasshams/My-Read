
import React,  { Component } from "react";
import Book from "./book";
class Bookshelf extends Component{
    render(){
      const{books,OnMove}=this.props;
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  books.map((book)=>(
                    
                      <Book
                      OnMove={OnMove}
                      key={`${book.id}`}
                      book={book}
                      />
                   
                  ))
                }
               
              </ol>
            </div>
          </div>
        )
    }
}
export default Bookshelf;