import React from 'react'
import { StackType } from 'types/landing'
import Image from 'next/image'
import s from './StackCard.module.scss'

export const StackCard: React.FC<StackType> = (stack) => {
  const { image, title, description, bgColor, borderColor } = stack

  const cardStyles: any = {
    '--bg-color': bgColor || 'rgba(0, 0, 0, 0.2)',
    '--border-color': borderColor || '#252525',
  }

  return (
    <div className={s.stack} style={cardStyles}>
      <div className={s.stack__icon}>
        <Image src={image} width={35} height={35} alt={title} />
      </div>
      <h4 className={s.stack__title}>{title}</h4>
      <p className={s.stack__descr}>{description}</p>
    </div>
  )
}
