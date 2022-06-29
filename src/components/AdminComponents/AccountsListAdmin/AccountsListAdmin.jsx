import React, { useState, useContext } from "react";
import "../../AccountCard/AccountCard.scss";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";


export const AccountsListAdmin = ({ accounts, setAccounts }) => {

    const [current, setCurrent] = useState(accounts);

    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const [visible, setVisible] = useState(25);

    const showMoreItems = () => {
        setVisible(prevValue => prevValue + 25);
    }

    const [text, setText] = useState('');

    const handleTextChange = event => {
        setText(event.target.value);
    }

    const filterAccounts = () => {
        setCurrent(accounts);
        let temp = accounts
        temp = temp.filter(item =>
            ((((item.email) + (item.phone)).toLowerCase()).includes(text.toLowerCase()))
        );
        setCurrent(temp)
    }

    return (
        <div style={{ marginTop: '100px' }}>

            <div className="Search-Line__flex">
                <input
                    className="Search-Line"
                    placeholder="Search"
                    id="search"
                    type="text"
                    name="search"
                    value={text}
                    onChange={handleTextChange} />
                <button className="Search-Line-full-button" onClick={filterAccounts}>Search</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr  1fr  1fr' }}>


                {current.slice(0, visible).map((account, index) => {

                    return (
                        <div className="rewiew-list">
                            <div className="rewiew-element">
                                <div className="big-flex-accountCard">
                                    <div className="flex-accountCard">
                                        <div className="left">
                                            <div className="circle-photo">
                                                <img src={account.photo} />
                                            </div>
                                        </div>
                                        <div className="right">
                                            <p className="left-big">{account.email} </p>
                                            <p className="left-big">{account.phone}</p>
                                            <p className="left-medium">On HappyBober since  {account.registeredAt.substring(0, account.registeredAt.length - 14)}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="Rewiws-Element-text">{account.firstName} {account.lastName}</p>
                                <div style={{ display: 'flex' }}>
                                    <button onClick={async () => {
                                        try {
                                            await request(`/api/account/delete/${account._id}`, 'DELETE', null, {
                                                Authorization: `Bearer ${token}`
                                            });
                                            setCurrent(current.filter(item => item._id !== account._id));
                                        } catch (e) {
                                        }
                                    }}>Remove</button>
                                    <Link to={`/admin/edit/account/${account._id}`}><button>Update</button></Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="flex-accountCard-btns">
                    <button className="AccountCard-Line-border-button" style={current.length > 0 && visible >= current.length ? { display: 'none' } : { display: 'all' }} onClick={showMoreItems}>More</button>
                </div>
            </div>
        </div>
    )
}