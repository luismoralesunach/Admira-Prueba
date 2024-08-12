import axios from 'axios'
import { useState, useEffect } from 'react';

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

    return(
        <div>
            Sistema CRM component here
        </div>
    )
}

export default SistemaCRM;