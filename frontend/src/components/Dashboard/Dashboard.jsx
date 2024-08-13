import Sidebar from "../Sidebar/Sidebar";
import GoogleAds from "../GoogleAds/GoogleAds";
import GoogleAnalytics from '../GoogleAnalytics/GoogleAnalytics';
import MetaAds from '../MetaAds/MetaAds';
import SistemaCRM from '../CRM/SistemaCRM';
import { Routes, Route } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Routes>
                    <Route path="/googleads" element={<GoogleAds />} />
                    <Route path="/googleanalytics" element={<GoogleAnalytics />} />
                    <Route path="/metaads" element={<MetaAds />} />
                    <Route path="/sistemacrm" element={<SistemaCRM />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
