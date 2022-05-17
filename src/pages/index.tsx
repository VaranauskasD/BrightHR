import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import React from 'react'
import styled from 'styled-components'

import { Dashboard, DashboardProps, DataFile } from '../components'
import { AnyRecord } from 'dns'

const Home: NextPage<{ dashboard: DashboardProps }> = (props: {
  dashboard: DashboardProps
}) => {
  const DashboardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `

  return (
    <React.Fragment>
      <Head>
        <title>BrightHR</title>
        <meta name="description" content="BrightHR interview task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DashboardWrapper>
          <Dashboard data={props.dashboard?.data} />
        </DashboardWrapper>
      </main>
    </React.Fragment>
  )
}

Home.getInitialProps = async () => {
  const dashboard = {
    data: [
      {
        'type': 'pdf',
        'name': 'Employee Handbook',
        'added': '2017-01-06',
      },
      {
        'type': 'pdf',
        'name': 'Public Holiday policy',
        'added': '2016-12-06',
      },
      {
        'type': 'folder',
        'name': 'Expenses',
        'files': [
          {
            'type': 'doc',
            'name': 'Expenses claim form',
            'added': '2017-05-02',
          },
          {
            'type': 'doc',
            'name': 'Fuel allowances',
            'added': '2017-05-03',
          },
        ],
      },
      {
        'type': 'csv',
        'name': 'Cost centres',
        'added': '2016-08-12',
      },
      {
        'type': 'folder',
        'name': 'Misc',
        'files': [
          {
            'type': 'doc',
            'name': 'Christmas party',
            'added': '2017-12-01',
          },
          {
            'type': 'mov',
            'name': 'Welcome to the company!',
            'added': '2015-04-24',
          },
        ],
      },
    ],
  }

  return { dashboard }
}

export default Home
