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
    <table>{listItems}</table>
  );
}



export default function PapersGraph({papers}) {
  // console.log(papers)
  if (!papers) {
    return null;
  }  
  return (
    <PapersList papers={papers} />
  )
}