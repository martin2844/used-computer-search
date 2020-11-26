import axios from 'axios';
import Card from '../../../components/card'

const Difference = (props) => {

    const computerMap = props.data.data.map((comp) => {
      return(
        <Card key={comp.id} card={comp} />
      )
  })
 
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

export async function getServerSideProps(context) {
  const data = await axios.get(`https://api.think.martinchammah.dev/api/data/difference-doc/${context.params.id}`);
  // Pass data to the page via props
  let comps = data.data
  return {
    props: {
        data: comps
    }, // will be passed to the page component as props
  }
}

export default Difference