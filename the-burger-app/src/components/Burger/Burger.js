import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>{

    //Object.keys is a JS func which takes the object keys and convert them into array PS it's not a React func
    let transformedIngredients = Object.keys(props.ingredients)
                        .map(igKey => {
                            return [...Array(props.ingredients[igKey])].map((_, i) => {
                                return <BurgerIngredient key={igKey+i} type = {igKey} />
                            })
                        }).reduce((arr,el) => {
                            return arr.concat(el)
                        }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding some ingredients!</p>
    }
                    
                console.log(transformedIngredients)

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );
}

export default burger;