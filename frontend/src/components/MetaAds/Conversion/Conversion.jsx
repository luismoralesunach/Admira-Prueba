import { useState, useEffect } from "react";
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';


ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Conversion = ()=>{

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/json/metaads.json`);
                if (data) setData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                console.log("Error in fetching meta ads: ", error);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const graphData = {
        labels: data.anuncios.map(anun => anun.nombre),
        datasets: [
            {
                label: "Conversiones",
                data: data.anuncios.map(anun => anun.conversiones),
                backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            }
        ]
    }

    const options = {}


    return(
        <div>
            <h4>Comparacion Conversiones</h4>
            <Bar options={options} data={graphData} />

        </div>
    )
}

export default Conversion;