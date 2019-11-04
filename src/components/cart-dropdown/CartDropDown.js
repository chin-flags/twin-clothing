import React from 'react';
import { connect } from 'react-redux';
import './cart-dropdown.scss';
import CartItem from '../cart-item/CartItem';
import { cartItemsSelector } from '../../redux/cart/cartSelectors';

import CustomButton from '../custom-button/CustomButton';

const CartDropDown =({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(item => <CartItem item={item} />)
            }
        </div>
        <CustomButton>GO TO CHECKOUT </CustomButton>
    </div>
)

const mapStateToProps = (state) => ({
    cartItems: cartItemsSelector(state)
});
export default connect(mapStateToProps)(CartDropDown);