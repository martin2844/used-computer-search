import { useRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link'
import differences from '../differences';

const Difference = (props) => {
  const router = useRouter()
  const { term } = router.query
  const beautyTerm = term.replace(/-/g, " ");
  //TODO format date, and sort descending 
  const differenceMap = props.data.map((dataSet) => {
    return(
      <li key={dataSet._id}>
        <Link href={`/differences/id/${dataSet._id}`}><a>{dataSet.date}</a></Link>
      </li>
    )
  })

  return(
    <section className="main column">
              <p>Page for all differences of {beautyTerm}</p>
              <ul>
                {differenceMap}
              </ul>
      </section>
  ) 
}

export async function getStaticPaths() {
  //Acà se hace todo el mapeo
  // https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
  const data = await axios.get("http://localhost:5001/api/data/difference-terms/");
  let rawTerms = data.data;
  const termSet = new Set();
  console.log(rawTerms);
  rawTerms.forEach(term => termSet.add(term));
  let terms = Array.from(termSet);
      let paths = terms.map((term) => {
      let newTerm = term.replace(/ /g, "-");
      return {
          params: { term: newTerm}
      }
  })
  return {
    paths: [ ...paths
    ],
    fallback: false // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  console.log(context);
  let newTerm = context.params.term.replace(/-/g, " ");
  const data = await axios.get(`http://localhost:5001/api/data/differences/${newTerm}`);
  let comps = data.data
  return {
    props: {
        data: comps
    }, // will be passed to the page component as props
  }
}



export default Difference