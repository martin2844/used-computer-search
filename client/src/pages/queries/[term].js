import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import axios from 'axios';
import Card from '../../components/card';

const Difference = (props) => {
  const router = useRouter()
  const { term } = router.query
  const beautyTerm = term.replace(/-/g, " ");
  
  let computerMap = props.data.data.map((comp) => {
      return(
        <Card key={comp.id} card={comp} />
      )
  })
  const [compData, setCompData] = useState(computerMap);

  const sortLow = () => {
    let sortedData = props.data.data.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    sortedData = sortedData.map((comp) => {
    return(
            <Card key={comp.id} card={comp} />
          )
    });
    setCompData(sortedData);
  }

  const sortCity= () => {
    let sortedData = props.data.data.filter((a) => {
      return a.state === "Buenos Aires"
    });

    sortedData = sortedData.map((comp) => {
      return(
              <Card key={comp.id} card={comp} />
            )
      });
    setCompData(sortedData);
  }

  return(
      
        <section className="main">
            <p>Page for difference {beautyTerm}</p>
       <div className="filters">
          <div onClick={() => sortLow()}>
            Menor Precio
          </div>
          <div onClick={() => sortCity()}>
            Buenos Aires
          </div>
       </div>
       {compData}
     </section>
        
       
      
  ) 
}

export async function getStaticPaths() {
    //Acà se hace todo el mapeo
    // https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
    const data = await axios.get("http://localhost:5001/api/data/terms");
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
      // paths: [
      //   {params: {term: "thinkpad"}},
      //   {params: {term: "thinkpad x240"}}
        
      // ],
      fallback: false // See the "fallback" section below
    };
}


export async function getStaticProps(context) {
    console.log(context);
    let newTerm = context.params.term.replace(/-/g, " ");
    const data = await axios.get(`http://localhost:5001/api/data/all/${newTerm}`);
    let comps = data.data
    return {
      props: {
          data: comps
      }, // will be passed to the page component as props
    }
  }


  export default Difference