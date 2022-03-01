import { FormattedMessage } from 'gatsby-plugin-intl';
import CustomBreadcrumb from '../CustomBreadcrumb';
import React from 'react';
import Headline from '../Article/Headline';
import ContentLayout from '../Layout/ContentLayout';

const anchors = [
  {
    href: '#is-geekhub-free',
    title: <FormattedMessage id="faq.question.title.is.free" defaultMessage="Is GeekHub free?"/>
  }, {
    href: '#why-free',
    title: <FormattedMessage id="faq.question.title.why.free" defaultMessage="Why are we free?"/>
  }, {
    href: '#video-interview',
    title: <FormattedMessage id="faq.question.title.video.interviews"
                             defaultMessage="Do you provide video interviews?"/>
  }, {
    href: '#diff-video-interviews',
    title: <FormattedMessage id="faq.question.title.diff.video.interviews"
                             defaultMessage="How are you different from conducting video interviews online?"/>
  }, {
    href: '#diff-f2f',
    title: <FormattedMessage id="faq.question.title.diff.f2f.interviews"
                             defaultMessage="How are you different from traditional face to face interviews?"/>
  }, {
    href: '#code-question',
    title: <FormattedMessage id="faq.question.title.code.question"
                             defaultMessage="Do you support coding questions?"/>
  }];

const FAQ = () => {
  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: <FormattedMessage id="faq.title" defaultMessage="FAQ"/>,
        path: '/resources/faq'
      }]}/>
      <Headline/>
      <ContentLayout>
        {/*<AnchorSider anchors={anchors}/>*/}
        <h2 id="is-geekhub-free"><FormattedMessage id="faq.question.title.is.free"
                                                   defaultMessage="Is GeekHub free?"/></h2>
        <div>
          <FormattedMessage id="faq.question.title.is.free.answer"
                            defaultMessage="A: Yes it is free to get started and there will always be a free plan to suit your most essential needs!"/>
        </div>
        <h2 id="why-free"><FormattedMessage id="faq.question.title.why.free"
                                            defaultMessage="Why are we free?"/></h2>
        <div>
          <FormattedMessage id="faq.question.title.why.free.answer"
                            defaultMessage="As a beta platform we are in the process of refining our product and services. At some point we will have a paid plan in place with a lot more capabilities should you choose to opt in based on your business need."/>
        </div>
        <h2 id="video-interview"><FormattedMessage id="faq.question.title.video.interviews"
                                                   defaultMessage="Do you provide video interviews?"/>
        </h2>
        <div>
          <FormattedMessage id="faq.question.title.video.interviews.answer"
                            defaultMessage="Video interview is not a service we provide at this moment. We believe there are plenty of choices out there such as Google Meet and Zoom that can well and truly fulfil this aspect of video interviews."/>
        </div>
        <h2 id="diff-video-interviews"><FormattedMessage
          id="faq.question.title.diff.video.interviews"
          defaultMessage="How are you different from conducting video interviews online?"/></h2>
        <div>
          <FormattedMessage id="faq.question.title.diff.video.interviews.answer"
                            defaultMessage="A: While it is convenient to conduct virtual interviews. The key difference here is your presence is required in these interviews, when it could be spent elsewhere while your candidate can independently go through assessments on their own."/>
        </div>
        <h2 id="diff-f2f"><FormattedMessage id="faq.question.title.diff.f2f.interviews"
                                            defaultMessage="How are you different from traditional face to face interviews?"/>
        </h2>
        <div>
          <FormattedMessage id="faq.question.title.diff.f2f.interviews.answer"
                            defaultMessage="A: With face to face interviews, you have to make appointments with individual candidates and go through your interviews one by one. While it is manageable when you are screening a small number of candidates, it can get out of control and chew up a significant amount of your time as your candidate size grows bigger. We believe your time is valuable and should be spent on the qualifying candidates that meet your basic assessment benchmark."/>
        </div>
        <h2 id="code-question"><FormattedMessage id="faq.question.title.code.question"
                                                 defaultMessage="Do you support coding questions?"/>
        </h2>
        <div>
          <FormattedMessage id="faq.question.title.code.question"
                            defaultMessage="A: Not at the moment. But it is certainly planned in our roadmap to offer coding questions to companies that employ engineers."/>
        </div>
      </ContentLayout>

    </>
  );
};

export default FAQ;
