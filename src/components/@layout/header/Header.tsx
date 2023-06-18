import React from 'react'
import Link from 'next/link'
import s from './Header.module.scss'

export const Header: React.FC = () => {
  const [menuActive, setMenuActive] = React.useState(false)

  return (
    <header className={s.header}>
      <div className={`container ${s.header__container}`}>
        <Link className={s.header__logo} href="/">
          Морской бой
        </Link>
        <button
          className={`${s.header__burger} ${
            menuActive ? s.header__burger_active : ''
          }`}
          onClick={() => setMenuActive(!menuActive)}
        >
          <span></span>
        </button>
        <nav
          className={`${s.header__nav} ${
            menuActive ? s.header__nav_active : ''
          }`}
        >
          <Link
            onClick={() => setMenuActive(false)}
            className={s.header__link}
            href="/"
          >
            О проекте
          </Link>
          <Link
            onClick={() => setMenuActive(false)}
            className={s.header__link}
            href="/rooms"
          >
            Комнаты
          </Link>
          <Link
            onClick={() => setMenuActive(false)}
            className={s.header__play}
            href="/game"
          >
            Найти игру
          </Link>
        </nav>
      </div>
    </header>
  )
}
