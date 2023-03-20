import React, { useEffect, useState } from 'react';
import './style.css';

/* TO-TO:
  - lägg till sökruta med knapp. Sökningen skall ta alla ord och göra till en queary sedan kalla på Fetch API - eventuellt med await. 
  - Dölj och visa resultat tabell / bok-information - dölj och visa element från Workshop 3. 
 */

function ResultTable(props) {
  return (
    <React.Fragment>
      {props.data.map((book, index) => {
        return (
          <tr key={index} onClick={() => props.displayBook(index)}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.author_name[0]}</td>
            <td>{book.first_publish_year}</td>
          </tr>
        );
      })}
    </React.Fragment>
  );
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState([' hej']);
  const [activeBook, setActiveBook] = useState(null);
  const query = 'Harry';
  const uri = `https://openlibrary.org/search.json?title=${query}`;

  console.log(uri);

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then((data) => setBooks(data.docs.slice(0, 30))); // Innehåller alla
  }, []);

  function displayBook(index) {
    console.log('index i displaybookfunction: ' + index);
    setActiveBook(books[index]);
  }
  /* samtliga författare, titel, samtliga förlag (attributet publisher), samtliga språk (attributet language), samtliga ämnen (attributet subject). Observera att resultattabellen på denna betygsnivå inte behöver döljas då detaljer om den enskilda boken visas. */

  function BookDetails(props) {
    if (!props.book) {
      return <div className="no-book">no book selected</div>;
    } else
      return (
        <div>
          <div>Name: {props.book.title}</div>
          <div>Author:{props.book.author_name.join(' & ')}</div>
          {/*     <div>Author alternative name:{props.book.author_alternative_name.join(' & ')}</div> */}
          <div>
            Publishers:
            {props.book.publisher.map((publisher) => {
              return <li>{publisher}</li>;
            })}
          </div>
          <div>
            Available Languages:{' '}
            {props.book.language
              ? props.book.language.join(', ')
              : 'none available'}
          </div>
          <div>
            Subjects :{' '}
            {props.book.subject
              ? props.book.subject.join(', ')
              : 'none available'}
          </div>
          {/*    <img src={`https://www.cryptocompare.com/${this.state.cryImage}`} /> */}
          <div>
            Image:{' '}
            {props.book.isbn ? (
              <img
                src={`https://covers.openlibrary.org/b/isbn/${props.book.isbn[0]}-M.jpg`}
                alt="Girl in a jacket"
              />
            ) : (
              'no image'
            )}
          </div>
          {/* {console.log(
            `https://covers.openlibrary.org/b/isbn/${props.book.isbn[0]}-M.jpg`
          )} */}
        </div>
      );
  }
  //console.log(books.docs);
  return (
    <div>
      <h1>Book search!</h1>
      <p>See books below</p>
      <BookDetails book={activeBook} />
      <table>
        <tr>
          <th>Item </th>
          <th>Title </th>
          <th>Author</th>
          <th>First Publish Year</th>
        </tr>
        <ResultTable data={books} displayBook={displayBook} />
      </table>
    </div>
  );
}
