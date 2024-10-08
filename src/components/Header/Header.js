import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { FontLoadedContext, ScreenWidthContext } from '../../layouts';
import config from '../../../content/meta/config';
import Menu from '../Menu';
import avatar from '../../images/svg-icons/logo_01.svg';
import styled from 'styled-components';

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  top: 0;
  width: 100%;
  position: absolute;
  background-color: #1088ae;
  height: ${props => props.theme.header.height.homepage};
  justify-content: space-between;
  transition: all 0.5s;
  padding: 0 150px;
  z-index: 100;

  @media (max-width: 1024px) {
    padding: 0;
  }

  @media (max-width: 768px) {
    padding: 0 30px;
    height: 50px;
  }

  &:not(.homepage) {
    h1, h2 {
      color: ${props => props.theme.text.color.primary};
    }
  }

  &.fixed {
    height: ${props => props.theme.header.height.fixed};
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

  img {
    width: 100%;
    height: 100px;
    transition: all 0.5s;
  }

  .fixed & img {
    height: 80px;
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

    return `${fixed} ${homepage}`;
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
