import {useState} from 'react';
import {FallingLines} from "react-loader-spinner";

const Loader = () => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }
    return (
        <div style={containerStyle}>
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-lines-loading"
            />
        </div>
    )
}

export default Loader;