import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery,
  getProductsFromCategory } from '../Services/api';
import '../App.css';

class Home extends React.Component {
    state ={
      products: [],
      categories: [],
      foundProducts: [],
      inicialInput: '',
      productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [],
      totalCount: JSON.parse(localStorage.getItem('totalCount')) || 0,
    }

    componentDidMount() {
      this.getCategoriesFromApi();
    }

    componentDidUpdate() {
      const { productsInCart } = this.state;
      localStorage.setItem('productsInCart',
        JSON.stringify(productsInCart));
      const { totalCount } = this.state;
      localStorage.setItem('totalCount', JSON.stringify(totalCount));
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    };

    async getCategoriesFromApi() {
      const response = await getCategories();
      this.setState({ categories: response });
    }

    searchProducts = async () => {
      const { inicialInput } = this.state;
      const products = await getProductsFromCategoryAndQuery('', inicialInput);
      const result = products.results;
      localStorage.setItem('foundProducts', JSON.stringify(result));
      this.setState({ foundProducts: result });
    };

    getCategoriesProdutcs = async ({ target }) => {
      const productsArray = await getProductsFromCategory(target.id);
      const result = productsArray.results;
      localStorage.setItem('foundProducts', JSON.stringify(result));
      this.setState({ foundProducts: result });
    }

    addToShoppingCart =(product) => {
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
      const { products, categories, foundProducts, inicialInput,
        totalCount } = this.state;
      return (
        <div className="Home">
          <section className="HomeSearch">
            { products.length === 0 && (
              <p
                data-testid="home-initial-message"
              >
                Pesquise uma produto ou uma Categoria.
              </p>
            )}
            <label htmlFor="inicialInput">
              <input
                data-testid="query-input"
                type="text"
                value={ inicialInput }
                id={ inicialInput }
                onChange={ this.handleChange }
                name="inicialInput"
              />
            </label>
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.searchProducts }
            >
              Pesquisar
            </button>
          </section>
          <section className="cartLink">
            <Link
              data-testid="shopping-cart-button"
              to="/shoppingcart"
            >
              Carrinho de Compras
            </Link>
          </section>
          <aside className="CategoriesBar">
            <h1>Categorias</h1>
            {categories
              .map(({ name, id }) => (
                <label data-testid="category" key={ id } htmlFor={ id }>
                  <input
                    type="radio"
                    name="category"
                    value={ name }
                    id={ id }
                    onClick={ this.getCategoriesProdutcs }
                  />
                  { name }
                </label>))}
          </aside>
          <section className="cartIcon">
            🛒
            <p data-testid="shopping-cart-size">
              {totalCount || JSON.parse(localStorage.getItem('totalCount')) }
            </p>
          </section>
          { foundProducts.length === 0 ? <p>Nenhum produto foi encontrado</p>
            : foundProducts.map((item) => (
              <div className="Products" key={ item.id }>
                <Link
                  data-testid="product-detail-link"
                  to={ `/product/details/${item.id}` }
                >
                  <div key={ item.id } data-testid="product">
                    <img src={ item.thumbnail } alt={ item.title } />
                    <p>{ item.title }</p>
                    <p>
                      R$
                      {' '}
                      { item.price }
                    </p>
                    {item.shipping.free_shipping && (
                      <p data-testid="free-shipping">Frete Grátis 📦</p>)}
                  </div>
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.addToShoppingCart(item) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            )) }
        </div>
      );
    }
}

export default Home;
