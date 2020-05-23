import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckouSummary'
import {Route,Redirect} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'
import {connect} from 'react-redux'


class Checkout extends Component {

    
   /* componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0
        for(let param of query.entries()){
            //['salad','1']
            if(param[0]==='price'){
                price= +param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
           
        }
        this.setState({
            ingredients:ingredients,
            totalPrice:price
        })
    }*/

    checkoutCancelledHandler = () => {
        //go back method allows us to go to the last page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');

    }
    render (){
        let summary = <Redirect to="/" />
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect /> : null;
        summary = 
                (<div>
                    {purchasedRedirect}
                <CheckoutSummary 
            ingredients={this.props.ings} 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
            <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>

            

                )}
           
              return summary  
    }

//using render in route for contactdata instead  of component, because we want to pass ingredients to it
//render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>) }/></div>
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        
    }
}



export default connect(mapStateToProps)(Checkout)