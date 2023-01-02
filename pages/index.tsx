import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ProductFeed from '../components/ProductFeed'
import { ProductType } from '../types/Product'

export default function Home(data: Props) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* Header */}
      <Header />
      

      <div className='max-w-screen-2xl mx-auto'>
        {/* Banner */}
        <Banner />

        {/* ProductFeed */}
        <ProductFeed 
          products={data.products}
        />
      </div>
    </div>
  )
}

type Props = {
  products: ProductType[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await fetch('https://fakestoreapi.com/products')
  .then(res=> res.json());
  // GET https://fakestoreapi.com/products
  return {
    props: {
      products
    }
  }
}
