import { Link } from 'react-router-dom'


const Home = ()=>{

    return(
        <div style={{display: 'flex', justifyContent: "center", alignContent: "center"}}>
            <Link to={'/dashboard'}><button>Go to dashbaord</button></Link>
        </div>
    )
}

export default Home;