import React from 'react'

import { client } from '../lib/client'
import { Product, Footerbanner, Herobanner } from "../components"

const Home = ({ products, bannerData}) => {
  return (
    <main>
      <Herobanner heroBanner={bannerData.length && bannerData[0]} />
      
      <section className='products-heading'>
        <h2>Best sellers</h2>
        <p>Variations</p>
      </section>

      <div className='products-container'>
        {products?.map((product) => <Product key={product.id} product={product}/>)}
      </div>

      <Footerbanner footerBanner={bannerData && bannerData[0]} />
    </main>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type =="product"]';
  const products = await client.fetch(query)
  
  const bannerQuery = '*[_type =="banner"]';
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData }
  }
}

export default Home