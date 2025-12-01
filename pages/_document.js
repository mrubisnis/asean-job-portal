import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Find the best job opportunities across Southeast Asia. Browse thousands of jobs in Singapore, Malaysia, Indonesia, Philippines, and Thailand." />
        <meta name="keywords" content="jobs, Southeast Asia, ASEAN, careers, employment, job search, Singapore jobs, Malaysia jobs, Indonesia jobs, Philippines jobs, Thailand jobs" />
        <meta property="og:title" content="ASEAN Job Portal - Find Jobs in Southeast Asia" />
        <meta property="og:description" content="Search thousands of job opportunities across Southeast Asia" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossOrigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
