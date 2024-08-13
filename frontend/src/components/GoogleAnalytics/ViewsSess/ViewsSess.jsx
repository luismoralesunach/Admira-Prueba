import { useState, useEffect } from "react";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const ViewsSess = () => {

    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('2024-08-01');
    const [endDate, setEndDate] = useState('2024-08-05');

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const availableDates = jsonData.vistasPagina.map(vista => vista.fecha);

    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    const filteredData = {
        labels: jsonData.vistasPagina
            .filter(vista => vista.fecha >= startDate && vista.fecha <= endDate)
            .map(vista => vista.fecha),
        datasets: [
            {
                label: "Vistas de Pagina",
                data: jsonData.vistasPagina
                    .filter(vista => vista.fecha >= startDate && vista.fecha <= endDate)
                    .map(vista => vista.vistas),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                pointRadius: 5 
            },
            {
                label: "Sesiones",
                data: jsonData.sesiones
                    .filter(ses => ses.fecha >= startDate && ses.fecha <= endDate)
                    .map(ses => ses.sesiones),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                pointRadius: 5
            }
        ]
    };

    const options = {}

    return(
        <div>
            <h4>Vistas con Sesiones</h4>
            <div>
                <label>
                    Start Date:
                    <select value={startDate} onChange={handleStartDateChange}>
                        <option value="">Select a start date</option>
                        {availableDates.map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </label>
                <label>
                    End Date:
                    <select value={endDate} onChange={handleEndDateChange}>
                        <option value="">Select an end date</option>
                        {availableDates.map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </label>
            </div>
            <Line options={options} data={filteredData} />
        </div>
    )
}

export default ViewsSess;
