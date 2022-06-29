import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../../../components/Loader/Loader";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { ReportsListAdmin } from "../../../components/AdminComponents/ReportsListAdmin/ReportsListAdmin"
export const ReportsAdmin = () => {

    const [reports, setReports] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);
    const fetchReports = useCallback(async () => {
        try {
            const fetched = await request('/api/report/reports', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setReports(fetched.sort((a, b) => a.date > b.date ? -1 : 1));
        } catch (e) {
        }
    }, [token, request]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);


    if (loading) {
        return <Loader />
    }
    return (
        <div>
            {!loading && <ReportsListAdmin reports={reports} setReports={setReports} />}

        </div>
    );
};