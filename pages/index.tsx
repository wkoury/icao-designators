import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { TextInput, Table } from '@mantine/core';
import styles from '../styles/Home.module.css';
import db from '../db.json';

interface HomeProps {
  db: any;
}

const Home: NextPage<HomeProps> = ({ db }) => {
  const router = useRouter();

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`?search=${e.currentTarget.value}`);
    }
  };

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
        <TextInput placeholder="Search..." onKeyUp={handleKeyUp} />
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designator</th>
              <th>Engine Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {db.map((item: any) => (
              <tr key={db.indexOf(item)}>
                <td>
                  <Link href={`/type/${item.Designator}`}>{item.ModelFullName}</Link>
                </td>
                <td>{item.Designator}</td>
                <td>{item.ManufacturerCode}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <span>Next Database Update: July 14, 2023</span>
      </main>
    </>
  );
};

export async function getServerSideProps(context: { query: { p: number; search: string } }) {
  const page: number = (context.query?.p as number) || 1;
  const searchQuery: string = (context.query?.search as string) || '';

  const skip = page - 1;
  const take = 25;

  db.sort((a: any, b: any) => a.Designator.localeCompare(b.Designator));

  const ret = db.filter((item: any) => {
    return (
      item.Designator.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      item.ModelFullName.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      item.ManufacturerCode.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
  });

  const pageCount = Math.ceil(ret.length / take);

  return {
    props: {
      db: ret,
      pageCount,
    },
  };
}

export default Home;
