
import PropTypes from 'prop-types';
import { Affix, Menu, Layout } from 'antd';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import React from 'react';
import styled from 'styled-components';
import SubMenu from 'antd/lib/menu/SubMenu';

const FilterSider = (props) => {
  const { onClick } = props;
  return (
    <Layout.Sider theme="light">
      <Affix offsetTop={60}>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['explore']}
          mode="inline"
          style={{ height: '100%' }}
        >
          <SubMenu
            key="explore"
            title={(
              <span>
                <LegacyIcon type="mail" />
                <span>Explore</span>
              </span>
          )}
          >
            <Menu.Item key="1">All</Menu.Item>
            <Menu.Item key="2">JavaScript</Menu.Item>
          </SubMenu>
          <Menu.Item key="saved">Saved</Menu.Item>
          <Menu.Item key="mine">Mine</Menu.Item>
        </Menu>
      </Affix>
    </Layout.Sider>

  );
};
export default FilterSider;

FilterSider.propTypes = {
  onClick: PropTypes.func,
};
