import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        border: '0',
        backgroundColor: isHovered ? '#9e9e9e' : '#b0aeae',
        padding: '20px',
        borderRadius: '25em',
        marginTop: '70%',
        width: '100%',
        cursor: 'pointer',
        boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to={'/dashboard'}>
                <button
                    style={buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Go to dashboard
                </button>
            </Link>
        </div>
    );
};

export default Home;
