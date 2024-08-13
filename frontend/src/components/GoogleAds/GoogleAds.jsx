import { useState, useEffect } from "react"
import styles from './GoogleAds.module.css'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'
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
  )



const GoogleAds = ()=>{

    const [jsonData, setJsonData] = useState(null)
    // const [options, setOptions ] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [ selectedChart, setSelectedChart] = useState('graphData')


    useEffect(()=>{
       const fetchData = async()=>{
        try {
            const {data} = await axios.get(`/json/googleads.json`)
            if(data) setJsonData(data)
                setLoading(false)
            
        } catch (error) {
            setError(error.message)
            console.log("Error in fetching googleads: ", error)
        }
       }

       fetchData()
    },[loading])

    if(loading) return <div>Loading...</div>

    console.log("data in google ads: ", jsonData)

    const labels = Object.keys(jsonData.campañas[0]).filter(key => key !== 'nombre');

    const graphData = {
      labels: labels,
      datasets: jsonData.campañas.map((campaign, index) => ({
        label: campaign.nombre,
        data: labels.map(key => campaign[key]),
        borderColor: index === 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)', // Red for the first, Blue for the second
        backgroundColor: index === 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)', // Red for the first, Blue for the second
        borderWidth: 1
      }))
    };

    const justImpressions = {
      labels: jsonData.campañas.map(camp => camp.nombre),
      datasets: [
        {
          label: "Impresiones",
          data: jsonData.campañas.map(camp => camp.impresiones),
          borderColor: ['rgba(255, 99, 132, 1)' , 'rgba(54, 162, 235, 1)'], // Red for the first, Blue for the second
          backgroundColor: ['rgba(255, 99, 132, 0.2)' , 'rgba(54, 162, 235, 0.2)'], // Red for the first, Blue for the second
          borderWidth: 1

        }
      ]
    }

    const justClicks = {
      labels: jsonData.campañas.map(camp => camp.nombre),
      datasets: [
        {
          label: "Clics",
          data: jsonData.campañas.map(camp => camp.clics),
          borderColor: ['rgba(255, 99, 132, 1)' , 'rgba(54, 162, 235, 1)'], // Red for the first, Blue for the second
          backgroundColor: ['rgba(255, 99, 132, 0.2)' , 'rgba(54, 162, 235, 0.2)'], // Red for the first, Blue for the second
          borderWidth: 1

        }
      ]
    }

    const justConversions = {
      labels: jsonData.campañas.map(camp => camp.nombre),
      datasets: [
        {
          label: "Conversiones",
          data: jsonData.campañas.map(camp => camp.conversiones),
          borderColor: ['rgba(255, 99, 132, 1)' , 'rgba(54, 162, 235, 1)'], // Red for the first, Blue for the second
          backgroundColor: ['rgba(255, 99, 132, 0.2)' , 'rgba(54, 162, 235, 0.2)'], // Red for the first, Blue for the second
          borderWidth: 1
        }
      ]
    }

    const justCost = {
      labels: jsonData.campañas.map(camp => camp. nombre),
      datasets: [
        {
          label: "Costo",
          data: jsonData.campañas.map(camp => camp.costo),
          borderColor: ['rgba(255, 99, 132, 1)' , 'rgba(54, 162, 235, 1)'], // Red for the first, Blue for the second
          backgroundColor: ['rgba(255, 99, 132, 0.2)' , 'rgba(54, 162, 235, 0.2)'], // Red for the first, Blue for the second
          borderWidth: 1
        }
      ]
    }
    
    console.log(graphData);

    console.log("Graph data: ", graphData)

    const options = {}

    const charts = {
      graphData,
      justImpressions,
      justClicks,
      justConversions,
      justCost
    }

    return(
        <div className={styles.mainContainerAds}>
          <div> 
              Ver:
            
            <select
            value={selectedChart}
            onChange={(e)=>setSelectedChart(e.target.value)}
            >
              <option value="graphData">Todo</option>
              <option value="justImpressions">Impresiones</option>
              <option value="justClicks">Clics</option>
              <option value="justConversions">Conversiones</option>
              <option value="justCost">Costo</option>
            </select>
          </div>
            <Bar data={charts[selectedChart]} options={options} /> 
        </div>
    )
}

export default GoogleAds;