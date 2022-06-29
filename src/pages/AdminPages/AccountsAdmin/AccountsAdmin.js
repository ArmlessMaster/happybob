import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../components/Loader/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { AccountsListAdmin } from "../../../components/AdminComponents/AccountsListAdmin/AccountsListAdmin"
export const AccountsAdmin = () => {

    const [accounts, setAccounts] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);
    const fetchAccounts = useCallback(async () => {
        try {
            const fetched = await request('/api/account/accounts', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setAccounts(fetched.sort((a, b) => a.registeredAt > b.registeredAt ? -1 : 1));
        } catch (e) {
        }
    }, [token, request]);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);


    if (loading) {
        return <Loader />
    }
    return (
        <div>
            {!loading && <AccountsListAdmin accounts={accounts} setAccounts={setAccounts} />}

        </div>
    );
};