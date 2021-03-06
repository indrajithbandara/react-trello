import React, {Component} from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'
import update from 'immutability-helper'

import Board from '../src'

const data = require('./data.json')

class RealtimeBoard extends Component {
    state = {boardData: data, eventBus: undefined}

    setEventBus = handle => {
        this.state.eventBus = handle
    }

    completeMilkEvent = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'COMPLETED',
            card: {id: 'Milk', title: 'Buy Milk', label: '15 mins', description: 'Use Headspace app'}
        })
        this.state.eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: 'Milk'})
    }

    addBlockedEvent = () => {
        this.state.eventBus.publish({
            type: 'ADD_CARD',
            laneId: 'BLOCKED',
            card: {id: 'Ec2Error', title: 'EC2 Instance Down', label: '30 mins', description: 'Main EC2 instance down'}
        })
    }

    modifyLaneTitle = () => {
        const data = this.state.boardData
        const newData = update(data, {lanes: {1: {title: {$set: 'New Lane Title'}}}})
        this.setState({boardData: newData})
    }

    modifyLaneTitle = () => {
        const data = this.state.boardData
        const newData = update(data, {lanes: {1: {title: {$set: 'New Lane Title'}}}})
        this.setState({boardData: newData})
    }

    modifyCardTitle = () => {
        const data = this.state.boardData
        const newData = update(data, {lanes: {1: {cards: {0: {title: {$set: 'New Card Title'}}}}}})
        this.setState({boardData: newData})
    }

    shouldReceiveNewData = nextData => {
        console.log('data has changed')
        console.log(nextData)
    }


    render() {
      return <div>
        <button onClick={this.completeMilkEvent} style={{margin: 5}}>
              Complete Buy Milk
          </button>
        <button onClick={this.addBlockedEvent} style={{margin: 5}}>
              Add Blocked
          </button>
        <button onClick={this.modifyLaneTitle} style={{margin: 5}}>
              Modify Lane Title
          </button>
        <button onClick={this.modifyCardTitle} style={{margin: 5}}>
              Modify Card Title
          </button>
        <Board data={this.state.boardData} onDataChange={this.shouldReceiveNewData}
          eventBusHandle={this.setEventBus} />
      </div>
    }
}


storiesOf('Advanced Features', module).add(
  'Realtime Events',
  withInfo('This is an illustration of external events that modify the cards in the board')(() => <RealtimeBoard />)
)
