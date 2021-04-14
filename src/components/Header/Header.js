import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { FontLoadedContext, ScreenWidthContext } from '../../layouts';
import config from '../../../content/meta/config';
import Menu from '../Menu';
import avatar from '../../images/png/logo.png';
import styled from 'styled-components';

const StyledHeader = styled.header`
      align-items: center;
      display: flex;
      height: ${props => props.theme.header.height.default};
      top: 0;
      width: 100%;
      position: absolute;
      background-color: transparent;
      height: ${props => props.theme.header.height.homepage};
      justify-content: space-between;
      transition: padding 0.5s;
      padding: 40px;
      z-index: 100;
      &:not(.homepage) {
        h1, h2 {
          color: ${props => props.theme.text.color.primary};
        }
      }
      &.fixed {
        height: ${props => props.theme.header.height.fixed};
        background-color: ${props => props.theme.color.neutral.gray.a};
        left: 0;
        padding: 0 ${props => props.theme.space.m};
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1;
        h1 {
          margin: ${props => props.theme.space.stack.xxs};
          color: ${props => props.theme.text.color.primary};
        }
        h2 {
          display: none;
        }
      }
    `;
const H1 = styled.h1`
      font-size: ${props => props.theme.font.size.m};
      font-weight: ${props => props.theme.font.weight.standard};
      margin: ${props => props.theme.space.stack.xs};
      color: ${props => props.theme.color.neutral.gray.a};
    `;
const H2 = styled.h2`
      font-weight: ${props => props.theme.font.weight.standard};
      font-size: ${props => props.theme.font.size.xxs};
      letter-spacing: 0;
      margin: 0;
      color: ${props => props.theme.color.neutral.gray.d};
    `;
const LogoLink = styled(Link)`
      align-items: center;
      display: flex;
      color: ${props => props.theme.text.color.primary};
      text-align: left;
      flex-direction: row;
      flex-shrink: 0;
      width: auto;
    `;
const Logo = styled.div`
      display: inline-block;
      margin: ${props => props.theme.space.inline.default};
      overflow: hidden;
      transition: all 0.5s;
      flex-shrink: 0;
      border: none;
      height: 60px;
      width: 60px;
      img {
        width: 100%;
      }
      .fixed & {
        height: 36px;
        width: 36px;
      }
    `;

const Sensor = styled.div`
      display: block;
      position: absolute;
      bottom: 0;
      z-index: 1;
      left: 0;
      right: 0;
      height: 1px;
      top: ${props => props.path === '/' ? props.theme.header.height.homepage : props.theme.header.height.default};
    `;

class Header extends React.Component {
  state = {
    fixed: false
  };

  visibilitySensorChange = val => {
    if (val) {
      this.setState({ fixed: false });
    } else {
      this.setState({ fixed: true });
    }
  };

  getHeaderSize = () => {
    const fixed = this.state.fixed ? 'fixed' : '';
    const homepage = this.props.path === '/' ? 'homepage' : '';

    //return `${fixed} ${homepage}`;
    return `${homepage}`;
  };

  render() {
    const {
      pages,
      path
    } = this.props;
    const { fixed } = this.state;
    return (
      <React.Fragment>
        <StyledHeader className={`${this.getHeaderSize()}`}>
          <LogoLink to="/">
            <Logo>
              <img src={avatar} alt={config.siteTitle}/>
            </Logo>
          </LogoLink>
          <FontLoadedContext.Consumer>
            {loaded => (
              <ScreenWidthContext.Consumer>
                {width => (
                  <Menu
                    path={path}
                    fixed={fixed}
                    screenWidth={width}
                    fontLoaded={loaded}
                    pages={pages}
                  />
                )}
              </ScreenWidthContext.Consumer>
            )}
          </FontLoadedContext.Consumer>
        </StyledHeader>
        <VisibilitySensor onChange={this.visibilitySensorChange}>
          <Sensor path={path}/>
        </VisibilitySensor>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
};

export default Header;
