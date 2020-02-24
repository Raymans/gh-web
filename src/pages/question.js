import PropTypes from 'prop-types'
import React from 'react'

import Article from '../components/Article'
import Headline from '../components/Article/Headline'
import Seo from '../components/Seo'
import Question from '../components/Question'
import { graphql } from 'gatsby'

import { Select } from 'antd'

const Option = Select.Option

const QuestionPage = props => {
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
          <Headline title="Create Question"/>
        </header>
        <Question/>
      </Article>
      <Seo facebook={facebook}/>
    </React.Fragment>
  )
}

QuestionPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default QuestionPage

//eslint-disable-next-line no-undef
export const query = graphql`
  query QuestionQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`
