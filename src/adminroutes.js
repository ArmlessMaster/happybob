import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//
import { AdsAdmin } from './pages/AdminPages/AdsAdmin/AdsAdmin'
import { CreateAdAdmin } from './pages/AdminPages/CreateAdAdmin/CreateAdAdmin'
import { EditAdAdmin } from './pages/AdminPages/EditAdAdmin/EditAdAdmin'
import { AccountsAdmin } from './pages/AdminPages/AccountsAdmin/AccountsAdmin';
import { EditAccountAdmin } from './pages/AdminPages/EditAccountAdmin/EditAccountAdmin'
import { ReportsAdmin } from './pages/AdminPages/ReportsAdmin/ReportsAdmin';
import { AdAdmin } from './pages/AdminPages/AdAdmin/AdAdmin';
import { AccountAdmin } from './pages/AdminPages/AccountAdmin/AccountAdmin';
import { StatisticsAdmin } from './pages/AdminPages/StatisticsAdmin/StatisticsAdmin';
//



export const useAdminRoutes = isAuthenticated => {


    return (
        <Routes>
            <Route path='/admin/ads' exact element={<AdsAdmin />} />
            <Route path='/admin/users' exact element={<AccountsAdmin />} />
            <Route path='/admin/reports' exact element={<ReportsAdmin />} />
            <Route path='/admin/statistics' exact element={<StatisticsAdmin />} />

            <Route path='/admin/report/account/:id' exact element={<AccountAdmin />} />
            <Route path='/admin/report/ad/:id' exact element={<AdAdmin />} />

            <Route path='/admin/edit/ad/:id' exact element={<EditAdAdmin />} />
            <Route path='/admin/edit/account/:id' exact element={<EditAccountAdmin />} />

            {/* <Route path='/admin/createad' exact element={<CreateAdAdmin />} /> */}

            <Route path="/*" element={<Navigate replace to="/admin/ads" />} />
        </Routes>
    )
}