import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist.</p>
    <p>Please click "Ethical Frameworks Study" in the header to go back to the login page to try again.</p>
    {/* <Link to="/">Go back to the homepage</Link> */}
  </Layout>
)

export default NotFoundPage
