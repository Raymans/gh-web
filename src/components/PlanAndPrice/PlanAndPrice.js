import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'gatsby-plugin-intl';


const StyledSuccessItem = styled.li`
  background-image: url('http://www.postman.com/assets/icons/green-checkmark.svg');
  background-repeat: no-repeat;
  box-sizing: inherit;
  display: block;
  font-weight: 400;
  font-family: "Open Sans", "Segoe UI", Tahoma, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  list-style-type: disc;
  margin-bottom: 8px;
  padding-left: 32px;
  text-align: left;
`;

const StyledDisabledItem = styled.li`
  color: rgb(102, 102, 102);
  background-image: url(http://www.postman.com/assets/icons/x-grey-2.svg);
  background-repeat: no-repeat;
  text-decoration: line-through;
  box-sizing: inherit;
  display: block;
  font-weight: 400;
  font-family: "Open Sans", "Segoe UI", Tahoma, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  list-style-type: disc;
  margin-bottom: 8px;
  padding-left: 32px;
  text-align: left;
`;

const PlanAndPrice = () => {
  return (
    <>
      <h1><p><FormattedMessage defaultMessage="Plan and Pricing"/></p></h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Free">
            <p>The GeekHub Free plan is the perfect place to Browse, do-test, apply Interviews and
              review your tested results.</p>
            <Button>Sign Up</Button>
          </Card>
          <ul className="featureHighlights__HighlightsContainer-sc-1ej5r-0 bJxlTP">
            <StyledSuccessItem>
              Ideal for
              individual developers
            </StyledSuccessItem>
            <StyledSuccessItem>
              Design, develop,
              and test APIs
            </StyledSuccessItem>
            <StyledSuccessItem>
              Begin
              collaborating with your team
            </StyledSuccessItem>
            <StyledDisabledItem>
              Accelerate
              development with powerful tools
            </StyledDisabledItem>
            <StyledDisabledItem>
              Authenticate
              users with SSO
            </StyledDisabledItem>
            <StyledDisabledItem>
              Control access,
              roles, and permissions
            </StyledDisabledItem>
            <StyledDisabledItem>
              Enable
              governance and align your entire organization
            </StyledDisabledItem>
            <StyledDisabledItem>
              Get custom
              agreements and payment terms tailored to your organization
            </StyledDisabledItem>
          </ul>
        </Col>
        <Col span={8}>
          <Card title="Premium">
            <p>The GeekHub Premium plan helps you create Interviews, view who has tested your
              Interviews and be easy to reach to TOP GeekHubers.</p>
            <Button>Buy Now</Button>
          </Card>
          <StyledSuccessItem>
            Ideal for
            individual developers
          </StyledSuccessItem>
          <StyledSuccessItem>
            Design, develop,
            and test APIs
          </StyledSuccessItem>
          <StyledSuccessItem>
            Begin
            collaborating with your team
          </StyledSuccessItem>
          <StyledSuccessItem>
            Accelerate
            development with powerful tools
          </StyledSuccessItem>
          <StyledSuccessItem>
            Authenticate
            users with SSO
          </StyledSuccessItem>
          <StyledDisabledItem>
            Control access,
            roles, and permissions
          </StyledDisabledItem>
          <StyledDisabledItem>
            Enable
            governance and align your entire organization
          </StyledDisabledItem>
          <StyledDisabledItem>
            Get custom
            agreements and payment terms tailored to your organization
          </StyledDisabledItem>
        </Col>
        <Col span={8}>
          <Card title="Business">
            <p>The GeekHub Business plan helps you create private Interview, collaborate across your
              team to share, review and make hiring decision faster.</p>
            <Button>Buy Now</Button>
          </Card>
          <StyledSuccessItem>
            Ideal for
            individual developers
          </StyledSuccessItem>
          <StyledSuccessItem>
            Design, develop,
            and test APIs
          </StyledSuccessItem>
          <StyledSuccessItem>
            Begin
            collaborating with your team
          </StyledSuccessItem>
          <StyledSuccessItem>
            Accelerate
            development with powerful tools
          </StyledSuccessItem>
          <StyledSuccessItem>
            Authenticate
            users with SSO
          </StyledSuccessItem>
          <StyledSuccessItem>
            Control access,
            roles, and permissions
          </StyledSuccessItem>
          <StyledSuccessItem>
            Enable
            governance and align your entire organization
          </StyledSuccessItem>
          <StyledSuccessItem>
            Get custom
            agreements and payment terms tailored to your organization
          </StyledSuccessItem>
        </Col>
      </Row>
    </>
  );
};

export default PlanAndPrice;
