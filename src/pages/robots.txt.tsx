import { GetServerSideProps } from 'next'

const RobotsTxt = () => {
  // This component doesn't render anything
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hytaleworld.net'
  
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /demo

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for better server performance
Crawl-delay: 1`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robotsTxt)
  res.end()

  return {
    props: {}
  }
}

export default RobotsTxt