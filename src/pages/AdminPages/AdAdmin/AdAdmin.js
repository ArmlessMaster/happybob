import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import '../../AdPage/AdPage.css';
import { Loader } from "../../../components/Loader/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { AdCardAdmin } from "../../../components/AdminComponents/AdCardAdmin/AdCardAdmin";


export const AdAdmin = () => {

    const [ad, setAd] = useState(null);

    const adId = useParams().id;

    const { request, loading } = useHttp();

    const { token, accountId } = useContext(AuthContext);

    const [creator, setCreator] = useState(null);

    const [similar, setSimilar] = useState(null);

    const getAd = useCallback(async () => {
        try {
            const fetchedAd = await request(`/api/ads/${adId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            const fetchedCreator = await request(`/api/account/${fetchedAd.account}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            const fetchedSimilar = await request(`/api/ads/similar/${fetchedAd.breed}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setAd(fetchedAd);
            setCreator(fetchedCreator);
            setSimilar(fetchedSimilar.filter(item => item._id !== fetchedAd._id));
        } catch (e) {

        }
    }, [token, adId, request]);

    useEffect(() => {
        getAd();
    }, [getAd]);


    if (loading) {
        return <Loader />
    }



    return (
        <>
            {!loading && ad && <AdCardAdmin ad={ad} creator={creator} similar={similar} />}
        </>
    );
};