import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, Form, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';

const StyledAvatar = styled(Avatar)`
  margin-bottom: 15px;
  cursor: pointer;
`;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    callback(reader.result);
  });
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadImage = ({
  name,
  label
}) => {
  const [uploadImage, setUploadingImage] = useState({
    loading: false,
    imageUrl: 'https://avatars0.githubusercontent.com/u/5819635?s=400&u=28fed09b4c20e36c8dfa58063d3dedfa93bee04c&v=4'
  });

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setUploadingImage({
        ...uploadImage,
        loading: true
      });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => setUploadingImage({
        imageUrl,
        loading: false
      }));
    }
    getBase64(info.file.originFileObj, (imageUrl) => setUploadingImage({
      imageUrl,
      loading: false
    }));
  };
  const uploadButton = (
    <div>
      {uploadImage.loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <Form.Item
      name="avatar"
      label={label}
      valuePropName="originFileObj"
      // getValueFromEvent={normFile}
    >
      <Upload
        name="avatar"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <div>
          {uploadImage.imageUrl
            ? (
              <StyledAvatar
                size={150}
                src={uploadImage.imageUrl ? uploadImage.imageUrl : uploadButton}
              />
            ) : <StyledAvatar size={150} icon={<UserOutlined/>}/>}
        </div>
      </Upload>
    </Form.Item>
  );
};
UploadImage.propTypes = {
  name: PropTypes.string.isRequired
};

export default UploadImage;
