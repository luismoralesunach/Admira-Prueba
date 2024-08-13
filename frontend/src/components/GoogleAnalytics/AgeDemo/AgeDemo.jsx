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

const AgeDemo = () => {
    const [jsonData, setJsonData] = useState(null);
    const [ageRange, setAgeRange] = useState('');
    const [inputAge, setInputAge] = useState('');
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

    useEffect(() => {
        let ageInput = Number(inputAge);
        if (ageInput >= 18 && ageInput <= 24) setAgeRange('18-24');
        else if (ageInput >= 25 && ageInput <= 34) setAgeRange('25-34');
        else if (ageInput) setAgeRange('Desconocido');
        else setAgeRange('');
    }, [inputAge]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const filteredAges = jsonData.demografía.edad.filter(age => {
        return !ageRange || age.rango === ageRange;
    });

    const unknownPercentage = 100 - filteredAges.reduce((sum, age) => sum + age.porcentaje, 0);

    const ageDemographics = {
        labels: filteredAges.map(age => age.rango).concat(unknownPercentage > 0 ? "Desconocido" : []),
        datasets: [
            {
                label: "Distribución por Edad",
                data: filteredAges.map(age => age.porcentaje).concat(unknownPercentage > 0 ? unknownPercentage : []),
                backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
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
            <h4>Demografía - Edad</h4>
            <div>
                <label>
                    Enter Age:
                    <input 
                        type="number" 
                        value={inputAge} 
                        onChange={(e) => setInputAge(e.target.value)} 
                        placeholder="Enter age" 
                    />
                </label>
            </div>
            <Pie data={ageDemographics} options={options} />
        </div>
    );
};

export default AgeDemo;
