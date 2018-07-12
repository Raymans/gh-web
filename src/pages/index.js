import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Blog from "../components/Blog";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import { Row, Col, Icon } from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faNode, faJava, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';


class IndexPage extends React.Component {
  separator = React.createRef();

  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      data: {
        posts: { edges: posts = [] },
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Hero scrollToContent={this.scrollToContent} backgrounds={backgrounds} theme={theme} />
          )}
        </ThemeContext.Consumer>

        <hr ref={this.separator} />
        <div style={{padding: "0px 50px;"}}>
          <h1>LANGUAGE</h1>
          <ThemeContext.Consumer>
            {theme => {
              return <Row type="flex" justify="space-around" style={{"margin": "50px 60px"}}>
                <Col span={6}><FontAwesomeIcon icon={faHtml5} size="7x" color="#08c"/><h2>HTML5</h2></Col>
                <Col span={6}><FontAwesomeIcon icon={faJs} size="7x" color="#08c"/><h2>JavaScript</h2></Col>
                <Col span={6}><FontAwesomeIcon icon={faNode} size="7x" color="#08c"/><h2>NodeJs</h2></Col>
                <Col span={6}><FontAwesomeIcon icon={faJava} size="7x" color="#08c" spin={true}/><h2>Java</h2></Col>
              </Row>
            }}
          </ThemeContext.Consumer>
        </div>
        <Seo facebook={facebook} />
        <style jsx>{`
          h1{
            font-weight: 200;
            padding-top: 50px;
            text-align: center;
          }
          hr {
            margin: 0;
            border: 0;
          }
          :global(.ant-col-6) {
            text-align: center;
          }
          :global(.ant-col-6 > h2) {
            margin-top: 20px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const guery = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            author
            cover {
              children {
                ... on ImageSharp {
                  sizes(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpSizes_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
