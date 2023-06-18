import React from 'react'
import s from './GameWrapper.module.scss'
import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  isSession?: boolean
}

export const GameWrapper: React.FC<Props> = ({ children, isSession }) => {
  return (
    <div
      className={classNames({
        [s.wrapper]: true,
        [s.wrapper__session]: isSession,
      })}
    >
      {children}
    </div>
  )
}
