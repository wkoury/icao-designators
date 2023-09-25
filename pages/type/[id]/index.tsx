import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { Table } from '@mantine/core';
import db from '../../../db.json';
import Head from 'next/head';
import styles from '../../../styles/Home.module.css';

type Designator = {
  Designator: string;
  [x: string]: any; // FIXME
};

interface TypeProps {
  types: any[];
}

const TypePage: NextPage<TypeProps> = ({ types }) => {
  const designator: string = types[0].Designator;

  return (
    <>
      <Head>
        <title>Type {designator}</title>
      </Head>
      <h1 className={styles.centerText}>{designator}</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designator</th>
            <th>Engine Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {types.map((item: any) => (
            <tr key={types.indexOf(item)}>
              <td>{item.ModelFullName}</td>
              <td>{item.Designator}</td>
              <td>{item.ManufacturerCode}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TypePage;

export const getStaticPaths: GetStaticPaths = async () => {
  let types = new Set<string>();
  db.forEach((item: Designator) => {
    types.add(item.Designator);
  });

  return {
    paths: Array.from(types).map((item: string) => ({
      params: {
        id: item,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  let id: string | undefined = undefined;
  if (Array.isArray(context.params?.id)) {
    id = context.params?.id[0];
  } else {
    id = context.params?.id;
  }

  const types = db.filter((item: any) => item.Designator === id);

  return {
    props: {
      types: types,
    },
  };
};
