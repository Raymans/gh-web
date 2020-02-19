import React from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, List, Tag } from 'antd'
import { getInterview } from '../../utils/api'
import Countdown from 'antd/lib/statistic/Countdown'

const deadline = Date.now() + 60 * 60 * 1000

class InterviewTest extends React.Component {
  state = {
    data: {questions: []}
  }

  componentDidMount(){
    getInterview({id: this.props.id}).then((res) => {
      this.setState({
        data: res
      })
    })
  }

  render(){
    const {id} = this.props

    return (
      <div>
        <h1>TEST STARTING! {id}</h1>
        <Countdown title="Remaining" value={deadline} format="HH:mm:ss"/>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.data.questions}
          renderItem={item => (
            <List.Item
              key={item.id}
            >
              <List.Item.Meta
                description={<div>
                  <Tag color="geekblue">{item.category}</Tag>
                  <Tag color="blue">{item.topic}</Tag>
                  <Tag color="green">{item.difficulty}</Tag>
                </div>}
              />
              <span className="content">{item.question}</span>
              <br/><br/>
              {item.answers.map(answer =>
                (<span key={id}><Checkbox>{answer}</Checkbox><br/></span>)
              )}
            </List.Item>
          )}
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {/* --- STYLES --- */}
        <style jsx>{`
      `}</style>
      </div>
    )
  }
}

InterviewTest.propTypes = {
  id: PropTypes.object
}

export default InterviewTest
