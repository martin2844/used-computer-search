import axios from 'axios';
import Link from 'next/link'

export default function Index(props) {

  const termMap = props.foo.map((term) => {
      let urlTerm = term.replace(/ /g, "-");
      return (
          <li key={term}>
             <Link href={`/queries/${urlTerm}`} >
                 <a>{term}</a>
             </Link>
          </li>
      )
  })

  return (
      <section className="main column">
        <h1>Personal Meli Used Computer Search</h1>
        <div className="features">
            <div>
              Check only used computers
            </div>
            <div>
              Create, save queries and access them super fast
            </div>
            <div>
              Check daily differences, be the first to know when a new item is posted
            </div>
            <div>
              Receive daily differences via mail at 9am
            </div>
        </div>
        <h3>Saved Queries:</h3>
        <ul className="query-map">
           {termMap}
        </ul>
      
      </section>
  )
}



export async function getServerSideProps() {
  const data = await axios.get("http://localhost:5001/api/data/terms");
  let terms = data.data;
  return {
    props: {
        foo: terms
    }, // will be passed to the page component as props
  }
}
