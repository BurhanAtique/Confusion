import React,{Component} from 'react';
import { Row, Form,FormFeedback, FormGroup, Input, Label,Modal,ModalHeader, ModalBody, Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

    class CommentForm extends Component{
        constructor(props){
            super(props);
            
            this.state = {
                isModalOpen:false,
                name: '',
                touched:false,
                rating:'',
                message:'',
            }
            
            this.handleBlur=this.handleBlur.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit=this.handleSubmit.bind(this);
            this.handleInputChange=this.handleInputChange.bind(this);

        }
        toggleModal(){
            this.setState({
                isModalOpen:!this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            alert("here");
            alert(values.rating);
            alert(values.comment);
            alert(this.props.dishId);
            console.log(values);
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        handleInputChange(event) {
            const target = event.target;
            const value = target.value;
            const name = target.name;
            this.setState({
              [name]: value
            });
        }

        handleBlur = () => (evt) => {
            this.setState({
                touched: true 
            });
        }

        validate(name) {
            const errors = {
                name: '',
            };
            if (this.state.touched && name.length < 3)
            errors.name = 'Your Name should be >= 3 characters';
            else if (this.state.touched && name.length > 15)
            errors.name = 'First Name should be <= 15 characters';

            return errors;
        }

        render(){
            const errors= this.validate(this.state.name);
            return(
                <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="select" name="rating"
                                            value={this.state.rating}
                                            onChange={this.handleInputChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" id="name" name="name" placeholder="Your name"
                                    value={this.state.name}
                                    valid={errors.name === ''}
                                    invalid={errors.name !== ''}
                                    onBlur={this.handleBlur()}
                                    onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                            <Label htmlFor="message">Comment</Label>
                                <Input type="textarea" id="message" name="message"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}></Input>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                </div>
            );
        }
    }

    function RenderDish({dish}) {
        return (
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments, addComment, dishId}){
        if(comments == null){
            return(<div></div>);
        }
        const showcmnts = comments.map((cmnt) => {
            return(
                <li key={cmnt.id}>
                    <p>{cmnt.comment}</p>
                    <p>--{cmnt.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(cmnt.date))}
                    </p>
                </li>
            );
        });

        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {showcmnts}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        );
    }
    
const DishDetail = (props) =>
{   
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} addComment={props.addComment}
        dishId={props.dish.id} />
                        
                    </div>
                   
                </div>
                </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }


}
    
export default DishDetail;