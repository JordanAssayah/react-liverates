import React from 'react';
import Table from './Table';
import { Container, Header, Message, Loader } from 'semantic-ui-react';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
      error: undefined,
    }
  }

  _loadRatesFromLocalStorage = async () => {
    const rates = await localStorage.getItem('rates')
    this.setState({ data: JSON.parse(rates) })
  }

  // Will fetch the forex data every second
  _getForexData = async () => {
    const response = await fetch('https://www.live-rates.com/rates')
    const rates = await response.json()

    if (rates[0] !== undefined && rates[0].error) {
      this.setState({ error: rates[0].error })
      if (this.state.data.length === 0) {
        this._loadRatesFromLocalStorage()
        this.setState({ loading: false })
      }
    } else {
      if (this.state.data.length === 0) {
        this.setState({ loading: false })
      }
      localStorage.setItem('rates', JSON.stringify(rates))
      this.setState({ data: rates })
      setTimeout(() => this._getForexData(), 1000)
    }
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
          <Message.List>
            <Message.Item>The rates are updated every second using the response of the following API endpoint: <a href='https://www.live-rates.com/rates' target="_blank" rel="noopener noreferrer">https://www.live-rates.com/rates</a></Message.Item>
            <Message.Item>The free usage of the API allows you to make 3 calls per hour</Message.Item>
          </Message.List>
        </Message>
        {this.state.error !== undefined
          ? <Message negative>
              <Message.Header>Oh no!</Message.Header>
              <p>{ this.state.error }</p>
            </Message>
          : null}
        {this.state.data !== null
          ? <Table data={this.state.data} />
          : <Message warning>
              <p>Saved data have been removed from your local storage</p>
            </Message>}
        <Loader active={this.state.loading}>Loading</Loader>
      </Container>
    );
  }

}

export default App;
