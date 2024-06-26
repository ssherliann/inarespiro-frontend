import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.logo}>
                    <Link to="/">inarespiro</Link>
                </div>
                <ul className={styles.social}>
                    <Link to='https://www.instagram.com/ssherliann?igsh=OHY3YXR4bnZlODVu&utm_source=qr'>INSTAGRAM</Link>
                    <Link to='https://www.facebook.com/profile.php?id=100017152063799'>FACEBOOK</Link>
                </ul>
                <ul className={styles.menu}>
                    <li>
                        <Link to="/products">PRODUCTS</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.bottom}>
                <p className={styles.legalLinks}>
                    Privacy Policy<br />
                    Public Offering Agreement
                </p>
                <p className={styles.copyrightInfo}>
                    2024 inarespiro<br />
                    © All rights reserved
                </p>
            </div>
        </div>
    );
}


