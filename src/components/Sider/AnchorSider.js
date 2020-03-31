import PropTypes from 'prop-types';
import { Anchor, Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';


const StyledLayoutSider = styled(Layout.Sider)`
  position: absolute;
  left: 60px;
  min-width: 160px !important;
  width: 160px !important;
`

const AnchorSilder = (props) => {
  const { anchors = [] } = props;
  return (
    <StyledLayoutSider theme="light">
      <Anchor offsetTop={60}>
        {
          anchors.map((anchor) => (
            <Anchor.Link key={anchor.href} href={anchor.href} title={anchor.title} />
          ))
        }

      </Anchor>
    </StyledLayoutSider>
  );
};
export default AnchorSilder;

AnchorSilder.propTypes = {
  anchors: PropTypes.array,
};
