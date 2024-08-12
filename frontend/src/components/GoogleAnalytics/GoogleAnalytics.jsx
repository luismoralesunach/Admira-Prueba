import { useState, useEffect } from "react"
import axios from 'axios'
import {Line} from 'react-chartjs-2'
import { lineChartData } from "../../assets/fakedata";
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend
 } from 'chart.js';

 ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
  )

const GoogleAnalytics = ()=>{

    const [jsonData, setJsonData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(()=>{
       const fetchData = async()=>{
        try {
            const {data} = await axios.get(`/json/googleanalytics.json`)
            if(data) setJsonData(data)
                setLoading(false)
            
        } catch (error) {
            setError(error.message)
            console.log("Error in fetching in google analytics: ", error)
        }
       }

       fetchData()
    },[loading])

    if(loading) return <div>Loading...</div>


    console.log("Data in google analytics: ", jsonData)

    let options = {}

    
    const fechas = jsonData.vistasPagina.map(item => item.fecha);

    // Create datasets for vistasPagina and sesiones
    const graphData = {
      labels: fechas,
      datasets: [
        {
          label: 'Vistas de Página',
          data: jsonData.vistasPagina.map(item => item.vistas),
          borderColor: 'rgba(75, 192, 192, 1)', // Teal color for page views
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light teal for page views
          borderWidth: 1,
          pointRadius: 5
        },
        {
          label: 'Sesiones',
          data: jsonData.sesiones.map(item => item.sesiones),
          borderColor: 'rgba(255, 99, 132, 1)', // Red color for sessions
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red for sessions
          borderWidth: 1,
          pointRadius: 5
        }
      ]
    };
    return(
        <div>
            <div>
            Visitas diarias
            <Line options={options} data={graphData} />
            </div>

            <div>
                Sesiones diarias
                <Line options={options} data={lineChartData} />
            </div>
        </div>
    )
}

export default GoogleAnalytics;