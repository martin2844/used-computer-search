import { useRouter } from 'next/router'
import axios from 'axios';

const Difference = (props) => {
  const router = useRouter()
  const { pid } = router.query
  const termMap = props.foo.map((term) => {
      return <p key={term}>{term}</p>
  })
  return(
      <div>
        <p>Difference: {pid}</p>
        <p>Static Difference {termMap}</p>
      </div>
  ) 
}

export async function getStaticPaths() {
    //Acà se hace todo el mapeo
    // https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
    return {
      paths: [
        { params: { pid: '1' } },
        { params: { pid: '2' } }
         // See the "paths" section below
      ],
      fallback: false // See the "fallback" section below
    };
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


export default Difference