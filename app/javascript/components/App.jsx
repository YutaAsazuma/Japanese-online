import React, { Component } from "react";
import axios from "axios"
import TypeList from "./TypeList";
import ProductList from "./ProductsList";



class App extends Component {

  
  state = {
    products: []
  }

  componentDidMount() {
    axios.get(`/products.json`)
      .then(response => {
        console.log(response)
        this.setState({products: response.data})
      })
      .catch(error => console.log(error))
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <ProductList products={products} />
      </div>
    )
  }
}



export default App;
