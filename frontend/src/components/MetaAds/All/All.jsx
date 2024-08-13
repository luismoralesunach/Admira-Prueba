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

const All = ()=>{

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

    const labels = Object.keys(data.anuncios[0]).filter(key => key !== 'nombre');
    const valuesAnuncio1 = labels.map(label => data.anuncios[0][label]);
    const valuesAnuncio2 = labels.map(label => data.anuncios[1][label]);

    const graphData = {
        labels: labels,
        datasets: [
            {
                label: data.anuncios[0].nombre,
                data: valuesAnuncio1,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: data.anuncios[1].nombre,
                data: valuesAnuncio2,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }
        ]
    }

    const options = {}


    return(
        <div>
            <h4>Comparacion entre Anuncios</h4>
            <Bar options={options} data={graphData} />

        </div>
    )
}

export default All;