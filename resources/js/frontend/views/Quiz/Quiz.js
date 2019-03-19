import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input,Row,Col } from 'reactstrap';
class Quiz extends Component {
constructor(props)
{
    super(props);
    this.state=({
        questions:[],
        data:[]
    });
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.loadQuestions = this.loadQuestions.bind(this);
}
submit(e)
{
    e.preventDefault();
    console.log(e);
}
componentDidMount(){
    this.loadQuestions();
}
handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ 
        data: this.state.data.concat({[name]:value})
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
                            <Input type="radio" onChange={this.handleInputChange} name={element.id} value="ans1" required/>{' '}
                            {data.ans1}
                            </Label>
                        </FormGroup>
                        <FormGroup style={{textAlign:"justify"}} check>
                            <Label check>
                            <Input type="radio" onChange={this.handleInputChange} name={element.id} value="ans2" required/>{' '}
                            {data.ans2}
                            </Label>
                        </FormGroup>
                        <FormGroup style={{textAlign:"justify"}}  check >
                            <Label check>
                            <Input type="radio" onChange={this.handleInputChange} name={element.id} value="ans3" required/>{' '}
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
                <Form  className="text-center">
                    <Row>
                        {rows}
                    </Row>
                    {rows.length>0 && <Button onClick={this.submit} className="text-center">Submit</Button>}
                    
                </Form>
            </div>
        )
}
}

export default Quiz;
