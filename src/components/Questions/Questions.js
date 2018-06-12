/* eslint no-unused-vars: 0 */

import { Card, Tag, Avatar, Divider, List } from 'antd';
import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../../layouts";

const Questions = props => {
  const data = [
    {
      title: 'Title 1',
      src: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A'
    },
    {
      title: 'Title 2',
      src: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A'
    },
    {
      title: 'Title 3',
      src: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c50.50.621.621/s240x240/941679_10151399630726945_727466790_n.jpg?_nc_cat=0&oh=067ece71da987d55f449584d09353d84&oe=5BB96159'
    },
    {
      title: 'Title 4',
      src: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c50.50.621.621/s240x240/941679_10151399630726945_727466790_n.jpg?_nc_cat=0&oh=067ece71da987d55f449584d09353d84&oe=5BB96159'
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];
  return (
    <React.Fragment>
      <div className="form">
        <ThemeContext.Consumer>
          {theme => (
            
            <div>
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Card title={item.title}>
                      <Tag color="blue">JavaScript</Tag>
                      <Tag color="blue">closure</Tag>
                      <p>Question description.............</p>
                      <Divider orientation="left">Author</Divider>
                      <Avatar src={item.src} >Raymans</Avatar>
                      <span>Raymans Peng@DigitalRiver</span>
                    </Card>
                  </List.Item>
                )}
              />
              <Card title="Question title" style={{ width: 300 }}>
                <Tag color="blue">python</Tag>
                <p>Question description.............</p>
                <Divider orientation="left">Author</Divider>
                <Avatar src="bac" >Joe</Avatar>
                <span>Joe Lin@Apple</span>
              </Card>
            </div>
          )}
        </ThemeContext.Consumer>
      </div>
    </React.Fragment>
  );
};
Questions.propTypes = {
};

export default Questions;
