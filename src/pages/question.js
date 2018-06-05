import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Contact from "../components/Contact";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

import { Input, Select, Icon } from 'antd';
const Option = Select.Option;

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 90 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" style={{ width: 80 }}>
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

const Contact1Page = props => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Questions" theme={theme} />
            </header>
            <div>
              <div style={{ marginBottom: 16 }}>
                <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Input addonAfter={<Icon type="setting" />} defaultValue="mysite" />
              </div>
            </div>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

Contact1Page.propTypes = {
  data: PropTypes.object.isRequired
};

export default Contact1Page;

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
`;
