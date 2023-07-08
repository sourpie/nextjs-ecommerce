import { getCart } from "@/lib/db/carts"
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";


const CartPage = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Shopping Cart
      </h1>
      {cart?.items.map(cartItem => (
        <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
      ))}
      {!cart?.items.length && <p>Your Cart is Empty</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0 )}
        </p>
        <button className="btn btn-primary">Checkout</button>
      </div>
    </div>
  )
}

export default CartPage