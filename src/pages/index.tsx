import { MainLayout } from '@components/@layout'
import { HeroSection, StackSection } from '@components/landing-page'

/*
 Landing
*/
const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <StackSection />
    </MainLayout>
  )
}

export default HomePage
