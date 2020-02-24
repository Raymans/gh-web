import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import Article from '../components/Article'
import Headline from '../components/Article/Headline'
import Seo from '../components/Seo'
import Questions from '../components/Questions'
import { graphql } from 'gatsby'

const QuestionsPage = props => {
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
          <Headline>
            <span>Questions</span><a href="/question">Create</a>
          </Headline>
        </header>
        <Questions/>
      </Article>

      <Seo facebook={facebook}/>
    </React.Fragment>
  )
}

QuestionsPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default QuestionsPage

//eslint-disable-next-line no-undef
export const query = graphql`
  query QuestionsQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`
