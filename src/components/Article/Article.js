import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Article = props => {
  const {children, theme} = props

  const StyledArticle = styled.article`
    padding: ${theme.space.inset.default};
    margin: 0 auto;
    @media (min-width: 768px) {
      padding: ${`calc(${theme.space.default}) calc(${theme.space.default} * 2)`};
      max-width: ${theme.text.maxWidth.tablet};
    }
    @media (min-width: 1024px) {
      padding: ${`calc(${theme.space.default} * 2 + 30px) 0 calc(${
    theme.space.default
  } * 2)`};
      max-width: ${theme.text.maxWidth.desktop};
    }
  `
  return (
    <React.Fragment>
      <StyledArticle className="article">{children}</StyledArticle>
    </React.Fragment>
  )
}

Article.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
}

export default Article
