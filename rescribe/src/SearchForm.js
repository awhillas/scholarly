import React from 'react';

class SearchForm extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      value: 'search for something',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSearch(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button className="square" onClick={() => this.props.search}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm