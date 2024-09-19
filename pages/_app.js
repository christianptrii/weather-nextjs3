import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'; // Untuk style global
import styles from '../styles/globals.module.css'; // Untuk CSS Modules

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;