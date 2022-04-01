import React from 'react';
import { ethers } from 'ethers';
import Addresses from './../addresses.js';
import CashGrab from './../artifacts/CashGrabNFT.json';
import ItemList from './../components/itemList.js';
import axios from 'axios';
import './collection.css';
import './../App.css';

class Collection extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            nfts: [],
        };
    }

    componentDidMount() {
        this.fetch();
    }

    async fetch() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                '0x5FbDB2315678afecb367f032d93F642f64180aa3',
                CashGrab.abi,
                provider
            );
            try {
                const data = await contract.getTokenOfUser();
                const items = await Promise.all(
                    data.map(async (x) => {
                        const tokenUri = await contract.tokenURI(x);
                        const metadata = await axios.get(tokenUri);
                        let item = {
                            tokenId: x.toNumber(),
                            tokenUri: metadata.data.image,
                            mintPrice: 0.74,
                        };
                        return item;
                    })
                );
                this.setState({ count: data.length });

                this.setState((prevState) => ({
                    nfts: [...prevState.nfts, ...items],
                }));
            } catch ({ message }) {
                console.log(message);
            }
        }
    }

    render() {
        return (
            <div className="container">
                <h1>My Collection</h1>
                <p className="sub">
                    {this.state.count} results |{' '}
                    <span className="eth-amount">
                        value :{' '}
                        {this.state.nfts.reduce((a, b) => a + b.mintPrice, 0)}
                    </span>
                </p>
                <ItemList nfts={this.state.nfts} />
            </div>
        );
    }
}

export default Collection;
