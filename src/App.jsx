import styles from './scss/app.module'
import './scss/global'
import img from './sample-img.jpg';
import { ReactComponent as Logo } from './samplesvg.svg';

function App () {
  return <>
    <h2 className={styles.red}>This is our React application!</h2>
    <img src={img} alt="sample image" />
    <Logo />
  </>
}

export default App;