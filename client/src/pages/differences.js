import React from 'react'
import axios from 'axios'
import Link from 'next/link'

const differences = (props) => {

    const termMap = props.foo.map((term) => {
        let urlTerm = term.replace(/ /g, "-");
        return (
            <li key={term}>
               <Link href={`/differences/${urlTerm}`} >
                   <a>{term}</a>
               </Link>
            </li>
        )
    })

    return (
        <section className="main column">
              <h3>Differences of:</h3>
              <ul className="query-map">
            {termMap}
            </ul>
        </section>
    )
}

export async function getServerSideProps() {
    const data = await axios.get("https://api.think.martinchammah.dev/api/data/difference-terms/");
    let rawTerms = data.data;
    const termSet = new Set();
    rawTerms.forEach(term => termSet.add(term));
    let terms = Array.from(termSet);
    return {
      props: {
          foo: terms
      }, // will be passed to the page component as props
    }
  }

export default differences
