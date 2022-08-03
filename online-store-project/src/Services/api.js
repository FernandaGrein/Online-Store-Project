export async function getCategories() {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories';
    const fetchCategories = await fetch(url);
    const data = await fetchCategories.json();
    return data;
  }
  
  export async function getProductsFromCategoryAndQuery(categoryId, query) {
    const byCategoryId = `category=${categoryId}`;
    const byQuery = `q=${query}`;
    const url = `https://api.mercadolibre.com/sites/MLB/search?${byCategoryId}&${byQuery}`;
    const fetchGetProducts = await fetch(url);
    const data = await fetchGetProducts.json();
    return data;
  }
  
  export async function getProductsFromCategory(categoryId) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const fetchGetProducts = await fetch(url);
    const data = await fetchGetProducts.json();
    return data;
  }
  