import * as actiontype from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actiontype.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actiontype.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actiontype.SET_INGREDIENTS,
        ingredients: ingredients
    }

}

export const fetchIngredientsFailed = () => {
    return {
        type: actiontype.FETCH_INGREDIENTS_FAILED
        
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-4b36a.firebaseio.com/ingredients.json')
            .then(response => {
               dispatch(setIngredients(response.data))
            }).catch(error =>{
               dispatch(fetchIngredientsFailed())
            })

    }
}