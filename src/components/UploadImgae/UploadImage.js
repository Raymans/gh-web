import React, { useEffect, useState } from 'react';
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
  label,
  imageUrl
}) => {
  const [uploadImage, setUploadingImage] = useState({
    loading: false,
    imageUrl
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
      getBase64(info.file.originFileObj, (imageUrl) => {
        setUploadingImage({
          imageUrl,
          loading: false
        });
      });
    }
  };
  const uploadButton = (
    <div>
      {uploadImage.loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  useEffect(() => {
    setUploadingImage({
      imageUrl,
      loading: false
    });
  }, [imageUrl]);
  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName="originFileObj"
      // getValueFromEvent={normFile}
    >
      <Upload
        name={name}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        accept="image/png, image/jpeg"
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
  label: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default UploadImage;

UploadImage.defaultProps = {
  name: 'avatar'
};
