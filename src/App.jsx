import React from 'react';
import Table from './Table';
import { Container, Header, Message } from 'semantic-ui-react';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  // Will fetch the forex data every second
  _getForexData = async () => {
    const response = await fetch('https://www.live-rates.com/rates')
    const  rates = await response.json()
    this.setState({ data: rates })
    setTimeout(() => {
      this._getForexData()
    }, 1000)
  }

  componentDidMount() {
    this._getForexData()
  }

  render() {
    return (
      <Container>
        <Header as='h1' className="mrgv-">Forex Rates</Header>
        <Message>
          <Message.Header>Note</Message.Header>
          <p>
            The rates are updated every seconds using the response of the following API endpoint: <a href='https://www.live-rates.com/rates' target="_blank" rel="noopener noreferrer">https://www.live-rates.com/rates</a>
          </p>
        </Message>
        <Table data={this.state.data} />
      </Container>
    );
  }

}

export default App;
