import { useRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link'
import {useState, useEffect} from 'react';


const Difference = (props) => {

  const router = useRouter()
  const { term } = router.query
  const [dif, setDif] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
  const differenceMap = async () => {
    if(!term){
      setCount(count + 1);
      return;
    }
    let newterm;
    if(term.includes("-")) {
      newterm = term.replace(/-/g, " ");
    } else {
      newterm = term;
    }
    const data = await axios.get(`http://localhost:5001/api/data/differences/${newterm}`);
    let comps = data.data
    console.log(comps);
    setDif(comps);
  }
    differenceMap();
  }, [count])

  const diffMap = dif.map((x) => {
    return (
    <li><Link href={`/differences/id/${x._id}`}><a>{x.date}</a></Link></li>
    )
  })
  

  return(
    <section className="main column">
              <p>Page for all differences of {term}</p>
              <ul>
                {diffMap}
              </ul>
      </section>
  ) 
}

export default Difference