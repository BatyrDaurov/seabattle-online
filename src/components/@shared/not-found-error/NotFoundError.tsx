import React from 'react'
import Link from 'next/link'
import s from './NotFoundError.module.scss'

export const NotFoundError: React.FC = () => {
  return (
    <div className={s.error}>
      <h1 className={s.error__title}>Страницы не существует...</h1>
      <Link className={s.error__link} href="/">
        Вернутся на главную страницу
      </Link>
    </div>
  )
}
