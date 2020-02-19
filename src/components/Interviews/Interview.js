import React from 'react'
import Questions from '../Questions'

const Interview = props => {
  return (
    <React.Fragment>

      <div>Hi from SubPage with id: {props.id}</div>
      <Questions/>
      {/* --- STYLES --- */}
      <style jsx>{`
      `}</style>
    </React.Fragment>
  )
}

Interview.propTypes = {}

export default Interview
