import React from "react"
import styles from "./Home.module.css"
import { useHistory } from "react-router-dom"
import Card from "../../components/shared/Card/Card"
import Button from "../../components/shared/Button/Button"

const Home = () => {
   // const signInLinkStyle = {
   //    color: "#0077ff",
   //    fontweight: "bold",
   //    textDecoration: "none",
   //    marginLeft: "10px",
   // }

   const history = useHistory()

   function startRegister() {
      history.push("/authenticate")
      console.log("button clicked")
   }

   return (
      <div className={styles.cardWrapper}>
         <Card title="Welcome to Codershouse!" icon="logo">
            <div className={styles.card}>
               <p className={styles.text}>
                  We’re working hard to get Codershouse ready for everyone!
                  While we wrap up the finishing youches, we’re adding people
                  gradually to make sure nothing breaks
               </p>
               <div>
                  <Button onClick={startRegister} text="Let's Go" />
               </div>
               <div className={styles.signin}>
                  <span className={styles.hasInvite}>Have an invite text?</span>
               </div>
            </div>
         </Card>
      </div>
   )
}

export default Home
