import { Link } from "react-router-dom";
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return(
        <div className={styles.sidebar}>
            <ul>
                <li><Link to={'/dashboard/googleads'}>Google Ads</Link></li>
                <li><Link to={'/dashboard/googleanalytics'}>Google Analytics</Link></li>
                <li><Link to={'/dashboard/metaads'}>Meta Ads</Link></li>
                <li><Link to={'/dashboard/sistemacrm'}>Sistema CRM</Link></li>
                
            </ul>
        </div>
    )
};

export default Sidebar;
