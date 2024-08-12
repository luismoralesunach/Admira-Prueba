import { useState, useEffect } from "react"
import axios from 'axios'


const MetaAds = ()=>{

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(()=>{
       const fetchData = async()=>{
        try {
            const {data} = await axios.get(`/json/metaads.json`)
            if(data) setData(data)
                setLoading(false)
            
        } catch (error) {
            setError(error.message)
            console.log("Error in fetching meta ads: ", error)
        }
       }

       fetchData()
    },[loading])

    if(loading) return <div>Loading...</div>

    console.log("data in meta ads: ", data)

    return(
        <div>
            meta ads component here
        </div>
    )
}

export default MetaAds;