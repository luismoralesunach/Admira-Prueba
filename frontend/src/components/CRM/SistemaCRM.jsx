import axios from 'axios'
import { useState, useEffect } from 'react';
import ViewsSess from '../GoogleAnalytics/ViewsSess/ViewsSess';
import SessBounce from '../GoogleAnalytics/SessionsBounce/SessionsBounce';
import BounceRate from '../GoogleAnalytics/BounceRate/BounceRate';
import AgeDemo from '../GoogleAnalytics/AgeDemo/AgeDemo';
import GenderDemo from '../GoogleAnalytics/GenderDemo/GenderDemo';
import { lineChartData } from '../../assets/fakedata';
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

const SistemaCRM = ()=>{


    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

 
    useEffect(()=>{
       const fetchData = async()=>{
        try {
            const {data} = await axios.get(`/json/sistemacrm.json`)
            if(data) setData(data)
                setLoading(false)
            
        } catch (error) {
            setError(error.message)
            console.log("Error in fetching sistema crm: ", error)
        }
       }

       fetchData()
    },[loading])

    if(loading) return <div>Loading...</div>

    console.log("Data json: ", data)

    const leadsBarGraph = data.leads.map((lead, index)=>{
        const labels = Object.keys(lead).slice(1)
        const values = Object.values(lead).slice(1)
        const name = Object.values(lead)[0]

        const graphData = {
            labels: labels,
            datasets: [
                {
                    label: name,
                    data: values,
                    borderColor:  ['rgba(255, 99, 132, 1)' , 'rgba(54, 162, 235, 1)'], // Red for the first, Blue for the second
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'], // Red for the first, Blue for the second
                    borderWidth: 1
                }
            ]
        }
        return(
            <div key={index}>
                <Bar data={graphData} />
            </div>
        )
    })

    return(
        <div>
            Sistema CRM component here
            {leadsBarGraph}
            
        </div>
    )
}

export default SistemaCRM;