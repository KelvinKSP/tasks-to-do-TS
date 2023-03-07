import React from 'react';
import styles from "./styles.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                <span> KelvinKSP </span> @2023
            </p>     
            <p>
                TypeScript + <span className={styles.react}> React </span>
            </p>
        
        </footer>
    )
}


export default Footer;