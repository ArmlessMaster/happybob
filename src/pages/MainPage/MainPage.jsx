import React, {useCallback, useContext, useEffect, useState} from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import Mobile from "../../components/mobile/Mobile";
import Intro from "../../components/intro/Intro"
import About from "../../components/about/About"
import Bober from "../../components/bober+/bober"
import Contact from "../../components/contact/Contact";
import { AdsList } from "../../components/AdsList/AdsList";
import { AdsListSlider } from "../../components/AdsListSlider/AdsListSlider";
import "./MainPage.scss";
import "../../App.scss"

export const MainPage = () => {

  const [ads, setAds] = useState([]);

  const [account, setAccount] = useState(null);

  const { request, loading } = useHttp();

  const { token } = useContext(AuthContext);

  const getAccount = useCallback(async () => {
    try {

        const fetched = await request(`/api/account/getaccount`, 'GET', null, {
            Authorization: `Bearer ${token}`
        });

        setAccount(fetched);
    } catch (e) {

    }
}, [token, request]);

useEffect(() => {
    getAccount()
}, [getAccount]);
  
const fetchAds = useCallback(async () => {
  try {
      const fetched = await request('/api/ads/getads', 'GET', null, {
          Authorization: `Bearer ${token}`
      });
        setAds((fetched.sort((a, b) => a.date > b.date ? -1 : 1)).slice(0, 10));
    } catch (e) {
    }
  }, [token, request]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);


    return (
      <div className="app">
        <div className="sections">
          <Intro />
          <AdsListSlider ads={ads}/>
          <AdsList ads={ads} />
          <About account={account}/>
          <Bober account={account}/>
          <Mobile/>
          <Contact/>
        </div>
      </div>
    );
};
