import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './main.css';
import Card from '../components/card';





const Index = () => {
  const [selector, setSelector] = useState("thinkpad");
  const [cardData, setCardData] = useState([]);
  const [thinkpads, setThinkpads] = useState([]);

  const getCardData = async (selector) => {
    const data = await axios.get(`api/data/all/${selector}`);
    setCardData(data.data.data);
  }

  useEffect(() => {
        axios.get("api/data/terms").then(res => {
        setThinkpads(res.data);
        });
        console.log("rendering")
        getCardData(selector);

  }, [])

  const sortPriceLow = () => {
    let sortedData = cardData.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    setCardData(sortedData);
  }

  const sortCity= () => {
    let sortedData = cardData.filter((a) => {
      return a.state === "Buenos Aires"
    });
    setCardData(sortedData);
  }

  const changeThinkpad = (title) => {
    getCardData(title);
  }

  const navLinks = thinkpads.map((title) => {
    return(
      <div key={title} onClick={() => changeThinkpad(title)} className="titles">
        {title}
      </div>
    )
  })

  const displayCards = cardData.map((card) => {
    return(
        <Card key={card.id} card={card} />
    )
  })


  return (
    <>
     <section className="nav">
       {navLinks}
     </section> 
     <section className="main">
       <div className="filters">
          <div onClick={sortPriceLow}>
            Menor Precio
          </div>
          <div onClick={sortCity}>
            Buenos Aires
          </div>
       </div>
    {displayCards}
     </section>
    </>
  )
}

export default Index
