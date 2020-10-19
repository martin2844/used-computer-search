import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Card from './card';

const Test = (props) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
    axios.get(`/api/data/difference/${props.id}`).then(response => setData(response.data.data));
    }, [])

    console.log(data);

    const displayCards = data.map((card) => {
        return(
            <Card key={card.id} card={card} />
        )
      })

    return (
        <section className="main">
            {displayCards}
        </section>
    )
}

export default Test
