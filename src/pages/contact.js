import PropTypes from 'prop-types'
import React from 'react'

import Article from '../components/Article'
import Contact from '../components/Contact'
import Headline from '../components/Article/Headline'
import Seo from '../components/Seo'
import { graphql } from 'gatsby'

const ContactPage = props => {
  const {
    data: {
      site: {
        siteMetadata: {facebook}
      }
    }
  } = props

  return (
    <React.Fragment>
      <Article>
        <header>
          <Headline title="Contact"/>
        </header>
        <Contact/>
      </Article>
      <Seo facebook={facebook}/>
    </React.Fragment>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default ContactPage

//eslint-disable-next-line no-undef
export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`
