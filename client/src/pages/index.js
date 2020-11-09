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
      <div>
        <h1>Checkout all this computers:</h1>
        <ul>
           {termMap}
        </ul>
      
      </div>
  )
}



export async function getStaticProps(context) {
  const data = await axios.get("http://localhost:5001/api/data/terms");
  let terms = data.data;
  return {
    props: {
        foo: terms
    }, // will be passed to the page component as props
  }
}
