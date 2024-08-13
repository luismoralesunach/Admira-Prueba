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

const BounceRate = () => {

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

    const availableDates = jsonData.sesiones.map(ses => ses.fecha);

    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    const filteredData = {
        labels: jsonData.sesiones
            .filter(ses => ses.fecha >= startDate && ses.fecha <= endDate)
            .map(ses => ses.fecha),
        datasets: [
            {
                label: "Tasa de Rebote",
                data: jsonData.sesiones
                    .filter(ses => ses.fecha >= startDate && ses.fecha <= endDate)
                    .map(ses => ses.tasaRebote * 100), // Convert bounce rate to percentage
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 1,
                pointRadius: 5 
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value + '%'; // Display y-axis values as percentages for bounce rate
                    }
                }
            }
        }
    };

    return(
        <div>
            <h4>Tasa de Rebote</h4>
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

export default BounceRate;
