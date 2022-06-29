import React, { useCallback, useContext, useEffect, useState } from "react";
import { EditAccountCardAdmin } from "../../../components/AdminComponents/EditAccountCardAdmin/EditAccountCardAdmin";
import { Loader } from "../../../components/Loader/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { useParams } from 'react-router-dom';

export const EditAccountAdmin = () => {

    const [account, setAccount] = useState(null);

    const { request, loading } = useHttp();

    const accountId = useParams().id;

    const { token } = useContext(AuthContext);

    const getAccount = useCallback(async () => {
        try {
            const fetched = await request(`/api/account/${accountId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            setAccount(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        getAccount()
    }, [getAccount]);


    if (loading) {
        return <Loader />
    }



    return (
        <>
            {!loading && account && <EditAccountCardAdmin account={account} />}
        </>
    );
};
