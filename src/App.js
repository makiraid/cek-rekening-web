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
  Grid,
  Loader,
  InputPicker, 
  Panel
} from 'rsuite';
import './App.css';
import axios from 'axios';
import data from './bank.json';

const baseUrlApi = 'https://api.makira.id';

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

  async handleSubmit() {
    const { kodeBank, nomorRekening } = this.state;
    this.setState({
      isLoading: true
    })
    await axios.get(`${baseUrlApi}/cek-norek?kodeBank=${kodeBank}&noRek=${nomorRekening}`)
    .then((response) => {
      if (response.data.code == 200) {
        this.setState({
          response: response.data.data.data.name
        })
      } else if (response.data.code == 201) {
        Alert.warning("Oops, Terjadi kesalahan periksa kembali")
      }
      this.setState({
        isLoading: false
      })
    })
    .catch((error) => {
      console.log(error)
        Alert.warning("Oops, Terjadi kesalahan periksa kembali")
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
            {this.state.isLoading ? (
              <div className='centerContent'>
                <Loader content="Loading..." />
              </div>
            ) : (
              <Form>
                <FormGroup>
                  <Panel 
                    className="listLatestQuotes2"
                    header="Result" 
                    shaded
                    style={{ width: 500 }}
                  >
                    {this.state.response}
                  </Panel>
                </FormGroup>
              </Form>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
