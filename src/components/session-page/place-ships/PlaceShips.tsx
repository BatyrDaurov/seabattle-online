import React from 'react'
import s from './PlaceShips.module.scss'
import { useCustomDispatch } from '@lib/hooks/useCustomDispatch'
import { random } from '@store/slices/editor'
import { useCustomSelector } from '@lib/hooks/useCustomSelector'

type Props = { username: string; isMe?: boolean }

export const PlaceShips: React.FC<Props> = ({ username, isMe = false }) => {
  const dispatch = useCustomDispatch()
  const status = useCustomSelector((state) => state.party.started)

  return (
    <div className={s.generation}>
      <div className={s.generation__info}>
        {isMe && !status ? (
          <button
            className={s.generation__btn}
            onClick={() => dispatch(random())}
          >
            <img src="/icons/reset.svg" />
            Генерация поля
          </button>
        ) : (
          <p></p>
        )}
      </div>
      <p className={s.generation__prompt}>{username}</p>
    </div>
  )
}
