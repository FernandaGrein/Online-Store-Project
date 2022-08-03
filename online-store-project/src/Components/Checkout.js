import React from 'react';
import { Link } from 'react-router-dom';

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <h3>Revise seu pedido</h3>
        <Link to="/shoppingcart">Voltar ao Carrinhho</Link>
        <form>
          <label htmlFor="name">
            {' '}
            Name:
            <input
              type="text"
              data-testid="checkout-fullname"
              name="fullname"
            />
          </label>
          <label htmlFor="email">
            {' '}
            Email:
            <input
              type="email"
              data-testid="checkout-email"
              name="email"
            />
          </label>
          <label htmlFor="cpf">
            {' '}
            Documento:
            <input
              type="text"
              data-testid="checkout-cpf"
              name="cpf"
            />
          </label>
          <label htmlFor="phone">
            {' '}
            Telefone:
            <input
              type="text"
              data-testid="checkout-phone"
              name="phone"
            />
          </label>
          <label htmlFor="cep">
            {' '}
            CEP:
            <input
              type="text"
              data-testid="checkout-cep"
              name="cep"
            />
          </label>
          {' '}
          Endereço:
          <label htmlFor="address">
            <input
              type="text"
              data-testid="checkout-address"
              name="address"
            />
          </label>
          <button type="submit">Finalizar Compra</button>
        </form>
      </div>
    );
  }
}

export default Checkout;
