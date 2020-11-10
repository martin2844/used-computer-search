import { useRouter } from 'next/router'
import axios from 'axios';
import Card from '../../components/card'

const Difference = (props) => {
  const router = useRouter()
  const { term } = router.query
  const beautyTerm = term.replace(/-/g, " ");
  let computerMap = props.data.data.map((comp) => {
      return(
        <Card key={comp.id} card={comp} />
      )
  })

  return(
    <section className="main">
              <p>Page for difference {beautyTerm}</p>
       <div className="filters">
          <div>
            Menor Precio
          </div>
          <div >
            Buenos Aires
          </div>
       </div>
       {computerMap}
      </section>
  ) 
}

export async function getStaticPaths() {
  //Acà se hace todo el mapeo
  // https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
  const data = await axios.get("http://localhost:5001/api/data/difference-terms/");
  let terms = data.data;
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
  const data = await axios.get(`http://localhost:5001/api/data/difference/${newTerm}`);
  let comps = data.data
  return {
    props: {
        data: comps
    }, // will be passed to the page component as props
  }
}



export default Difference