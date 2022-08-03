import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../App.css';

class ProductDetails extends React.Component {
    state = {
      foundProducts: JSON.parse(localStorage.getItem('foundProducts')) || [],
      product: [],
      productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [],
      evaluations: [],
      rating: '',
      evaluation: '',
      email: '',
      totalCount: JSON.parse(localStorage.getItem('totalCount')) || 0,
    }

    componentDidMount() {
      const { match: { params: { id } } } = this.props;

      const getevaluationsFromLocal = localStorage.getItem(id);
      const Jsonevaluations = getevaluationsFromLocal !== null ? (
        JSON.parse(getevaluationsFromLocal)
      ) : [];

      this.setState({
        evaluations: Jsonevaluations,
      });

      this.getProduct();
    }

    componentDidUpdate() {
      const { productsInCart } = this.state;
      localStorage.setItem('productsInCart', JSON.stringify(productsInCart));

      const { evaluations, product } = this.state;
      localStorage.setItem(product.id, JSON.stringify(evaluations));

      const { totalCount } = this.state;
      localStorage.setItem('totalCount', JSON.stringify(totalCount));
    }

    saveAvaliation = () => {
      const { email, rating, evaluation } = this.state;
      const newObj = {
        email,
        rating,
        evaluation,
      };
      this.setState((prev) => ({ evaluations: [...prev.evaluations, newObj],
        rating: '',
        evaluation: '',
        email: '',
      }));
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    };

    getProduct = () => {
      const { foundProducts } = this.state;
      const { match: { params: { id } } } = this.props;

      const obj = foundProducts.find((item) => item.id === id);

      localStorage.setItem('product', JSON.stringify(obj));

      this.setState({ product: obj });
    }

    addToShoppingCart =() => {
      const { product } = this.state;

      const newObj = {
        title: product.title,
        price: product.price,
        stock: product.available_quantity,
      };

      this.setState((prev) => ({ productsInCart:
        [...prev.productsInCart, newObj] }),
      () => this.setState((prev) => ({ totalCount: prev.totalCount + 1 })));
    }

    render() {
      const { product, email, rating, evaluation, evaluations,
        totalCount } = this.state;
      const { match: { params: { id } } } = this.props;
      return (
        <div className="productsDetailsPage">
          <h1 data-testid="product-detail-name">{product.title}</h1>
          <p>
            {' '}
            R$
            {' '}
            {product.price}
          </p>
          { product.shipping ? product.shipping.free_shipping && (
            <p data-testid="free-shipping">Frete Grátis 📦</p>) : null }
          <img src={ product.thumbnail } alt={ product.name } />
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addToShoppingCart }
          >
            Adicionar ao carrinho
          </button>
          <Link
            className="productsLink"
            data-testid="shopping-cart-button"
            to="/shoppingcart"
          >
            Carrinho de Compras
          </Link>
          <Link className="productsLink" to="/">Voltar ao Início</Link>
          <section>
            🛒
            <p data-testid="shopping-cart-size">
              {totalCount || JSON.parse(localStorage.getItem('totalCount')) }
            </p>
          </section>
          <form className="formsAvaliation">
            <label htmlFor="detailEmail">
              {' '}
              Email:
              {' '}
              <input
                onChange={ this.handleChange }
                id="detailEmail"
                type="email"
                value={ email }
                name="email"
                data-testid="product-detail-email"
                placeholder="Email"
              />
            </label>
            {' '}
            Qual a sua nota?
            <select onChange={ this.handleChange } value={ rating } name="rating">
              <option value="1" data-testid="1-rating">1</option>
              <option value="2" data-testid="2-rating">2</option>
              <option value="3" data-testid="3-rating">3</option>
              <option value="4" data-testid="4-rating">4</option>
              <option value="5" data-testid="5-rating">5</option>
            </select>
            <label htmlFor="detailEvaluation">
              {' '}
              Detalhes da Avaliação:
              {' '}
              <textarea
                onChange={ this.handleChange }
                data-testid="product-detail-evaluation"
                value={ evaluation }
                name="evaluation"
                id="detailEvaluation"
                placeholder="Mensagem(opcional)"
              />
            </label>
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.saveAvaliation }
              id={ id }
            >
              Avaliar

            </button>
          </form>
          { evaluations && (
            evaluations.map((item, index) => (
              <div key={ item[index] }>
                <p>{ item.email }</p>
                <p>{ item.rating }</p>
                <p>{ item.evaluation }</p>
              </div>
            )))}
        </div>
      );
    }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default ProductDetails;
