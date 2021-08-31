import React from 'react';

import './papers.css'

class PapersGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1000,
      height: 250
    }
    this.svgRef = React.createRef();
  }
  years() {
    if (this.props.papers) {
      return Array.from(new Set(this.props.papers.map(p => p.year))).sort()
    }
    return []    
  }

  render() {
    return (
      <svg width={this.state.width} height={this.state.height} ref={this.svgRef}>
        <Axies 
          years={this.years()} 
          width={this.state.width}
          height={this.state.height} 
        />
      </svg>
    )
  }
}

class Axies extends React.Component {
  axis() {
    if (this.props.years.length) {
      let years = this.props.years
      let earilest = Math.min(...years) - 1
      let range = Math.max(...years) - earilest + 1
      console.log(years, earilest, range);
      return [...Array(range).keys()].map(i => i + earilest)
    }
    return []
  }

  render() {
    console.log(this.props.svg);
    let years = this.axis()
    let width = this.props.width
    let height = this.props.height

    let lines = years.map((year, i) => (
      <g>
        <line 
          x1={(i+1) * width / years.length} y1="0" 
          x2={(i+1) * width / years.length} y2={height}
          className="yearMarker" key={year+"line"} />
        <text
          x={(i+1) * width / years.length}
          y="15"
          transform={`rotate(90,${(i+1) * width / years.length},0)`}
          key={year+"text"}
        >{year}</text>
      </g>
    ))

    if (lines)
      return (<g>{lines}</g>)
    else
      return null
  }
}


function PapersList(props) {
  const papers = props.papers;
  const listItems = papers
    .sort((a,b) => parseInt(a.citations) - parseInt(b.citations))
    .reverse()
    .map((paper) =>
      <tr key={paper.gid}>
        <td>{paper.citations}</td>
        <td>{paper.year}</td>
        <td>
          <a href={paper.paper_link}>
            {paper.title.replace(/\[PDF\]/g,'').replace(/\[HTML\]/g,'')}
          </a>
        </td>
      </tr>
  );
  return (
    <table><tbody>{listItems}</tbody></table>
  );
}

export default function PapersSummary({papers}) {
  // console.log(papers)
  if (!papers) {
    return null;
  }  
  return (
    <div>
      <PapersGraph papers={papers} />
      <PapersList papers={papers} />
    </div>
  )
}