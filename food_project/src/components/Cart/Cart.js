import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import cartClasses from './CartItem.module.css'

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  debugger;
  const totalAmount = cartCtx.totalAmount ? `$${cartCtx.totalAmount.toFixed(2)}` : 0
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem key={item.id} 
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button}>Order</button> }
      </div>
    </Modal>
  );
};

export default Cart;