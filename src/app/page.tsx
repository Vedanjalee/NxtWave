// app/page.tsx
import Home from './home/home';

// Fetching data directly in the component itself using async/await
const Page = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return <Home products={products} />;
};

export default Page;
