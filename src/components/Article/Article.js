import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledArticle = styled.article`
    padding: ${props => props.theme.space.inset.default};
    margin: 0 auto;
    @media (min-width: 768px) {
      padding: ${props => `calc(${props.theme.space.default}) calc(${props.theme.space.default} * 2)`};
      max-width: ${props => props.theme.text.maxWidth.tablet};
    }
    @media (min-width: 1024px) {
      padding: ${props => `calc(${props.theme.space.default} * 2 + 30px) 0 calc(${props.theme.space.default} * 2)`};
      max-width: ${props => props.theme.text.maxWidth.desktop};
    }
  `

const Article = props => {
  const {children} = props
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
