import type { NextPage } from 'next';
import Head from 'next/head';
// import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import db from '../db.json';

// const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  db: any;
}

const Home: NextPage<HomeProps> = ({ db }) => {
  console.log(db);

  return (
    <>
      <Head>
        <title>ICAO Type Designators</title>
        <meta name="description" content="An easier to search database of ICAO designators, updated regularly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <h1>Butts</h1>
        <ul>
          {db.map((item: any) => (
            <li key={db.indexOf(item)}>{item.Designator}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      db,
    },
  };
}

export default Home;
