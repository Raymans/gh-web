import React, { useState } from 'react';
import {
  Avatar, Button, Checkbox, Form, Input,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const Setting = () => {
  const [saving, setSaving] = useState(false);
  const handleUpdateSetting = () => {
    setSaving(true);
  };

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <Form layout="vertical" onFinish={onFinish} scrollToFirstError>
        <h2>Profile</h2>
        <FormItem name="avatar" label="Avatar" required>
          <Avatar
            size={150}
            src="https://avatars0.githubusercontent.com/u/5819635?s=400&u=28fed09b4c20e36c8dfa58063d3dedfa93bee04c&v=4"
          />
        </FormItem>
        <FormItem name="email" label="Email" rules={[{ type: 'email' }]} required>
          <Input defaultValue="raymanspeng@geekhub.tw" />
        </FormItem>
        <FormItem name="github" label="GitHub username">
          <Input defaultValue="raymans" />
        </FormItem>
        <FormItem name="company" label="Company">
          <Input defaultValue="GeekHub.TW" />
        </FormItem>
        <h2>Notification</h2>
        <Checkbox>
Receive email Notification when a new candidate start testing your
          interviews
        </Checkbox>

        <br />
        <Form.Item>
          <Button type="primary" onClick={handleUpdateSetting} loading={saving} htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
        <br />
      </Form>

    </>
  );
};
Setting.propTypes = {};

export default Setting;
