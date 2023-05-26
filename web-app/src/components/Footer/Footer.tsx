import {Footer, Logo, Column, Splashphrase } from "./Footer.styled";
import PinMeLogo from "../../media/logo.png";

const splashphrases = [
    "D'humeur vagabonde ? 😏",
    "L'important c'est le voyage, pas la destination 😉",
    "On fait un truc ce soir ? 🥂",
    "PAS une appli de rencontres coquines ! 😳",
    "Encore quelques mètres 💪",
]


const BaseFooter = () => {
    return (
        <Footer>
            <Column>
                <Logo src={PinMeLogo} alt="logo-app" />
                <Splashphrase>{splashphrases[Math.floor(Math.random()*splashphrases.length) ]}</Splashphrase>
            </Column>
        </Footer> 
    )
}

export default BaseFooter;