import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header id='main-header'>
        <h1>Your Challenges</h1>
        <motion.button
          // onHoverStart={{ scale: 1.3 }}
          // onHoverEnd={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          // stiffness(빨라짐), mass(느려짐)
          transition={{ type: 'spring', stiffness: 500 }}
          onClick={handleStartAddNewChallenge}
          className='button'
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
