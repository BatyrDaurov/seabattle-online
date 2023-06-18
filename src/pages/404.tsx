import { MainLayout } from '@components/@layout'
import { NotFoundError } from '@components/@shared/not-found-error/NotFoundError'
import React from 'react'

const NotFound: React.FC = () => (
  <MainLayout>
    <NotFoundError />
  </MainLayout>
)

export default NotFound
