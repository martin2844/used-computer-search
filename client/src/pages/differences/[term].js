import { useRouter } from 'next/router'
import axios from 'axios';
import Link from 'next/link'
import dayjs from 'dayjs';

const Difference = (props) => {

  const router = useRouter()
  const { term } = router.query

  const diffMap = props.data.map((x) => {
    let theDate = dayjs(x.date).format('DD/MM/YYYY')
    return (
    <li key={x._id}><Link href={`/differences/id/${x._id}`}><a>{theDate}</a></Link></li>
    )
  })
  

  return(
    <section className="main column">
              <h3>Page for all differences of {term}</h3>
              <ul className="query-map differences">
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