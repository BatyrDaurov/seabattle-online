import React from 'react'
import s from './ButtonPrimary.module.scss'

type Props = {
  children: React.ReactNode
}

export const ButtonPrimary: React.FC<Props> = ({ children }) => {
  return <button className={s.button}>{children}</button>
}
