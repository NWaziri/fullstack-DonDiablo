import React from "react";

import StepBox from "../../components/StepBox/StepBox";
import styles from "./Home.module.css"
import background from "../../assests/background.jpg"
import Input from "../../components/Input/Input";

function Home() {
    return (
        <>

            <div className={styles.container}>
                <h1> Hoe upload je jouw muziek demo? </h1>
                <StepBox
                    divClassName={styles['box']}
                    header="Stap 1: Registreren"
                    text="Maak een account aan om jouw demo te uploaden."
                    headerClassName={styles["header-text"]}
                    paragraphClassName={styles['text']}
                >
                </StepBox>
                <StepBox
                    divClassName={styles['box']}
                    header="Stap 2: Inloggen"
                    text="Login met jouw gebruikersnaam en wachtwoord."
                    headerClassName={styles["header-text"]}
                    paragraphClassName={styles['text']}
                >
                </StepBox>
                <StepBox
                    divClassName={styles['box']}
                    header="Stap 3: Uploaden"
                    text="Na het inloggen kun je via je profiel pagina jouw muziek file uploaden, binnen 24 uur ontvang je feedback!"
                    headerClassName={styles["header-text"]}
                    paragraphClassName={styles['text']}
                >
                </StepBox>
            </div>

        </>
    )
}

export default Home;