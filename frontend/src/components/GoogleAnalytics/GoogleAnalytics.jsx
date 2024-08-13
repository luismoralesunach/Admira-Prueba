import { useState } from "react";
import GenderDemo from "./GenderDemo/GenderDemo";
import AgeDemo from "./AgeDemo/AgeDemo";
import ViewsSess from "./ViewsSess/ViewsSess";
import SessBounce from "./SessionsBounce/SessionsBounce";
import BounceRate from "./BounceRate/BounceRate";
import './GoogleAnalytics.css'; // Import your CSS file

const GoogleAnalytics = () => {
    const [selectedComponent, setSelectedComponent] = useState("all");

    const renderComponent = () => {
        switch (selectedComponent) {
            case "viewsSess":
                return <ViewsSess />;
            case "sessBounce":
                return <SessBounce />;
            case "bounceRate":
                return <BounceRate />;
            case "ageDemo":
                return <AgeDemo />;
            case "genderDemo":
                return <GenderDemo />;
            default:
                return (
                    <>
                        <ViewsSess />
                        <SessBounce />
                        <BounceRate />
                        <AgeDemo />
                        <GenderDemo />
                    </>
                );
        } 
    };
 
    return (
        <div className="container">
            <label htmlFor="componentSelect" className="select-label">Gráfica - Ver:</label>
            <select
                id="componentSelect"
                className="component-select"
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value)}
            >
                <option value="all">Todas</option>
                <option value="viewsSess">Vistas con Sesiones</option>
                <option value="sessBounce">Sesiones con tasa de Rebote</option>
                <option value="bounceRate">Tasa de Rebote</option>
                <option value="ageDemo">Demografía - Edad</option>
                <option value="genderDemo">Demografía - Género</option>
            </select>

            <div className="chart-container">
                {renderComponent()}
            </div>
        </div>
    );
};

export default GoogleAnalytics;
