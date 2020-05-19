import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'gatsby-plugin-intl';
import styled from 'styled-components';
import { useBreadcrumb, BreadcrumbContext } from 'gatsby-plugin-breadcrumb';

const StyledBreadcrumb = styled.div`
  padding: 50px 0 0 20px;
`;
const CustomBreadcrumb = ({ location, label: crumbLabel, separator: crumbSeparator = ' / ' }) => {
  const { crumbs: crumbsContext, updateCrumbs } = React.useContext(BreadcrumbContext);
  console.log(crumbsContext);
  if (!crumbLabel) {
    return <></>;
  }

  const { crumbs } = useBreadcrumb({
    location,
    crumbLabel,
    crumbSeparator,
  });

  useEffect(() => {
    // crumbs[crumbs.length - 1].crumbLabel = crumbLabel;
  }, [crumbLabel]);
  return (
    <StyledBreadcrumb>
      <Breadcrumb>
        {crumbs.map((crumb) => (
          <Breadcrumb.Item>
            <Link
              to={crumb.pathname}
              style={{ ...crumb.crumbStyle }}
              activeStyle={{ ...crumb.crumbActiveStyle }}
            >
              {crumb.crumbLabel}
            </Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </StyledBreadcrumb>
  );
};
CustomBreadcrumb.propTypes = {};

export default CustomBreadcrumb;
