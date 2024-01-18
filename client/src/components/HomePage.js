import { Link, useNavigate} from 'react-router-dom';
import confetti from 'canvas-confetti';
import "../styling/homepage.css"

function HomePage () {
    const navigate = useNavigate();

    const handleClick = () => { 
        confetti({
            duration: 40
        }); 

        setTimeout(() => {
            navigate("/login")
        }, 1500);
    };

    return (
        <div className="center-container">
            <div id="home-container">
                <Link to="#" className="welcome-link" onClick={handleClick}>
                    <p>Welcome</p>
                </Link>
            </div>
      </div>
    );
}

export default HomePage;