import React from 'react'
import { Link } from "gatsby"
import Layout from '../components/layout'
// import SEO from "../components/seo"
import "../styles/Debrief.css"

const Debrief = () => {
    return (
        <div className="Debrief">
            <Layout >
                {/* <SEO title="Debrief" /> */}
                <h1>
                    Debriefing/Additional Information
                    Permission to Use Information Collected in a Research Study
                    Clemson University
                </h1>

                <br />

                <h2>Attitudes About Technology and Team Performance</h2>

                <p>
                    Thank you for taking part in this study. You may have been told at the beginning of the experimental task that one of your teammates was an automated bot.
                    Now that you have completed the study, we want to let you know that you may have received a different artificial teammate than other participants.
                    The artificial teammates used different ethical frameworks to make their decisions.  We did not disclose all relevant information to you during the study because we wanted to see your perception and preference of the agent regardless of preconceived notions about ethical frameworks.
                </p>

                <br />

                <p>If you would like a copy of the results of the study once it is completed, you may contact Chris Flathmann at cflathm@g.clemson.edu. </p>

                <br />

                <p>
                    Please remember that someone you know may also be signed up for this study. If they knew that their agent may be different, they may try to determine the specific framework used which could lead to bias.
                    Therefore, we would appreciate it if you would not share this additional information with others who may be taking part in this study.
                </p>

                <br />

                <h2>Please go back to the qualtrics webpage and enter the password : "ethpass404" to finish the survey.</h2>
            </Layout>
        </div>
    )
}

export default Debrief;
