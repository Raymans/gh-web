import PropTypes from 'prop-types';
import { Anchor, Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';


const StyledLayoutSider = styled(Layout.Sider)`
  position: absolute !important;
  left: -200px;
  min-width: 160px !important;
  width: 160px !important;
  background-color: ${(props) => props.theme.color.brand.background};
`;

const AnchorSider = (props) => {
  const {
    anchors = []
  } = props;
  return (
    <StyledLayoutSider>
      <Anchor offsetTop={60}>
        {
          anchors.map((anchor) => (
            anchor &&
            <Anchor.Link key={anchor.href} href={anchor.href} title={anchor.title}>
              {anchor.subAnchors?.map((sub) => (
                <Anchor.Link key={sub.href} href={sub.href} title={sub.title}/>
              ))}
            </Anchor.Link>
          ))
        }

      </Anchor>
    </StyledLayoutSider>
  );
};
export default AnchorSider;

AnchorSider.propTypes = {
  anchors: PropTypes.array
};
