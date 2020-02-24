import React from 'react';
import Questions from '../Questions';

const Interview = (props) => (
  <>
    <div>
Hi from SubPage with id:
      {props.id}
    </div>
    <Questions />
  </>
);

Interview.propTypes = {};

export default Interview;
