import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SwapLeftOutlined } from '@ant-design/icons';
import { navigate } from 'gatsby-link';
import { Tooltip } from 'antd';
import { useIntl } from 'gatsby-plugin-intl';
import useGetStarted from '../../hooks/useGetStarted';

const H1 = styled.h1`
  white-space: nowrap;
  font-weight: 200;
  margin: 20px auto 20px;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
  font-size: 40px;
  animation-name: headlineEntry;
  animation-duration: ${(props) => props.theme.time.duration.long};
  @media (min-width: 768px) {
    font-size: ${(props) => `calc(${props.theme.font.size.xl} * 1.2)`};
  }
  @media (min-width: 1024px) {
    font-size: ${(props) => `calc(${props.theme.font.size.xl} * 1.4)`};
  }

  a {
    font-weight: ${(props) => props.theme.font.weight.standard};
    font-size: 0.5em;
    letter-spacing: 0;
    margin-left: 20px;
  }
`;

const StyledHeaderSpan = styled.span`
  margin: 0 10px;
`;

const StyledSubHeader = styled.div`
  text-align: right;
  line-height: 1;
  margin-right: 29px;
  min-height: 36px;

  div {
    float: left;
  }

  button {
    margin-right: 5px;
  }
`;
const Headline = (props) => {
  const intl = useIntl();
  const {
    title,
    children
  } = props;
  const { isGetStarted } = useGetStarted();
  if (isGetStarted) {
    return <></>;
  }
  return (
    <header>
      <section>
        <H1>

          {/*{title && <StyledHeaderSpan>{title}</StyledHeaderSpan>}*/}
          <StyledSubHeader>
            <div>
              <Tooltip title={intl.formatMessage({ defaultMessage: 'Go back' })}>
                <a onClick={() => navigate(-1)}><SwapLeftOutlined/></a>
              </Tooltip>
            </div>
            {children}</StyledSubHeader>
        </H1>
      </section>
    </header>
  );
};

Headline.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default Headline;
