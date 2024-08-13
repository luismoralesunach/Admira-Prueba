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
import styles from './MetaAds.module.css'; // Import the CSS module

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MetaAds = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedChart, setSelectedChart] = useState('chartData');

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

    // Ensure there are at least two anuncios
    if (!data.anuncios || data.anuncios.length < 2) {
        return <div>Not enough data to compare</div>;
    }

    // Extract data for the grouped bar chart
    const labels = Object.keys(data.anuncios[0]).filter(key => key !== 'nombre');
    const valuesAnuncio1 = labels.map(label => data.anuncios[0][label]);
    const valuesAnuncio2 = labels.map(label => data.anuncios[1][label]);

    const chartData = {
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
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        return `${label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
            }
        }
    };

    const soloAlcance = {
        labels: data.anuncios.map(anun => anun.nombre),
        datasets: [
            {
                label: 'Alcance',
                data: data.anuncios.map(anun => anun.alcance),
                backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            }
        ]
    };

    const soloParticipacion = {
        labels: data.anuncios.map(anun => anun.nombre),
        datasets: [
            {
                label: "Participación",
                data: data.anuncios.map(anun => anun.participación),
                backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            }
        ]
    };

    const soloGasto = {
        labels: data.anuncios.map(anun => anun.nombre),
        datasets: [
            {
                label: "Gasto Publicidad",
                data: data.anuncios.map(anun => anun.gastoPublicidad),
                backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            }
        ]
    };

    const soloConversiones = {
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
    };

    const charts = {
        soloAlcance,
        soloParticipacion,
        soloGasto,
        soloConversiones,
        chartData
    };

    return (
        <div className={styles.container}>
            <h3>Comparacion de metricas Meta Ads</h3>
            <div className={styles.selectContainer}>
                <select
                    value={selectedChart}
                    onChange={(e) => setSelectedChart(e.target.value)}
                >
                    <option value="chartData">Todo</option>
                    <option value="soloAlcance">Alcance</option>
                    <option value="soloParticipacion">Participacion</option>
                    <option value="soloGasto">Gasto</option>
                    <option value="soloConversiones">Conversiones</option>
                </select>
            </div>
            <div className={styles.chartContainer}>
                <Bar options={options} data={charts[selectedChart]} />
            </div>
        </div>
    );
};

export default MetaAds;
