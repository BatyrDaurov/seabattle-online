import React from 'react'
import { motion } from 'framer-motion'
import { animationsVariants } from '@lib/constants/landing/animationsProperty'
import Image from 'next/image'
import Link from 'next/link'
import s from './HeroSection.module.scss'

export const HeroSection: React.FC = () => {
  return (
    <section className={s.hero}>
      <motion.div
        viewport={{ once: true }}
        initial="hidden"
        whileInView="visible"
        variants={animationsVariants('row', 'left')}
        transition={{
          duration: 1.1,
          delay: 0.6,
          type: 'spring',
        }}
        className={s.hero__info}
      >
        <h1 className={s.hero__title}>
          Просто <span>морской бой</span>, ничего лишнего.
        </h1>
        <p className={s.hero__descr}>
          — классическая настольная игра, мой главный{' '}
          <Link href="https://github.com/BatyrDaurov">пет-проект</Link> с
          открытым исходным кодом. Стек проекта, и больше информации о нем
          ниже...
        </p>
      </motion.div>
      <motion.div
        viewport={{ once: true }}
        initial="hidden"
        whileInView="visible"
        variants={animationsVariants('row', 'right')}
        transition={{
          duration: 1.1,
          delay: 0.9,
          type: 'spring',
        }}
        className={s.hero__banner}
      >
        <Image
          width="0"
          height="0"
          sizes="100vw"
          src="/hero_img.png"
          alt="ship"
        />
      </motion.div>
    </section>
  )
}
