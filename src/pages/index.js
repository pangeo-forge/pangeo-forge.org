import { Layout, Hero, About, HowItWorks } from '@/components'
import { Summary } from '@/components/dashboard'

const Index = () => {
  return (
    <Layout container={false}>
      <Hero />
      <Summary />
      <About />
      <HowItWorks />
    </Layout>
  )
}

export default Index
