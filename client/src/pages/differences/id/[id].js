import { useRouter } from 'next/router'
import axios from 'axios';
import Card from '../../../components/card'

const Difference = (props) => {
  const router = useRouter()
  
  let computerMap;
  if(props.data.data) {
    computerMap = props.data.data.map((comp) => {
      return(
        <Card key={comp.id} card={comp} />
      )
  })
  }


  return(
    <section className="main">
              <p>Page for difference </p>
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
  const data = await axios.get("http://localhost:5001/api/data/all-differences/");
      let terms = data.data;
      terms = terms.map((term) => term._id);
      let paths = terms.map((term) => {
      return {
          params: { id: term}
      }
  })
  return {
    paths: [ ...paths
    ],
    fallback: false // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const data = await axios.get(`http://localhost:5001/api/data/difference-doc/${context.params.id}`);
  let comps = data.data
  return {
    props: {
        data: comps
    }, // will be passed to the page component as props
  }
}



export default Difference