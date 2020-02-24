import PropTypes from 'prop-types'
import React from 'react'

import Article from '../components/Article'
import Register from '../components/Register'
import Headline from '../components/Article/Headline'
import Seo from '../components/Seo'
import { graphql } from 'gatsby'

const RegisterPage = props => {
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
          <Headline title="Register"/>
        </header>
        <Register/>
      </Article>
      <Seo facebook={facebook}/>
    </React.Fragment>
  )
}

RegisterPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default RegisterPage

//eslint-disable-next-line no-undef
export const query = graphql`
  query RegisterQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`
