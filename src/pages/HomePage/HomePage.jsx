import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export default function HomePage() {
    return(
        <div>
            <section className={styles.collectionSection}>
                <Link to='/products'><h1 className={styles.title}>Discover Our Products</h1></Link>
            </section>
        </div>
    )
}
