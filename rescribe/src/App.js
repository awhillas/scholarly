// import logo from './logo.svg';
// import './App.css';
import SearchForm from './SearchForm.js'
import PapersGraph from './PapersGraph.js'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,      
      papers: [],
    };
    this.handleSeach = this.handleSeach.bind(this);
  }

  handleSeach(query) {
    console.log("looking for:", query)
    
    this.setState({ isLoaded: false })

    fetch('http://localhost:8000/search?' + new URLSearchParams({ q: query }))
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            papers: result.results
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )    
  }

  render() {
    const { error, isLoaded, papers } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Scholarly</h1>
            <SearchForm handleSearch={this.handleSeach} />
          </header>
          
          <PapersGraph papers={papers} />
          
        </div>
      );
    }
  }
}

export default App;
