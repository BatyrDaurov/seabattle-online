import React from 'react'
import s from './StackSection.module.scss'
import { StackType } from 'types/landing'
import { stacks } from '@lib/constants/landing/stacks'
import { motion } from 'framer-motion'
import { animationsVariants } from '@lib/constants/landing/animationsProperty'
import { StackCard } from './cards/StackCard'

export const StackSection: React.FC = () => {
  return (
    <section className={s.stacks}>
      <motion.h2
        className={s.stacks__title}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        variants={animationsVariants('column', 'bottom')}
        transition={{
          duration: 1.4,
          type: 'spring',
        }}
      >
        Технический <span>Stack</span>
      </motion.h2>
      <ul className={s.stacks__list}>
        {stacks.map((stack: StackType, index: number) => (
          <motion.li
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationsVariants('column', 'bottom')}
            transition={{
              duration: 0.8,
              delay: 0.25 * index,
              type: 'spring',
            }}
          >
            <StackCard {...stack} />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
