import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionType from '../../../store/actions/index'
import { checkValidity } from '../../../store/utility'

class ContactData extends Component {
    state = {
        orderForm:{
           
            name:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation: {
                    required: true,

                },
                valid: false,
                touched: false
            } ,
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Your email'
                },
                value:'',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false
            } ,
            street:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'street'
                },
                value:'',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false
            } ,
            zipCode:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Postal code'
                },
                value:'',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                    
                },
                valid: false,
                touched: false
            } ,
            Country: {
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Country'
                },
                value:'',
                validation: {
                    required: true,
                    
                },
                valid: false,
                touched: false
            } ,
            
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            } 

        },
        formIsValid:false
        
    }

    orderHandler = (e) => {
        e.preventDefault();
         
         const formData = {};
         for(let formElementIdentifier in this.state.orderForm) {
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
         }
         console.log(formData)
       const order = {
           ingredients: this.props.ingredients,
           orderData: formData,
           price: this.props.price,
           userId: this.props.userId
        }

        this.props.onOrderBurger(order,this.props.token)
        

    }


    inputChangedHandler = (event,identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedElement = {
            ...updatedOrderForm[identifier]
        }
        updatedElement.value = event.target.value
        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
        updatedElement.touched = true
        updatedOrderForm[identifier] = updatedElement

        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm:updatedOrderForm , formIsValid:formIsValid})

    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                   {formElementsArray.map(el => {
                        return <Input key={el.id}
                                      elementType={el.config.elementType} 
                                      elementConfig={el.config.elementConfig} 
                                      value={el.config.value} 
                                      changed={(event)=>this.inputChangedHandler(event,el.id)}
                                      touched={el.config.touched}
                                      shouldvalidate={el.config.validation}
                                      invalid = {!el.config.valid}/>
                         
                    })}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actionType.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios))