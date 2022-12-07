import React from 'react'
import {motion} from 'framer-motion'


export const Home=()=> {
  return (
    <div>
      <motion.h1 initial={{y:-250}} animate={{y:60}}>
        Home page
      </motion.h1>
    </div>
  )
}
