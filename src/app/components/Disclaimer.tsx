"use client"

import Link from "next/link";
import styles from "./../components/Disclaimer.module.css";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Page from "../(auth)/sign-up/page";

const Disclaimer = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const disclaimerAgreed = Cookies.get("disclaimerAgreed");
    if (disclaimerAgreed) {
      setIsAgreed(true);
    }
  }, []);

  const handleAgree = () => {
    // Start fading out by setting `isFading` to true
    setIsFading(true);

    // Set a timeout to hide the disclaimer after 2 seconds (to match the transition time)
    setTimeout(() => {
      setIsAgreed(true);
      Cookies.set("disclaimerAgreed", "true", { expires: 365 });
    }, 2000);
  };

  return (
    <>
      {!isAgreed ? (
        <>
          {/* Background layer */}
          <div className={`${styles.disclaimerBackground} ${isFading ? styles.disclaimerHidden : ""}`}></div>
          {/* Modal layer */}
          <div className={`${styles.disclaimerContainer} ${isFading ? styles.disclaimerHidden : ""}`}>
            <div className={styles.disclaimerModal}>
              <div className={styles.textDisclaimer}>
                <h1>DISCLAIMER</h1>
                <p>
                  The creator of the game is not responsible for any items found in the hidden locations. All information provided in the game is intended for entertainment purposes only. Play at your own risk.
                </p>
                <div className={styles.yesNoDiv}>
                  <button onClick={handleAgree} className={styles.yesOption}>Understood</button>
                  <button className={styles.noOption}>What?!</button>
                </div>
                <Link className={styles.a} href="mailto:seekersmail@proton.me">seekersmail@proton.me</Link>
                <p style={{ fontSize: ".7rem", marginTop: "8px" }}>
                  We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : <Page />}
    </>
  );
}

export default Disclaimer;
