import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Loader } from "../../../components/Loader/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { StatisticsCard } from "../../../components/AdminComponents/StatisticsCard/StatisticsCard";


export const StatisticsAdmin = () => {

    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const [ads, setAds] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [rewievs, setRewievs] = useState([]);
    const [reports, setReports] = useState([]);

    const fetchElements = useCallback(async () => {
        try {
            const fetchedAds = await request('/api/ads/getads', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            const fetchedAccounts = await request('/api/account/accounts', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            const fetchedRewievs = await request('/api/rewiev/rewievs', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            const fetchedReports = await request('/api/report/reports', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setAds(fetchedAds);
            setAccounts(fetchedAccounts);
            setRewievs(fetchedRewievs);
            setReports(fetchedReports);
        } catch (e) {
        }
    }, [token, request]);

    useEffect(() => {
        fetchElements();
    }, [fetchElements]);


    if (loading) {
        return <Loader />
    }



    return (
        <>
            <StatisticsCard ads={ads} accounts={accounts} rewievs={rewievs} reports={reports} />
        </>
    );
};