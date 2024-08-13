import { useState, useEffect } from "react";

import Reach from "./Reach";
import styles from './MetaAds.module.css'; // Import the CSS module
import Participation from "./Participation/Participation";
import Cost from "./Cost/Cost";
import Conversion from "./Conversion/Conversion";
import All from "./All/All";


const MetaAds = () => {

    const [selectedComponent, setSelectedComponent] = useState('all')

    const renderComponent = ()=>{
        switch(selectedComponent){
            case "AllComp":
                return <All/>;
            case "Reach":
                return <Reach/>;
            case "Participation":
                return <Participation/>;
            case "Cost":
                return <Cost/>;
            case "Conversion":
                return <Conversion/>
            default:
                return(
                    <>
                    <All/>
                    <Reach/>
                    <Participation/>
                    <Cost/>
                    <Conversion/>
                    </>
                )
        }
    }

    return (
        <div className={styles.container}>
          <label className={styles.selectLabel}>Grafica Ver: </label>
          <select
          onChange={(e)=>setSelectedComponent(e.target.value)}
          value={selectedComponent}
          className={styles.componentSelect}
          >
            <option value="all">Todas</option>
            <option value="AllComp">Comparacion de Anuncios</option>
            <option value="Reach">Alcance</option>
            <option value="Participation">Participación</option>
            <option value="Cost">Costo Publicidad</option>
            <option value="Conversion">Conversiones</option>

          </select>
          <div className={styles.chartContainer}>
            {renderComponent()}
          </div>
           
        </div>
    );
};

export default MetaAds;
