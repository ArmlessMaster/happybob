import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Loader } from "../../../components/Loader/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { AccountCardAdmin } from "../../../components/AdminComponents/AccountCardAdmin/AccountCardAdmin";

export const AccountAdmin = () => {

    const [account, setAccount] = useState(null);

    const userId = useParams().id;

    const { request, loading } = useHttp();

    const { token, accountId } = useContext(AuthContext);

    const getAccount = useCallback(async () => {
        try {
            const fetched = await request(`/api/account/${userId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setAccount(fetched);
        } catch (e) {

        }
    }, [token, userId, request]);

    useEffect(() => {
        getAccount()
    }, [getAccount]);




    if (loading) {
        return <Loader />
    }



    return (
        <>
            {!loading && account && <AccountCardAdmin account={account} />}
        </>
    );
};
