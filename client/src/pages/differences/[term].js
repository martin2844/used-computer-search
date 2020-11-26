import { useRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link'

const Difference = (props) => {

  const router = useRouter()
  const { term } = router.query

  const diffMap = props.data.map((x) => {
    return (
    <li key={x._id}><Link href={`/differences/id/${x._id}`}><a>{x.date}</a></Link></li>
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

export async function getServerSideProps(context) {
  console.log(context);
  let newTerm = context.params.term.replace(/-/g, " ");
  const data = await axios.get(`https://api.think.martinchammah.dev/api/data/differences/${newTerm}`);
  // Pass data to the page via props
  let comps = data.data
  return {
    props: {
        data: comps
    }, // will be passed to the page component as props
  }
}


export default Difference