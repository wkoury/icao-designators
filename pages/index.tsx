import type { NextPage } from 'next';
import Head from 'next/head';
import React, { ChangeEventHandler, useState } from 'react';
// import { Inter } from '@next/font/google';
import { TextInput, Table } from '@mantine/core';
import styles from '../styles/Home.module.css';
import db from '../db.json';

// const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  db: any;
}

const Home: NextPage<HomeProps> = ({ db }) => {
  const [query, setQuery] = useState<string>('');

  const items = db.filter((item: any) => {
    return (
      item.Designator.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      item.ModelFullName.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
      item.ManufacturerCode.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  });

  return (
    <>
      <Head>
        <title>ICAO Type Designators</title>
        <meta name="description" content="An easier to search database of ICAO designators, updated regularly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <h1>ICAO Type Designators</h1>
        <TextInput
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designator</th>
              <th>Engine Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={items.indexOf(item)}>
                <td>{item.ModelFullName}</td>
                <td>{item.Designator}</td>
                <td>{item.ManufacturerCode}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
