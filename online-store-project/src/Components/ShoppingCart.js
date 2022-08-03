import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class ShoppingCart extends React.Component {
    state ={
      cartProducts: [],
      productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [],
      totalCount: JSON.parse(localStorage.getItem('totalCount')) || 0,
    }

    componentDidMount() {
      this.counterProducts();
    }

    componentDidUpdate() {
      const { totalCount } = this.state;
      localStorage.setItem('totalCount', JSON.stringify(totalCount));
    }

    subtractCounter = ({ target }) => {
      const { cartProducts } = this.state;
      const { name } = target;
      const findElement = cartProducts.find((element) => element.title === name);
      if (findElement.count === 1) {
        return findElement;
      }
      findElement.count -= 1;
      cartProducts.splice(cartProducts.indexOf(findElement), 1, findElement);

      this.setState({ cartProducts },
        () => this.setState((prev) => ({ totalCount: prev.totalCount - 1 })));
    }

    addCounter = ({ target }) => {
      const { cartProducts, productsInCart } = this.state;
      const { name } = target;
      const findElement = cartProducts.find((element) => element.title === name);

      const itemStock = findElement.stock;
      if (findElement.count === itemStock) {
        return findElement;
      }
      findElement.count += 1;
      cartProducts.splice(cartProducts.indexOf(findElement), 1, findElement);
      localStorage.setItem('productsInCart',
        JSON.stringify([...productsInCart, findElement]));
      this.setState({ productsInCart:
        JSON.parse(localStorage.getItem('productsInCart')) });
      this.setState({ cartProducts },
        () => this.setState((prev) => ({ totalCount: prev.totalCount + 1 })));
    }

    counterProducts = () => {
      const { productsInCart } = this.state;
      const productsName = productsInCart.map((elemt) => `${elemt.title}`);
      const withoutRepetition = [...new Set(productsName)];
      withoutRepetition.forEach((itemName) => {
        const newProduct = {
          title: itemName,
          price: productsInCart.find((product) => product.title === itemName).price,
          count: productsInCart.filter((product) => product.title === itemName).length,
          stock: productsInCart.find((product) => product.title === itemName).stock,
        };
        this.setState((prev) => ({ cartProducts: [...prev.cartProducts, newProduct] }));
      });
    }

    render() {
      const { cartProducts, totalCount } = this.state;
      return (
        <div>
          <h1>MEU CARRINHO</h1>
          <Link to="/">Voltar ao Início</Link>
          <br />
          <br />
          <Link data-testid="checkout-products" to="/checkout">Finalizar Compras</Link>
          <section>
            🛒
            <p data-testid="shopping-cart-size">
              {totalCount || JSON.parse(localStorage.getItem('totalCount')) }
            </p>
          </section>
          { cartProducts.length === 0 && (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio

            </p>
          )}
          {cartProducts.map((item) => (
            <div key={ item.title }>
              <h2 data-testid="shopping-cart-product-name">{item.title}</h2>
              <p>{ item.price }</p>
              <button
                data-testid="product-increase-quantity"
                type="button"
                name={ item.title }
                id={ item.count }
                onClick={ this.addCounter }
              >
                +
              </button>
              <p data-testid="shopping-cart-product-quantity">
                { item.count }
              </p>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                name={ item.title }
                item={ item.count }
                onClick={ this.subtractCounter }
              >
                -
              </button>
            </div>
          ))}
        </div>
      );
    }
}

export default ShoppingCart;
