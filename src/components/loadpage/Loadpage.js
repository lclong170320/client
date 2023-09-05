import React from 'react';
import { Image } from 'react-bootstrap';
import icon from '../../styles/img/chieu-nay-khong-co-mua.gif';
function Loadpage() {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center">
            <Image
                src={icon}
                alt="Lỗi"
            />
        </div>
    );
}

export default Loadpage;
