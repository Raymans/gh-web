import { Col } from 'antd';
import Lottie from 'react-lottie';
import React from 'react';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  text-align: center;
  padding: 30px 15px;
  color: black;
  border-radius: 1%;
  &.big {
    padding: 0 15px;
  }
`;
const IconImage = styled.img`
  width: 300px;
  height: 235px;
  border-radius: 50%;
  margin: 10px 0 20px;

  &.big {
    width: 400px;
    height: 250px;
    border-radius: 5%;
  }

  @media (max-width: 768px) {
    &.big {
      width: 100%;
    }
  }
`;

const defaultOptions = {
  loop: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const IconDescription = ({
  icon,
  title,
  description,
  className,
  image
}) =>
  <StyledCol className={className}>
    {/*<FontAwesomeIcon icon={icon} size="7x"/>*/}
    {
      !!image ? <IconImage src={icon} alt="Analysis" className={className}/> :
        <Lottie options={{ animationData: icon, ...defaultOptions }}
                width={250}
                height={200}
        />
    }
    <h3 style={{ paddingTop: '10px' }}>{title}</h3>
    <p>{description}</p>
  </StyledCol>;

  export default IconDescription;
