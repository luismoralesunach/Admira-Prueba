import { useState, useEffect } from "react";
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const GenderDemo = () => {
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/json/googleanalytics.json`);
                if (data) setJsonData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                console.log("Error in fetching Google Analytics data: ", error);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const genderData = {
        labels: jsonData.demografía.género.map(gender => gender.tipo),
        datasets: [
            {
                label: "Distribución por Género",
                data: jsonData.demografía.género.map(gender => gender.porcentaje),
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <h4>Demografía - Genero</h4>
            <Pie data={genderData} options={options} />
        </div>
    );
};

export default GenderDemo;
