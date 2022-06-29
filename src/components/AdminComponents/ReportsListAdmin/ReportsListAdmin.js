import React, { useState, useContext } from "react";
import "../../AccountCard/AccountCard.scss";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";


export const ReportsListAdmin = ({ reports, setReports }) => {

    const [current, setCurrent] = useState(reports);

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

    const filterReports = () => {
        setCurrent(reports);
        let temp = reports
        temp = temp.filter(item =>
            ((((item.cause)).toLowerCase()).includes(text.toLowerCase()))
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
                <button className="Search-Line-full-button" onClick={filterReports}>Search</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr  1fr  1fr' }}>


                {current.slice(0, visible).map((report, index) => {

                    return (
                        <div className="rewiew-list">
                            <div className="rewiew-element">
                                <div className="big-flex-accountCard">
                                    <div className="flex-accountCard">
                                        <div className="left">
                                            <div className="circle-photo">
                                                <img src={'https://firebasestorage.googleapis.com/v0/b/happybober-23252.appspot.com/o/images%2Ftasto_10_architetto_fran_01.png?alt=media&token=fc988e1a-235a-4c69-98d4-7dbb5e25ddc6'} />
                                            </div>
                                        </div>
                                        <div className="right">
                                            <p className="left-big">{report.cause} </p>
                                            <p className="left-medium">Date  {report.date.substring(0, report.date.length - 14)}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="Rewiws-Element-text">{report.reportType}</p>
                                <div style={{ display: 'flex' }}>
                                    <button onClick={async () => {
                                        try {
                                            await request(`/api/report/delete/${report._id}`, 'DELETE', null, {
                                                Authorization: `Bearer ${token}`
                                            });
                                            setCurrent(current.filter(item => item._id !== report._id));
                                        } catch (e) {
                                        }
                                    }}>Remove</button>
                                    {!(report.reportType === 'ad') && <Link to={`/admin/report/account/${report.account}`}><button>Go</button></Link>}
                                    {!(report.reportType === 'user') && <Link to={`/admin/report/ad/${report.ad}`}><button>Go</button></Link>}
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