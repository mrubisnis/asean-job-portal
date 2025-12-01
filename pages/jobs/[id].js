import Head from 'next/head'
import { useRouter } from 'next/router'

export default function JobDetail() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Job Details - ASEAN Job Portal</title>
      </Head>
      <div className="min-h-screen bg-black text-white p-8">
        <h1>Job ID: {id}</h1>
        {/* Job details akan di-fetch berdasarkan ID */}
      </div>
    </>
  )
}
