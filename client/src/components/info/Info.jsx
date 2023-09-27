import React, {useEffect, useState} from 'react';
import './info.css'
import axios from "axios";
import {getInfo} from "../../actions/info";

const Info = () => {

    const [data, setData] = useState({
        email: '',
        group: '',
        variant: '',
        phone: '',
    });

    useEffect(() => {
        getInfo().then((result) => {
            const userData = result.user;
            setData({
                email: userData.email,
                group: userData.group,
                variant: userData.variant,
                phone: userData.phone,
            });
        });
    }, []);

    return (
        <div className="info__container">
            <div>Email: {data.email}</div>
            <div>Group: {data.group}</div>
            <div>Variant: {data.variant}</div>
            <div>Phone: {data.phone}</div>
        </div>
    );
};

export default Info;