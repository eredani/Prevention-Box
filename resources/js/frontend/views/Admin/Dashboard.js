import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Table, Row,Col,Card,CardBody,CardTitle} from 'reactstrap';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, toast,ToastContainer,MDBNavbarBrand} from "mdbreact";
    import {Modal, ModalBody, ModalFooter } from 'reactstrap';
class ModalExample extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            modal: false,
            question:this.props.data.question,
            ans1:this.props.data.ans1,
            ans2:this.props.data.ans2,
            ans3:this.props.data.ans3
          }; 
          this.handleInputChange = this.handleInputChange.bind(this);
          this.submit = this.submit.bind(this);
          this.toggle = this.toggle.bind(this);
          this.delete = this.delete.bind(this);
        }
        toggle(){
          this.setState(prevState => ({
            modal: !prevState.modal
          }));
        }
        submit(e){
            e.preventDefault();
            let token = localStorage.getItem('token');
            let data = {
                    "question":this.state.question,
                    "ans1":this.state.ans1,
                    "ans2":this.state.ans2,
                    "ans3":this.state.ans3,
                    "id":this.props.id
            }
            axios.post("/api/v1/editquestion",data,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(r=>{
                toast.success(r.data.message, {
                    autoClose: 3000,
                    position: "bottom-right",
                  });
                  this.props.load();
            })
            .catch(e=>{
                toast.error("Unauthorized", {
                    autoClose: 3000,
                    position: "bottom-right",
                  });
                console.log(e);
            })
            this.toggle();
        }
        delete(){
            let token = localStorage.getItem('token');
            let data =
            {
                'id':this.props.id
            }
            axios.post("/api/v1/delquestion",data,{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(r=>{
                console.log(r);
                this.props.load();
            })
            .catch(e=>{
                console.log(e);
            })
            this.toggle();
        }
        handleInputChange(event) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            this.setState({
              [name]: value
            });
        }
        render(){
          return(
            <div>
              <Button color="blue" onClick={this.toggle}>Settings</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalBody>
                <Form id="edit" onSubmit={this.submit}>
                                    <FormGroup>
                                    <h4><Label for="q">The question</Label></h4>
                                    <Input onChange={this.handleInputChange} type="text" name="question" id="q" placeholder="Do you like our website?" value={this.state.question} required/>
                                    </FormGroup>
                                    <h4>The answears</h4>
                                    <FormGroup row>
                                        <Label for="ans1" sm={2}>1:</Label>
                                        <Col sm={10}>
                                            <Input onChange={this.handleInputChange} type="text" name="ans1" id="ans1" placeholder="Yes" value={this.state.ans1} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="ans2" sm={2}>2:</Label>
                                        <Col sm={10}>
                                            <Input onChange={this.handleInputChange} type="text" name="ans2" id="ans2" placeholder="No" value={this.state.ans2} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="ans3" sm={2}>3:</Label>
                                        <Col sm={10}>
                                            <Input onChange={this.handleInputChange} type="text" name="ans3" id="ans3" placeholder="I prefer to keep for me" value={this.state.ans3} required/>
                                        </Col>
                                    </FormGroup>
                                </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={this.delete}>Delete</Button>{' '}
                  <Button color="primary" onClick={this.submit}>Update</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          );
        }
}
class NavbarPage extends Component {
    constructor(props)
    {
        super(props);
        this.state=({
            isOpen:false
        });
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.logout = this.logout.bind(this);
    }
    logout()
    {
        let token = localStorage.getItem('token');
        axios.get("/api/auth/logout",{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(r=>{
                localStorage.setItem('token',null);
                window.location.reload();
                
            })
            .catch(r=>{
                toast.error("Unauthorized", {
                    autoClose: 3000,
                    position: "bottom-right",
                  });
            })
    }
    toggleCollapse(){
      this.setState({ isOpen: !this.state.isOpen });
    }
    
    render() {
      return (
        <MDBNavbar color="green" dark expand="md">
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBNavbarBrand>
          <strong className="white-text">Dashboard</strong>
        </MDBNavbarBrand>
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                    <strong className="white-text">{this.props.user}</strong>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default" right>
                    <MDBDropdownItem onClick={this.logout}>Logout</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        );
      }
}
class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state=({
            email:'',
            password:''
        })
        this.inputChange = this.inputChange.bind(this);
        this.submite = this.submite.bind(this);
    }
    inputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }
    submite(e){
       
        e.preventDefault();
        let data = {
            "remember_me":true,
            "email":this.state.email,
            "password":this.state.password
        };
        axios.post('/api/auth/login',data)
        .then(r=>{
            if(r.data.message=="Unauthorized")
            {
                toast.error("Unauthorized", {
                    autoClose: 3000,
                    position: "bottom-right",
                  });
            }
            else if(r.data.token_type=="Bearer")
            {
                toast.success("Welcome Back!", {
                    autoClose: 3000,
                    position: "bottom-right",
                  });
                localStorage.setItem('token',r.data.access_token);
                window.location.reload();
            }
        })
        .catch(r=>{
            toast.error("Unauthorized", {
                autoClose: 3000,
                position: "bottom-right",
              });
        })
    }
    render()
    {    
            return (
                <div className="center">
                     <MDBContainer className="text-center center">
            <MDBRow>
                <MDBCol>
                <form>
                    <p className="h5 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                    <MDBInput
                        onChange={this.inputChange}
                        label="Type your email"
                        group
                        type="email"
                        name="email"
                        validate
                        required
                        value={this.state.email}
                        error="wrong"
                        success="right"
                    />
                    <MDBInput
                        onChange={this.inputChange}
                        label="Type your password"
                        group
                        value={this.state.password}
                        name="password"
                        type="password"
                        required
                        validate
                    />
                    </div>
                    <div className="text-center">
                    <MDBBtn onClick={this.submite}>Login</MDBBtn>
                    </div>
                </form>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
                        <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                    />
                </div>
           
        );
    }
}
class AdminLayout extends Component {
    constructor(props)
    {
        super(props);
        this.state=({
            question:'',
            ans1:'',
            ans2:'',
            ans3:'',
            auth:false,
            user:'',
            questions:[]
        });
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.loadQuestions = this.loadQuestions.bind(this);
    }
    submit(e){
        e.preventDefault();
        let token = localStorage.getItem('token');
        let data = {
                "question":this.state.question,
                "ans1":this.state.ans1,
                "ans2":this.state.ans2,
                "ans3":this.state.ans3
        }
        axios.post("/api/v1/question",data,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(r=>{
            toast.success(r.data.message, {
                autoClose: 3000,
                position: "bottom-right",
              });
              this.setState({
                question:'',
                ans1:'',
                ans2:'',
                ans3:''
              })
              this.loadQuestions();
        })
        .catch(e=>{
            toast.error("Unauthorized", {
                autoClose: 3000,
                position: "bottom-right",
              });
            console.log(e);
        })
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }
    loadQuestions()
    {
        axios.get('/api/v1/questions')
        .then(r=>{
            this.setState({questions:(r.data)});
        })
        .catch(e=>{
            console.error(e);
        })
    }
    componentDidMount(){
        let token = localStorage.getItem('token');
        if(token!=null)
        {
            axios.get("/api/auth/user",{ headers: {"Authorization" : `Bearer ${token}`} })
            .then(r=>{
                
                if(r.data.id!='')
                {   
                    this.loadQuestions();
                    this.setState({auth:true,user:r.data.name});   
                }   
            })
            .catch(r=>{
                
            })
        }
    }
    render() {
        if(this.state.auth==false)
        {
            return (<Login/>)
        }
        else if(this.state.auth)
        {
            let rows=[];
            if(this.state.questions.length>0)
            {
                this.state.questions.forEach((element,id) => {
                let data = JSON.parse(element.question);
                    rows.push(
                        <tr key={id}>
                        <th scope="row">{id+1}</th>
                        <td>{data.question}</td>
                        <td><ModalExample load={this.loadQuestions} id={element.id} data={data}/></td>
                    </tr>
                    )
            });
            }
            
            return (
                        <div className="animated fadeIn text-center">
                        <NavbarPage user={this.state.user}/>
                        <br/>
                        <Row>
                            <Col md={4}>
                            <Card>
                                <CardBody>
                                    <h2><CardTitle>New Question</CardTitle></h2>
                                    <hr/>
                                </CardBody>
                                <CardBody>
                                <Form onSubmit={this.submit}>
                                    <FormGroup>
                                    <h4><Label for="q">The question</Label></h4>
                                    <Input onChange={this.handleInputChange} type="text" name="question" id="q" placeholder="Do you like our website?" value={this.state.question} required/>
                                    </FormGroup>
                                    <h4>The answears</h4>
                                    <FormGroup row>
                                        <Label for="ans1" sm={2}>1:</Label>
                                        <Col sm={10}>
                                            <Input onChange={this.handleInputChange} type="text" name="ans1" id="ans1" placeholder="Yes" value={this.state.ans1} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="ans2" sm={2}>2:</Label>
                                        <Col sm={10}>
                                            <Input onChange={this.handleInputChange} type="text" name="ans2" id="ans2" placeholder="No" value={this.state.ans2} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="ans3" sm={2}>3:</Label>
                                        <Col sm={10}>
                                            <Input onChange={this.handleInputChange} type="text" name="ans3" id="ans3" placeholder="I prefer to keep for me" value={this.state.ans3} required/>
                                        </Col>
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                                </CardBody>
                            </Card>
                            </Col>
                            <Col md={8}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Question</th>
                                    <th>Edit</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </Table>               
                            </Col>
                        </Row>     
                        <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                    />
                        </div>
                    );
        }
       
    }
}
export default AdminLayout;
