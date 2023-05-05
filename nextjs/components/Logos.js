import styles from './Logos.module.css';

function Logos() {
  return (
    <div className={styles.logosContainer}>
      <a href="https://illinois.edu/" target="_blank">
        <img src="/images/UIUC-logo.png" className="logo" alt="Illinois logo" style={{height: '100px' }}/>
      </a>
      <a href="https://reactjs.org" target="_blank">
        <img src="/images/react-logo.svg" className="logo" alt="React logo" style={{height: '70px' }}/>
      </a>
      <a href="https://nodejs.org" target="_blank">
        <img src="/images/node-logo.png" className="logo" alt="Nodejs logo" style={{height: '70px', marginLeft: '10px'}}/>
      </a>
      <a href="https://www.mysql.com" target="_blank">
        <img src="/images/mysql-logo.png" className="logo" alt="MySQL logo" style={{height: '70px', marginLeft: '10px'}}/>
      </a>
    </div>
  )
}

export default Logos;
