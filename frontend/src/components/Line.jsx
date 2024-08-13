import {Line} from 'react-chartjs-2'
import { lineChartData } from '../assets/fakedata';
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

const LineGraph = ()=>{

    const options = {}





    return( 
    <Line options={options} data={lineChartData}/>


    )

}

export default LineGraph;