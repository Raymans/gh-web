import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'gatsby-plugin-intl';
import styled from 'styled-components';

const StyledBreadcrumb = styled.div`
  padding: 50px 0 0 20px;
`;
const CustomBreadcrumb = ({
  crumbs = [{
    label: 'List Interviews',
    path: '/interviews',
  }],
}) => (
  <StyledBreadcrumb>
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link
          to="/"
        >
            Home
        </Link>
      </Breadcrumb.Item>
      {crumbs.map((crumb) => (
        <Breadcrumb.Item>
          <Link
            to={crumb.path}
          >
            {crumb.label}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </StyledBreadcrumb>
);
CustomBreadcrumb.propTypes = {};

export default CustomBreadcrumb;
