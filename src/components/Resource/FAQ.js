import { FormattedMessage } from 'gatsby-plugin-intl';
import CustomBreadcrumb from '../CustomBreadcrumb';
import React from 'react';
import Headline from '../Article/Headline';
import ContentLayout from '../Layout/ContentLayout';
import styled from 'styled-components';

const H2 = styled.h2`
    margin: 40px 0 0;
`
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
        <H2 id="is-geekhub-free"><FormattedMessage id="faq.question.title.is.free"
                                                   defaultMessage="Is GeekHub free?"/></H2>
        <div>
          <FormattedMessage id="faq.question.title.is.free.answer"
                            defaultMessage="A: Yes. It is totally free to get started and there will always be a free plan to suit your most essential needs!"/>
        </div>
        <H2 id="why-free"><FormattedMessage id="faq.question.title.why.free"
                                            defaultMessage="Why are we free?"/></H2>
        <div>
          <FormattedMessage id="faq.question.title.why.free.answer"
                            defaultMessage="A: As a beta platform we are in the process of refining our product and services. At some point we will have paid plans in place with more advanced functionalities should you choose to opt in to suit your business needs."/>
        </div>
        <H2 id="video-interview"><FormattedMessage id="faq.question.title.video.interviews"
                                                   defaultMessage="Do you provide video interviews?"/>
        </H2>
        <div>
          <FormattedMessage id="faq.question.title.video.interviews.answer"
                            defaultMessage="A: Video interview is not a service we provide. There already are plenty of providers out there, such as Google Meet and Zoom that can satisfy this need. We believe using GeekHub online assessment along with video interview tools will solve most interview needs at your company."/>
        </div>
        <H2 id="diff-video-interviews"><FormattedMessage
          id="faq.question.title.diff.video.interviews"
          defaultMessage="How are you different from conducting video interviews online?"/></H2>
        <div>
          <FormattedMessage id="faq.question.title.diff.video.interviews.answer"
                            defaultMessage="A: While it is convenient to conduct virtual interviews, the key difference here is that you are still physically required to engage in these interviews. We believe first round interviews can be done more efficiently, by engaging with multiple candidates all at the same time on the same level playing fields with our online assessment service."/>
        </div>
        <H2 id="diff-f2f"><FormattedMessage id="faq.question.title.diff.f2f.interviews"
                                            defaultMessage="How are you different from traditional face to face interviews?"/>
        </H2>
        <div>
          <FormattedMessage id="faq.question.title.diff.f2f.interviews.answer"
                            defaultMessage="A: With face to face interviews, you have to make appointments with individual candidates and go through the same interview questions over and over again. While it is manageable when you are screening a small number of candidates, it can easily take up a significant amount of your time when the candidate number grows bigger. We believe that your time is most valuable and should be spent on qualified candidates that meet your basic assessment benchmark."/>
        </div>
        <H2 id="code-question"><FormattedMessage id="faq.question.title.code.question"
                                                 defaultMessage="Do you support coding questions?"/>
        </H2>
        <div>
          <FormattedMessage id="faq.question.title.code.question.answer"
                            defaultMessage="A: Not at the moment. But it is certainly planned in our roadmap and to be offered to our clients in the near future."/>
        </div>
      </ContentLayout>

    </>
  );
};

export default FAQ;
