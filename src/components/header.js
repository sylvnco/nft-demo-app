import './header.css';
import { NavLink } from 'react-router-dom';
import requestAccount from '../helpers/account';
import walletMenu from './walletMenu';
import React from 'react';
import './../App.css';
import { ethers } from 'ethers';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            displayMenu: true,
        };
    }

    async getTokenBalance() {}

    async componentDidMount() {
        window.ethereum.on('accountsChanged', async (accounts) => {
            await this.fetch();
        });
        await this.fetch();
    }

    async fetch() {
        try {
            if (window.ethereum !== undefined) {
                const [address] = await requestAccount();
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const balance = await provider.getBalance(address);
                this.setState({
                    wallet: address,
                    balance: Math.floor(ethers.utils.formatEther(balance)),
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async disconnect() {
        this.setState((x) => {});
    }

    render() {
        return (
            <div className="header">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/collection">My Collection</NavLink>
                        </li>
                    </ul>
                </nav>
                <div>
                    <span
                        className="wallet"
                        onClick={() =>
                            this.setState({
                                displayMenu: !this.state.displayMenu,
                            })
                        }
                    >
                        {this.state.wallet?.substring(0, 8) + '...'}
                    </span>
                    {this.state.displayMenu && (
                        <div className="walletMenu">
                            <ul>
                                <li className="balance">
                                    <label>Balance: </label>
                                    <span className="eth-amount">
                                        {this.state.balance}
                                    </span>
                                </li>
                                <li className="disconnect">
                                    <span>Disconnect</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Header;
