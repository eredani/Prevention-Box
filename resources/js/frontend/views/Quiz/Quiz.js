import React, {Component} from 'react';
import Pusher from 'pusher-js';
import { Button, Form, FormGroup, Label, Input,Row,Col } from 'reactstrap';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
var uniqid = require('uniqid');
class Quiz extends Component {
    constructor(props)
    {
        super(props);
        this.state=({
            questions:[],
            data:[],
            report:[]
        });
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.loadQuestions = this.loadQuestions.bind(this);
    }
    submit(e)
    {
        e.preventDefault();
        let data = {
            "data":this.state.data
        }
        axios.post('/api/v1/submit',data,{ headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')} })
        .then(r=>{
            if(r.data.message=="Success"){
                localStorage.setItem('answered',true);
                this.setState({
                    report:r.data.data
                })
            }
        })
        .catch(e=>{
            console.error(e);
        })
    }
    componentDidMount(){
        this.loadQuestions();
        this.pusher = new Pusher('2948bde252ef68ca5557', {
            cluster: 'eu',
            encrypted: true
            });
            this.channel = this.pusher.subscribe('Reports');   
            this.channel.bind('Update', msg => {
                this.setState({
                    report:msg
                });
            }, this); 
    }
    handleInputChange(event) {
        var array = [...this.state.data];
        array[event.target.name.toString()]=event.target.value;
        this.setState({
            data:array
        })
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
    render(){
            let ans = localStorage.getItem('answered');
            if(ans)
            {
                if(this.state.report.length>0)
                {
                    let charts = [];
                    this.state.report.forEach((data) => {
                        charts.push(
                            <Col key={uniqid()} sm={6} md={4} xl={3}><Charts ans1={data.quiz.ans1} ans2={data.quiz.ans2} ans3={data.quiz.ans3} quiz={data.quiz.question} total={data.votes} ans1val={data.ans1} ans2val={data.ans2} ans3val={data.ans3}></Charts></Col>
                        );
                    });
                    return (<Row>
                        {charts}
                    </Row>);
                }
                
            }
            let rows=[];
            if(this.state.questions.length>0)
            {
                this.state.questions.forEach((element,id) => {
                let data = JSON.parse(element.question);
                    rows.push(
                        <Col sm={12} md={4} key={id}>
                        <FormGroup tag="fieldset">
                            <legend>{data.question}</legend>
                            <FormGroup style={{textAlign:"justify"}}  check>
                                <Label check>
                                <Input type="radio" onChange={this.handleInputChange} name={id} value={"ans1-"+element.id} required/>{' '}
                                {data.ans1}
                                </Label>
                            </FormGroup>
                            <FormGroup style={{textAlign:"justify"}} check>
                                <Label check>
                                <Input type="radio" onChange={this.handleInputChange} name={id} value={"ans2-"+element.id} required/>{' '}
                                {data.ans2}
                                </Label>
                            </FormGroup>
                            <FormGroup style={{textAlign:"justify"}}  check >
                                <Label check>
                                <Input type="radio" onChange={this.handleInputChange} name={id} value={"ans3-"+element.id} required/>{' '}
                                {data.ans3}
                                </Label>
                            </FormGroup>
                            </FormGroup>
                        </Col>
                    )
            });
            }
            
            return (
                <div className="animated fadeIn">
                    <Form onSubmit={this.submit} className="text-center">
                        <Row>
                            {rows}
                        </Row>
                        {rows.length>0 && <Button  className="text-center">Submit</Button>}
                        
                    </Form>
                </div>
            )
    }
}
class Charts extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            dataPie: {
              labels: [this.props.ans1, this.props.ans2, this.props.ans3],
              datasets: [
                {
                  data: [this.props.ans1val, this.props.ans2val, this.props.ans3val],
                  backgroundColor: [
                    "#F7464A",
                    "#46BFBD",
                    "#FDB45C"
                  ],
                  hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1",
                    "#FFC870"
                  ]
                }
              ]
            }
          });
    }
    render() {
        return (
          <MDBContainer>
            <h3 className="mt-5">{this.props.total} votes for <br/>{this.props.quiz}</h3>
            <Pie data={this.state.dataPie} options={{ responsive: true }} />
          </MDBContainer>
        );
      }
    }
export default Quiz;
