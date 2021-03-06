import React from 'react';
import { OuraData } from 'quantified/types';
import { OuraService } from 'quantified/services/sleep';
import { OuraInsights } from 'quantified/components/Oura';
import Layout from '../../../layouts/Layout';

interface SleepQuantifiedPageProps {
  oura: OuraData;
}

function SleepQuantifiedPage({ oura, ...rest }: SleepQuantifiedPageProps) {
  console.log(oura);

  return (
    <>
      <OuraInsights {...oura} />
    </>
  );
}

export async function getStaticProps() {
  const oura = OuraService.allData();

  return {
    props: {
      oura: await oura,
    },
    revalidate: 60 * 60, // one hour
  };
}

SleepQuantifiedPage.getLayout = (page) => <Layout title="Sleep">{page}</Layout>;

export default SleepQuantifiedPage;
