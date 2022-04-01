function ItemList(props) {
    return (
        <div className="items">
            {props.nfts.map((x, i) => (
                <div className="item" key={i}>
                    <img src={x.tokenUri}></img>
                    <div className="item--infos">
                        <label># {x.tokenId}</label>
                        <div className="item--infos-cta">
                            <span className="eth-amount">{x.mintPrice}</span>
                            <button>Details &#62;</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ItemList;
