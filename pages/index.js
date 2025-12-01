import Head from 'next/head'
import JobPortal from '../components/JobPortal'

export default function Home() {
  return (
    <>
      <Head>
        <title>ASEAN Job Portal - Find Jobs in Southeast Asia</title>
      </Head>
      <JobPortal />
    </>
  )
}
