import React from 'react';
import { Breadcrumb } from 'antd';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import styled from 'styled-components';

const StyledBreadcrumb = styled.div`
  padding: 30px 0 0 20px;
`;
const CustomBreadcrumb = ({
  crumbs = [{
    label: <FormattedMessage defaultMessage="List Interviews"/>,
    path: '/interviews'
  }]
}) => (
  <StyledBreadcrumb>
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link
          to="/"
        >
          <FormattedMessage defaultMessage="Home"/>
        </Link>
      </Breadcrumb.Item>
      {crumbs.map((crumb, i) => ((crumbs.length === i + 1) ? (
        <Breadcrumb.Item key={crumb.path}>
          {crumb.label}
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item key={crumb.path}>
          <Link
            to={crumb.path}
          >
            {crumb.label}
          </Link>
        </Breadcrumb.Item>
      )))}
    </Breadcrumb>
  </StyledBreadcrumb>
);
CustomBreadcrumb.propTypes = {};

export default CustomBreadcrumb;
