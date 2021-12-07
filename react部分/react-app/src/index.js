import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
//     this.handleInStockChange = this.handleInStockChange.bind(this);
//   }
  
//   handleFilterTextChange(e) {
//     this.props.onFilterTextChange(e.target.value);
//   }
  
//   handleInStockChange(e) {
//     this.props.onInStockChange(e.target.checked);
//   }
//   render() {
//     const filterText = this.props.filterText;
//     const inStockOnly = this.props.inStockOnly;

//     return (
//       <form>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={filterText}
//           onChange={this.handleFilterTextChange}
//           />
//         <p>
//           <input
//             type="checkbox"
//             checked={inStockOnly}
//             onChange={this.handleInStockChange}
//             />
//           {' '}
//           Only show products in stock
//         </p>
//       </form>
//     );
//   }
// }
function SearchBar(props) {
  const handleFilterTextChange = (e) => {
    props.onFilterTextChange(e.target.value);
  };
  
  const handleInStockChange =(e) => {
    props.onInStockChange(e.target.checked);
  }
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={props.filterText}
        onChange={(e) => handleFilterTextChange(e)}
        />
      <p>
        <input
          type="checkbox"
          checked={props.inStockOnly}
          onChange={(e) => handleInStockChange(e)}
          />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
}

// class FilterableProductTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filterText: '',
//       inStockOnly: false
//     };
//     this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
//     this.handleInStockChange = this.handleInStockChange.bind(this);
//   }
//   handleFilterTextChange(filterText) {
//     this.setState({
//       filterText: filterText
//     });
//   }
  
//   handleInStockChange(inStockOnly) {
//     this.setState({
//       inStockOnly: inStockOnly
//     })
//   }
//   render() {
//     return (
//       <div>
//         <SearchBar filterText={this.state.filterText}
//           inStockOnly={this.state.inStockOnly} 
//           onFilterTextChange={this.handleFilterTextChange}
//           onInStockChange={this.handleInStockChange}
//           />
//         <ProductTable products={this.props.products}
//         filterText={this.state.filterText}
//         inStockOnly={this.state.inStockOnly} />
//       </div>
//     );
//   }
// }
function FilterableProductTable(props) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const handleFilterTextChange = (filterText) => setFilterText(filterText);
  const handleInStockChange = (inStockOnly) => setInStockOnly(inStockOnly);
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${filterText} times`;
  });
  return (
    <div>
      <SearchBar filterText={filterText}
        inStockOnly={inStockOnly} 
        onFilterTextChange={(filterText) => handleFilterTextChange(filterText)}
        onInStockChange={(inStockOnly) => handleInStockChange(inStockOnly)}
        />
      <ProductTable products={props.products}
      filterText={filterText}
      inStockOnly={inStockOnly} />
    </div>
  );
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
const ChatAPI = {
  subscribeToFriendStatus() {
    
  }
}
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
 
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
