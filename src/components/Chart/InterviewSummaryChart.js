import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import useApi from '../../hooks/useApi';


const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  elements: {
    point: { radius: 5 }
  }
};

const InterviewSummaryChart = ({
  interview,
  interviewSessions
}) => {
  const { getAverageScore } = useApi();
  const [loading, setLoading] = useState(true);
  const [averageScore, setAverageScore] = useState({ sectionsAverageScore: [{ averageSectionScore: 0 }] });
  useEffect(() => {
    if (_.isEmpty(interview)) {
      return;
    }
    if (_.isEmpty(interviewSessions)) {
      return;
    }
    getAverageScore(interviewSessions[0].id)
      .then((res) => {
        setAverageScore({ scoreDiff: (interviewSessions[0].totalScore - res.averageScore.averageScore) * 100, ...res });
        setLoading(false);
      });
  }, [interview, interviewSessions]);

  if (_.isEmpty(interview) || _.isEmpty(interviewSessions)) {
    return <></>;
  }
  const interviewSession = interviewSessions[0];
  //let chartData = {sectionLabels: [], dataSet};
  const sectionLabels = ['Score/Section', ...interview?.sections.map((section, index) => {
    return section.title;
  }), 'Total Score'];

  const dataSets = [...interviewSessions?.map((interviewSession, index) => {
    return {
      label: interviewSession.candidateUser.nickname,
      data: [0, ...interview?.sections.map((section, index) => {
        let sectionScore = 0;
        let sectionScoreDiff = 0;
        if (interviewSession.answerAttemptSections[section.id]) {
          const { answerStats } = interviewSession.answerAttemptSections[section.id];
          sectionScore = Math.round(((answerStats.MULTI_CHOICE?.correct ?? 0) + (answerStats.SHORT_ANSWER?.correct ?? 0)) / ((answerStats.MULTI_CHOICE?.questionTotal ?? 0) + (answerStats.SHORT_ANSWER?.questionTotal ?? 0)) * 100);
        }
        const sectionsAvgScore = averageScore.sectionsAverageScore.find((element) => element.sectionId === section.id);
        const averageSectionScore = Math.round(sectionsAvgScore?.averageSectionScore * 100 ?? 0);
        return sectionScore;
      }), interviewSession.totalScore * 100],
      fill: false,
      backgroundColor: 'rgb(99,224,255)',
      borderColor: 'rgb(99,224,255)'
    };
  }), {
    label: 'Average Score',
    data: [0, ...interview?.sections.map((section, index) => {
      const sectionsAvgScore = averageScore.sectionsAverageScore.find((element) => element.sectionId === section.id);
      const averageSectionScore = Math.round(sectionsAvgScore?.averageSectionScore * 100 ?? 0);
      return averageSectionScore;
    }), averageScore.averageScore?.averageScore * 100],
    fill: true,
    backgroundColor: 'rgba(255,203,99,0.5)',
    borderColor: 'rgba(38,83,169,0.2)'
  }];

  const data = {
    labels: sectionLabels,
    datasets: dataSets
  };
  return (
    <>
      <Line data={data} options={options}/>
    </>
  );
};

export default InterviewSummaryChart;
