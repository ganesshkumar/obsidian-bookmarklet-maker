import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>This is a starter template using nextjs, typescript and tailwindcss </div>
    </div>
  )
}

export default Home;
