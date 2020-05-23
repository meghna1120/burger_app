import React, {Component} from 'react'
import Aux from '../../hoc/Auxi/Auxi'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as burgerBuilderAction from '../../store/actions/index'


export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount () {
      /*  axios.get('https://react-my-burger-4b36a.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            }).catch(error =>{
                this.setState({error:true})
            }) */
            this.props.onInitIngredient()
        console.log(this.props.ings);
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                .map(igKey => {
                    return ingredients[igKey];
                })
                .reduce((sum,el) => {
                    return sum + el;
                } , 0);
        return sum>0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true})
        }
        else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
       // alert('You Continue!')
      
       /* const queryParam = []
        //encodeURIcomponent makes the elements compatible for URL for eg removes whitespaces
        for( let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParam.push("price=" + this.state.totalPrice.toFixed(2))
        const queryString = queryParam.join('&') 
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        })*/
        this.props.history.push('/checkout')
    }
    render(){

    const disabledInfo = {
        ...this.props.ings
    }

    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded...</p> : <Spinner />
    if(this.props.ings){
     burger = (
        <Aux>
    <Burger ingredients = {this.props.ings}/>
    <BuildControls 
         ingredientAdded={this.props.onIngredientAdded}
         ingredientRemoved={this.props.onIngredientRemoved}
         disabled = {disabledInfo}
         purchaseable = {this.updatePurchaseState(this.props.ings)}
         isAuth={this.props.isAuthenticated}
         price = {this.props.price}
         ordered = {this.purchaseHandler}/>
         </Aux>);

orderSummary = <OrderSummary 
ingredients={this.props.ings}
purchaseCancelled = {this.purchaseCancelHandler}
purchaseContinued = {this.purchaseContinueHandler}
price = {this.props.price}/>;


   
       
    }

    
    for( let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
    }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderAction.initIngredients()),
        onInitPurchase: ()=> dispatch(burgerBuilderAction.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderAction.setAuthRedirectPath(path))

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))