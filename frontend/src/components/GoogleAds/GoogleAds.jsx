import { useState, useEffect } from "react"
import axios from 'axios'
import { lineChartData } from "../../assets/fakedata";
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
    
    console.log(graphData);

    console.log("Graph data: ", graphData)

    const options = {}

    return(
        <div>
            <Bar options={options} data={graphData} />
        </div>
    )
}

export default GoogleAds;