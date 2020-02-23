import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  background: ${props => props.theme.color.neutral.black};
  padding: ${props => props.theme.space.inset.default};
  padding-top: 0;
  padding-bottom: 120px;
  ul {
    list-style: none;
    text-align: center;
    padding: 0;
    li {
      color: ${props => props.theme.color.neutral.gray.g};
      font-size: ${props => props.theme.font.size.xxs};
      padding: ${props => props.theme.space.xxs} ${props => props.theme.space.s};
      position: relative;
      display: inline-block;

      &::after {
        content: "•";
        position: absolute;
        right: ${`calc(${props => props.theme.space.xs} * -1)`};
      }
      &:last-child::after {
        content: "";
      }
    }
  }
  @media (min-width: 1024px) {
    padding: 1.5em 1em;
  }
`

const Footer = props => {
  const {html} = props
  return (
    <React.Fragment>
      <StyledFooter dangerouslySetInnerHTML={{__html: html}}/>
    </React.Fragment>
  )
}

Footer.propTypes = {
  html: PropTypes.string
}
export default Footer
