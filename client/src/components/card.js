const card = (props) => {
    let {card} = props;
    return (
        <div className="card" key={card.id}>
        <div className="top">
        {card.title}
        <a target="_blank" href={card.link}><img src={card.image} /></a>
        <div className="price">{card.price}</div>
        </div>
        <div className="bottom">
        {card.state} {card.city}
        </div>
      </div>
    )
}

export default card