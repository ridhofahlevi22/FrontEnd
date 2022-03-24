import React from "react";
// import { withRouter, Redirect, Link } from 'react-router-dom';
import { Container, Alert, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Row, Col, Progress, Label, Input } from "reactstrap";
import Widget from '../../components/Widget';
import { service } from '../../actions/service/axios';
// import AnimateNumber from "react-animated-number";
import Notifications, {notify} from 'react-notify-toast';
import s from "./Dashboard.module.scss";
import Select from 'react-select';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        hp: '',
        provider: '',
        status:''
    };

    this.doSave = this.doSave.bind(this);
    this.changeHp = this.changeHp.bind(this);
    this.changeProvider = this.changeProvider.bind(this);
  }

  changeHp(event) {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({ hp: event.target.value });
   }
    
  }

  changeProvider(event) {
    this.setState({ provider: event.target.value });
  }

  doSave(e) {
    e.preventDefault();
    // loginUser({ email: this.state.email, password: this.state.password });
    const data = {
      hp: this.state.hp,
      provider: this.state.provider.label
    }
        service.post('/save.edit',data)
        .then((res) => { 
            if(res.data != null){
              let resp = res.data.split("|");
              // console.log("data: ", res.data);
              let myColor = { background: '#0099ff', text: "#FFFFFF" };
              notify.show(resp[1], "custom", 5000, myColor);

            } else {
              console.log("Something was wrong. Try again");
            }
            

        })
        .catch((error) => {
            console.log("ERROR: ", error.message);
            // this.props.dispatch(loginError(error.message));
        });
        
  }

  doSaveMulti() {
    let arr = [];
    for (var i = 0; i < 25; i++) {
      let rand = Math.floor(Math.random() * (99999999 - 9999999 + 1));
      arr.push({
        hp: '0812'+rand,
        provider: 'TELKOMSEL'
      });
    }
        service.post('/save.multi',arr)
        .then((res) => { 
            if(res.data != null){
              let resp = res.data.split("|");
              // console.log("data: ", res.data);
              let myColor = { background: '#0099ff', text: "#FFFFFF" };
              notify.show(resp[1], "custom", 5000, myColor);

            } else {
              console.log("Something was wrong. Try again");
            }
            

        })
        .catch((error) => {
            console.log("ERROR: ", error.message);
            // this.props.dispatch(loginError(error.message));
        });
        
  }

  render() {

    const provider = [
      { label: "TELKOMSEL", value: "TELKOMSEL" },
      { label: "XL", value: "XL" },
      { label: "INDOSAT", value: "INDOSAT" },
      { label: "TRI", value: "TRI" }
    ];

    const styles = {
      control: (css) => ({
        ...css,
        width: "300px",
        opacity: "300px" ? 1 : 0
      }),
      option: (provided, state, css) => ({
        ...provided,
        ...css,
        fontWeight: state.isSelected ? "bold" : "normal",
        color: "black",
        backgroundColor: state.data.color,
        fontSize: state.selectProps.myFontSize
      })
    };

    return (
      <div className={s.root}>
        <h1 className="page-title">
          Form &nbsp;
          <small>
            <small>Input</small>
          </small>
        </h1>
        <Notifications options={{zIndex: 200, top:'100px'}} />
                <Container>
                    <Widget className="widget-auth" title={<h3 className="mt-0">Data No Handphone</h3>}>
                        <form onSubmit={this.doSave}>
                            {
                                this.props.errorMessage && (
                                    <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                                        {this.props.errorMessage}
                                    </Alert>
                                )
                            }
                            <FormGroup className="mt">
                                {/* <Label for="hp">No Handphone</Label> */}
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="glyphicon glyphicon-phone text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="hp" className="input-transparent pl-3" value={this.state.hp} onChange={this.changeHp} type="text"
                                           required name="hp" maxLength={13} placeholder="No Handphone"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                {/* <Label for="provider">Provider</Label> */}
                                <InputGroup className="input-group-no-border">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="glyphicon glyphicon-sort text-white"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Select styles={styles} options={provider} id="provider" name="provider" value={this.state.provider} onChange={(data) => this.setState({ provider: data })} />
                                    {/* <Input id="provider" className="input-transparent pl-3" value={this.state.provider} onChange={this.changeProvider} type="text"
                                           required name="provider" placeholder="provider"/> */}
                                </InputGroup>
                            </FormGroup>
                            <div className="bg-widget auth-widget-footer">
                                <Button type="submit" color="success" className="auth-btn"
                                        size="sm" style={{color: '#fff'}}>
                                  <span className="auth-btn-circle" style={{marginRight: 8}}>
                                    <i className="la la-caret-right"/>
                                  </span>
                                  {this.props.isFetching ? 'Loading...' : 'Save'}
                                </Button>
                                <Button onClick={this.doSaveMulti} type="submit" color="warning" className="auth-btn"
                                        size="sm" style={{color: '#fff'}}>
                                  <span className="auth-btn-circle" style={{marginRight: 8}}>
                                    <i className="la la-caret-right"/>
                                  </span>
                                  {this.props.isFetching ? 'Loading...' : 'Auto'}
                                </Button>
                                <p className="widget-auth-info mt-4">
                                </p>
                            </div>
                        </form>
                    </Widget>
                </Container>
      </div>
    );
  }
}

export default Dashboard;
