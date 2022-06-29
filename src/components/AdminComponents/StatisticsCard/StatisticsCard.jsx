import React from "react";
import "../../AccountCard/AccountCard.scss";
import { Link } from "react-router-dom";
import './StatisticsCard.scss'
import { UserOutlined } from '@ant-design/icons';

export const StatisticsCard = ({ ads, accounts, rewievs, reports }) => {

    //quantity
    const numberOfAds = ads.length;
    const numberOfAccounts = accounts.length;
    const numberOfRewievs = rewievs.length;
    const numberOfReports = reports.length;

    // subscribers
    const numberOfSubscribers = 0;
    accounts.forEach((item) => { if (item.isSubscriber) numberOfSubscribers++ })

    return (
        <div style={{ marginTop: '75px', marginBottom: '50px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr  1fr' }}>
                <div className="widget">
                    <div className="left">
                        <span className="title">Ads</span>
                        <span className="counter">
                            {numberOfAds}
                        </span>
                        <Link to={'/admin/ads'}><span className="link">See all ads</span></Link>
                    </div>
                    <div className="right">
                        <div className="percentage positive">
                        </div>
                        <UserOutlined />
                    </div>
                </div>

                <div className="widget">
                    <div className="left">
                        <span className="title">Accounts</span>
                        <span className="counter">
                            {numberOfAccounts}
                        </span>
                        <Link to={'/admin/users'}><span className="link">See all accounts</span></Link>
                    </div>
                    <div className="right">
                        <div className="percentage positive">
                        </div>
                        <UserOutlined />
                    </div>
                </div>

                <div className="widget">
                    <div className="left">
                        <span className="title">Rewievs</span>
                        <span className="counter">
                            {numberOfRewievs}
                        </span>
                        <Link to={'/admin/users'}><span className="link">See all accounts</span></Link>
                    </div>
                    <div className="right">
                        <div className="percentage positive">
                        </div>
                        <UserOutlined />
                    </div>
                </div>

                <div className="widget">
                    <div className="left">
                        <span className="title">Reports</span>
                        <span className="counter">
                            {numberOfReports}
                        </span>
                        <Link to={'/admin/reports'}><span className="link">See all reports</span></Link>
                    </div>
                    <div className="right">
                        <div className="percentage positive">
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}