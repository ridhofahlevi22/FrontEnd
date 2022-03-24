import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Input
} from "reactstrap";
import { Modal } from 'react-bootstrap'
import Widget from "../../../components/Widget";
import s from "./Static.module.scss";
import { service } from '../../../actions/service/axios';
import Notifications, {notify} from 'react-notify-toast';

class Static extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      loading:true,
      show:false,
      dataShow:null
    }

    this.deleteData = this.deleteData.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow =  this.handleShow.bind(this);
    this.selectData =  this.selectData.bind(this);
    this.changeHp = this.changeHp.bind(this);
    this.doEdit = this.doEdit.bind(this);
  }

  handleClose(){
    this.setState({show:false});
  }

  handleShow(){
    this.setState({show:true});
  }

  selectData(item){
    this.setState({dataShow:item});
    this.handleShow();
  }

  changeHp(event) {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({ dataShow:{...this.state.dataShow,hp: event.target.value }});
   }
    
  }

  doEdit(e) {
    e.preventDefault();
    console.log("data: ", this.state.dataShow);
    // loginUser({ email: this.state.email, password: this.state.password });
    const data = {
      id: this.state.dataShow.id,
      hp: this.state.dataShow.hp,
      provider: this.state.dataShow.provider
    }
        service.post('/save.edit',data)
        .then((res) => { 
            if(res.data != null){
              this.handleClose();
              let resp = res.data.split("|");
              // console.log("data: ", res.data);
              let myColor = { background: '#0099ff', text: "#FFFFFF" };
              notify.show(resp[1], "custom", 5000, myColor);
              this.getUsersData();
            } else {
              let myColor = { background: '#0099ff', text: "#FFFFFF" };
              notify.show("Something was wrong. Try again", "custom", 5000, myColor);
            }
            

        })
        .catch((error) => {
            console.log("ERROR: ", error.message);
            // this.props.dispatch(loginError(error.message));
        });
        
  }
  
  async getUsersData(){
    let test = this;
    service.get('/data/transaksi/1/o.hp/ /100?orderby=o.hp')
    .then((res) => { 
      console.log(res.data.list);
        if(res.data != null){
          
          test.setState({loading:false, data: res.data.list});

        } else {
          test.setState({loading:false, data: ""});
        }
        

    })
    .catch((error) => {
        console.log("ERROR: ", error.message);
        // this.props.dispatch(loginError(error.message));
    });
    
  }

  async deleteData(id){
    let deletes = window.confirm('Delete the item?');
    if(deletes){
      service.delete('/delete/?id='+id)
      .then((res) => { 
        console.log(res.data.list);
          if(res.data != null){
            
            this.getUsersData();
  
          } else {
            let myColor = { background: '#0099ff', text: "#FFFFFF" };
              notify.show("Something was wrong. Try again", "custom", 5000, myColor);
          }
          
  
      })
      .catch((error) => {
          console.log("ERROR: ", error.message);
          // this.props.dispatch(loginError(error.message));
      });
    }
  }

  componentDidMount(){
    //this.getUsersData();
    let _this = this;
    this.varInterval = setInterval(() => {
      _this.getUsersData()
    },1000)
  }

  componentWillUnmount(){
    clearInterval(this.varInterval);
  }

  render() {
    
    const columns = [{
      Header: 'Phone',  
      accessor: 'hp',
      },
      {  
        Header: 'Provider',  
        accessor: 'provider',
      }
    ]

    return (
      <div className={s.root}>
        <Row> 
          <Col lg={6} md={6} sm={12}>
            <Widget>
              <h3>
                Ganjil
              </h3>
              <Notifications options={{zIndex: 200, top:'100px'}} />
              <div className={`widget-table-overflow ${s.overFlow}`}>
                {!this.state.loading ? 
                  <Table className="table-bordered table-striped table-lg mt-lg mb-0">
                    <thead>
                      <tr>
                        <th>HP</th>
                        <th>Provider</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((item) => {
                        if(item.hp % 2 === 1)
                          return (
                            <tr>
                              <td>{item.hp}</td>
                              <td>{item.provider}</td>
                              <td className="text-center">

                                <Button color="warning" className="auth-btn" variant="primary" onClick={()=>this.selectData(item)} size="sm" style={{color: '#fff', marginRight:'10px'}}>
                                  Edit
                                </Button>

                                <Button onClick={()=>this.deleteData(item.id)} type="submit" color="danger" className="auth-btn"
                                              size="sm" style={{color: '#fff'}}>
                                        {/* <span className="auth-btn-circle" style={{marginRight: 8}}>
                                          <i className="la la-caret-right"/>
                                        </span> */}
                                        {this.props.isFetching ? 'Loading...' : 'Delete'}
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                    : <p>Loading .. </p> }
                    
                  </div>
                </Widget>
              </Col>
              <Col lg={6} md={6} sm={12}> 
                <Widget>
                  <h3>
                    Genap
                  </h3>
                  <div className={`widget-table-overflow ${s.overFlow}`}>
                  {!this.state.loading ? 
                  <Table className="table-bordered table-striped table-lg mt-lg mb-0">
                    <thead>
                      <tr>
                        <th>HP</th>
                        <th>Provider</th>
                        <th className="text-center">Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((item) => {
                        if(item.hp % 2 === 0)
                          return (
                            <tr>
                              <td>{item.hp}</td>
                              <td>{item.provider}</td>
                              <td className="text-center">
                                <Button color="warning" className="auth-btn" variant="primary" onClick={()=>this.selectData(item)} size="sm" style={{color: '#fff', marginRight:'10px'}}>
                                  Edit
                                </Button>

                                <Button onClick={()=>this.deleteData(item.id)} type="submit" color="danger" className="auth-btn"
                                              size="sm" style={{color: '#fff'}}>
                                        {/* <span className="auth-btn-circle" style={{marginRight: 8}}>
                                          <i className="la la-caret-right"/>
                                        </span> */}
                                        {this.props.isFetching ? 'Loading...' : 'Delete'}
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                    : <p>Loading .. </p> }

              </div>
            </Widget>
          </Col>
        </Row>
        {this.state.dataShow &&               
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input id="hp" className="input-transparent pl-3" value={this.state.dataShow.hp} onChange={this.changeHp} type="text"
                                           required name="hp" maxLength={13} placeholder="No Handphone"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose} color="warning" className="auth-btn"
                                              size="sm" style={{color: '#fff'}}>
            Close
          </Button>
          <Button variant="primary" onClick={this.doEdit} color="success" className="auth-btn"
                                              size="sm" style={{color: '#fff'}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
        }
      </div>

      
    );

    
  }
}

export default Static;
