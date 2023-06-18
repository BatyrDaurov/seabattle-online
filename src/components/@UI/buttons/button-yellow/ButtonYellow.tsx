import React from 'react'
import s from './ButtonYellow.module.scss'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const ButtonYellow: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button disabled={disabled} onClick={onClick} className={s.button}>
      {children}
    </button>
  )
}
