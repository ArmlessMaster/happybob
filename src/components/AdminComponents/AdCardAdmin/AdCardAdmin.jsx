import React, { useState, useContext } from "react";
import '../../AdCard/AdCard.scss';
import ImageGallery from 'react-image-gallery';
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";

export const AdCardAdmin = ({ ad, creator, similar }) => {

    const [modalActive, setModalActive] = useState(false);
    const { accountId, token } = useContext(AuthContext);
    const { request, loading } = useHttp();


    const images = [];


    ad.picture.forEach((image) => {
        images.push({ original: image, thumbnail: image });
    })




    const [galleryOpened, setGalleryOpened] = useState(true);
    const toggleGallery = () => setGalleryOpened(!galleryOpened);

    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 1);
    }

    return (
        <div className="card">
            <div className="header"></div>
            <div className="AdCard">
                <div className="images">
                    <ImageGallery items={images} showThumbnails="true" thumbnailPosition='bottom' />
                </div>
                <div className="animal-info">
                    <div className="animal_name">{ad.animalName}</div>
                    <div className="animal_price">{ad.price}₴</div>
                    <div className="animal-info-list">
                        <div className="info__var">
                            <div className="type__var  list-elem">Type of animal:</div>
                            <div className="breed__var  list-elem">Breed:</div>
                            <div className="gender__var  list-elem">Gender:</div>
                            <div className="age__var  list-elem">Age:</div>
                            <div className="color__var  list-elem">Color:</div>
                        </div>
                        <div className="info">
                            <div className="type  list-elem"><strong>{ad.type}</strong></div>
                            <div className="breed  list-elem"><strong>{ad.breed}</strong></div>
                            <div className="gender  list-elem"><strong>{ad.gender}</strong></div>
                            <div className="age  list-elem"><strong>{ad.age}</strong></div>
                            <div className="color list-elem"><strong>{ad.color}</strong></div>
                        </div>
                    </div>
                    <div className="bottom-info">
                        <p>More information:</p>
                        <p><strong>{ad.information}</strong></p>
                    </div>
                    <div><Link to={'/admin/reports'}><button onClick={async () => {
                        try {
                            await request(`/api/ads/adremove/${ad._id}`, 'DELETE', null, {
                                Authorization: `Bearer ${token}`
                            });
                        } catch (e) {

                        }
                    }}>Remove this ad</button></Link></div>
                </div>
                <div className="account-info">
                    <div className="user-card">
                        <div className="user-label">User:</div>
                        <div className="user-info">
                            <div className="user-flex">
                                <div className="user-flex__left">
                                    <Link to={`/admin/report/account/${ad.account}`}><img className="user-photo" src={creator.photo} />
                                    </Link>
                                    <div className="user-name"><p>{creator.firstName} {creator.lastName}</p>
                                        <p className="user-name-low">On HappyBober since {creator.lastLogin.substring(0, creator.lastLogin.length - 14)}</p></div>
                                </div>
                            </div>


                            <div className="user-info-labels">
                            </div>
                        </div>
                        <div className="allAds">All autor ads</div>
                        <div className="adCard-info-bottons">
                            <button className="botton-buy">Buy</button>
                            <button className="Show-phone-buy">Show Phone</button>
                        </div>
                    </div>
                    <div className="location-card">

                    </div>
                </div>
            </div>

        </div>
    )
}