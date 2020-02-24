import React from 'react'
import PropTypes from 'prop-types'

import Seo from '../components/Seo'
import Article from '../components/Article'
import Page from '../components/Page'
import { graphql } from 'gatsby'

const PageTemplate = props => {
  const {
    data: {
      page,
      site: {
        siteMetadata: {facebook}
      }
    }
  } = props

  return (
    <React.Fragment>
      <Article>
        <Page page={page}/>
      </Article>
      <Seo data={page} facebook={facebook}/>
    </React.Fragment>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired
}

export default PageTemplate

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`
