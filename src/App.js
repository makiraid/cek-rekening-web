import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { 
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Button,
  Alert,
  List,
  Grid,
  Row,
  Col,
  Loader,
  Input,
  IconButton,
  Icon,
  Tag,
  TagGroup,
  HelpBlock,
  InputPicker, 
  DateRangePicker,
  Panel
} from 'rsuite';
import './App.css';
import axios from 'axios';
import ReactGA from 'react-ga';

import data from './bank.json';

const baseUrlApi = 'https://quotes-api.archv.id';

ReactGA.initialize('UA-166645923-2');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kodeBank: '',
      nomorRekening: '',
      response: '',
      isLoading: false,
    };
  }

  trackPageView(page, options = {}){
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  }

  async handleSubmit() {
    const { kodeBank, nomorRekening } = this.state;
    this.setState({
      isLoading: true
    })
    await axios.get(`https://api.makira.id/cek-norek?kodeBank=${kodeBank}&noRek=${nomorRekening}`)
    .then((response) => {
      if (response.data.code == 200) {
        Alert.success(response)
        this.setState({
          response: response.data
        })
      } else if (response.data.code == 201) {
        Alert.success(response)
        this.setState({
          response: response.data
        })
      }
      this.setState({
        isLoading: false
      })
    })
    .catch((error) => {
      Alert.warning(error)
      this.setState({
        isLoading: false
      })
    })
    this.setState({
      isLoading: false
    })
  }

  render(){
    return (
      <>
        <div className="containerApp">
          <Grid fluid>
            <Form>
              <FormGroup>
                <ControlLabel>Kode Bank</ControlLabel>
                <InputPicker
                  data={data}
                  onSelect={(data) => 
                    this.setState({ 
                      kodeBank: data
                    }
                  )}
                  placeholder="Kode Bank"
                  style={{ width: 500 }} 
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Nomor Rekening</ControlLabel>
                <FormControl 
                  onChange={(data) => 
                    this.setState({
                      nomorRekening: data
                    }
                  )}
                  name="norek" 
                  type="norek"
                  style={{ width: 500 }} 
                  />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button
                    onClick={() => this.handleSubmit()}
                    appearance="primary"
                  >
                    Submit
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Grid>
          <div className="listLatestQuotes2">
            <Form>
              <FormGroup>
                <Panel 
                  className="listLatestQuotes2"
                  header="Result" 
                  shaded
                  style={{ width: 500 }}
                >
                  {/* {this.state.} */}
                </Panel>
              </FormGroup>
            </Form>
          </div>
        </div>
        {/* <div>
            {this.isLoading ? (
              <div className='centerContent'>
                <Loader content="Loading..." />
              </div>
            ) : (
              
            )}
        </div> */}
      </>
    );
  }
}

export default App;
