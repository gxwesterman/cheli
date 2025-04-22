import { motion } from "motion/react";

export const Treble = () => {
  return (
    <motion.path
      d="M50,180
        C50,15 50,20 50,20
        C100,20 100,80 50,80
        C50,80 5,80 5,120
        C5,120 5,160 50,160
        C50,160 90,160 95,120"
      stroke="oklch(0.809 0.105 251.813)"
      fill="transparent"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: 1,
        transition: {
          opacity: { duration: 0.01 },
          pathLength: { duration: 0.75 },
        },
      }}
      exit={{ pathLength: 0 }}
      custom={1}
      style={{ strokeWidth: 20, strokeLinecap: "round" }}
    />
  )
}

export const Bass = () => {
  return (
    <>
      <motion.path
        d="M20,185
          C50,160 95,120 95,80
          C95,80 95,40 50,40
          C50,40 10,40 5,80"
        stroke="oklch(0.827 0.119 306.383)"
        fill="transparent"
        custom={1}
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,
          transition: {
            opacity: { duration: 0.01 },
            pathLength: { duration: 0.5 },
          },
        }}
        exit={{ pathLength: 0 }}
        style={{ strokeWidth: 20, strokeLinecap: "round" }}
      />
      <motion.circle
        cx="130"
        cy="70"
        r="10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        fill="oklch(0.827 0.119 306.383)"
        custom={1}
      />
      <motion.circle
        cx="130"
        cy="100"
        r="10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        fill="oklch(0.827 0.119 306.383)"
        custom={1}
      />
    </>
  )
}