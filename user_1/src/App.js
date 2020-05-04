import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { geolocated } from "react-geolocated";
import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
var dropDownArr = []



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phnum: "",
      lat: "",
      lng: "",
      request: "",
      requestPane: true,
      enruirePane: false,
      jobID: "",
      showSummaryModal: false,
      byPhNum: [],
      // enquireComp:[],

    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);


    this.validator = new SimpleReactValidator({ autoForceUpdate: this });


  }

  handleChange(event) {
    switch (event.target.id) {
      case "phnum":
        this.setState({ phnum: event.target.value })
        // console.log("ph num change", this.state);

        break;
      case "lat":
        this.setState({ lat: event.target.value })
        // console.log("lat change", this.state);

        break;
      case "lng":
        this.setState({ lng: event.target.value })
        // console.log("lng change", this.state);

        break;

      default:
        break;
    }
  }
  handleCloseModal() {
    this.setState({ showSummaryModal: false, enruirePane: true, requestPane: false, byPhNum: [] })

  }
  async handleClick(event) {
    event.persist();
    console.log("clicked", event.target);

    switch (event.target.id) {
      case "submit":

        if (this.validator.allValid()) {
          // alert('You submitted the form !');
          let body = {
            phnum: this.state.phnum,
            request: this.state.request,
            lat: this.state.lat,
            lng: this.state.lng
          }
          let submitFetch = await fetch("http://localhost:3000/api/user/create_req", {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },

          })
          let submitRes = await submitFetch.json()
          this.setState({ jobID: submitRes.jobID, showSummaryModal: true })
          console.log(submitRes);

        } else {
          this.validator.showMessages();
          // rerender to show messages for the first time
          // you can use the autoForceUpdate option to do this automatically`
          this.forceUpdate();
        }

        break;

      case "closeModalSummary":
        this.setState({ showSummaryModal: false, enruirePane: true, requestPane: false, byPhNum: [] })
        break;

      case "requestPane":

        this.setState({
          requestPane: true, enruirePane: false, phnum: "",
          lat: "",
          lng: "",
          request: "",
        })
        break;
      case "enquire":
        console.log("enquire : ", this.state.phnum);
        if (this.state.phnum) {
          let body = {
            phnum: this.state.phnum,

          }
          let enquirePhFetch = await fetch("http://localhost:3000/api/user/enquire_ph", {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },

          })
          console.log("enquire status : ", enquirePhFetch.status);

          let enquirePhRes = await enquirePhFetch.json()
          let array = enquirePhRes.result
          let tmpArr = []
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            tmpArr.push(<tr key={element.id}>
              <td>{element.id}</td>
              <td>{element.request}</td>
              <td>{element.status}</td>
            </tr>
            )


          }
          console.log(tmpArr);

          this.setState({ byPhNum: tmpArr });

        } else {
          console.log("no number");
          this.validator.showMessages();
          // rerender to show messages for the first time
          // you can use the autoForceUpdate option to do this automatically`
          this.forceUpdate();

        }


        // this.setState({ byPhNum:enquirePhRes.result })
        // console.log(enquirePhRes);



        break;
      case "enquirePane":

        this.setState({
          requestPane: false, enruirePane: true, phnum: "",
          lat: "",
          lng: "",
          request: "",
        })
        break;

      default:
        break;
    }




  }
  handleSelect(ek) {
    this.setState({ request: ek })
    console.log(ek);


  }
  async componentDidMount() {
    async function fetchDropData(params) {
      let dropFetch = await fetch("http://localhost:3000/api/resource/list", {

        method: 'get',
        headers: { 'Content-Type': 'application/json' },

      });
      console.log(dropFetch.status);

      let dropResp = await dropFetch.json();
      let array = dropResp.result;
      return array
    }
    let array = await fetchDropData()
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      // console.log(element.resource);
      dropDownArr.push(<Dropdown.Item key={element.resource} eventKey={element.resource}>{element.resource}</Dropdown.Item>
      )


    }
    setInterval(() => {
      // { console.log(this.props.isGeolocationAvailable, this.props.isGeolocationEnabled, this.props.coords) }
      if (this.props.coords) {
        this.setState({ lat: this.props.coords.latitude })
        this.setState({ lng: this.props.coords.longitude })

      }
    }, 2000);

  }
  render() {
    return (
      <div>
        <header>
          <h1 style={{ textAlign: "center" }}>Request Management Platform</h1>
          <br></br>
          <hr />
        </header>
        <div className="row" style={{ width: "90%" }}>
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-12">
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <Button variant="info" id="requestPane" style={{ width: "100%" }} onClick={this.handleClick} >
                  Request Resource
              </Button>
              </div>

              <div className="col-md-12">
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <Button variant="info" id="enquirePane" style={{ width: "100%" }} onClick={this.handleClick} >
                  Status Enquire
              </Button>
              </div>

            </div>
          </div>


          <div className="col-md-7">
            {this.state.requestPane ?
              <div className="row">
                <div className="col">
                  <h1>
                    Please Fill Request Form
                  </h1>
                  <Form.Group >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" id="phnum" autoComplete="off" onChange={this.handleChange} placeholder="Enter Mobile Number" value={this.state.phnum} />
                    {this.validator.message('Number', this.state.phnum, 'required|phone')}
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control id="lat" onChange={this.handleChange} placeholder="Latitude" disabled={true} value={this.state.lat} />
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control id="lng" onChange={this.handleChange} placeholder="Longitude" disabled={true} value={this.state.lng} />
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Resource</Form.Label>

                    <DropdownButton size="lg" id="dropdownResource" title={this.state.request || "Select Resource"} onSelect={this.handleSelect} >
                      {dropDownArr}

                    </DropdownButton>
                    {this.validator.message('Resource', this.state.request, 'required|alpha')}

                  </Form.Group>
                  <Button variant="info" id="submit" style={{ width: "100%" }} onClick={this.handleClick} >
                    Request
              </Button>

                </div>
              </div> : <div className="row">
                <div className="col">
                  <h1>
                    Enquire Status
                </h1>
                  <Form.Group >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" id="phnum" autoComplete="off" onChange={this.handleChange} placeholder="Enter Mobile Number" value={this.state.phnum} />
                    {this.validator.message('Number', this.state.phnum, 'required|phone')}
                  </Form.Group>
                  <Button variant="info" id="enquire" style={{ width: "100%" }} onClick={this.handleClick} >
                    Request
              </Button>
                  {/* <ListGroup horizontal>
                    <ListGroup.Item>ID</ListGroup.Item>
                    <ListGroup.Item>Resource</ListGroup.Item>
                    <ListGroup.Item>Status</ListGroup.Item>
                  </ListGroup>
                  {this.state.byPhNum} */}

                  <br></br>
                  <br></br>

                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Resource</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.byPhNum}

                    </tbody>
                  </Table>

                </div>
              </div>
            }
          </div>

        </div>
        <footer>
          <hr />
          <p style={{ textAlign: "right" }}>Copyright @ 2020</p>
          <hr />
        </footer>
        <Modal show={this.state.showSummaryModal} onHide={this.handleCloseModal}>
          <Modal.Header >
            <Modal.Title>Request Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>Request Successfull ! Request ID: {this.state.jobID}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" id="closeModalSummary" onClick={this.handleClick}>
              Close
          </Button>

          </Modal.Footer>
        </Modal>
      </div>
    );

  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);