import { useContext, useRef, useState } from 'react';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';
import { motion } from 'framer-motion';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title='New Challenge' onClose={onDone}>
      <form id='new-challenge' onSubmit={handleSubmit}>
        <p>
          <label htmlFor='title'>Title</label>
          <input ref={title} type='text' name='title' id='title' />
        </p>

        <p>
          <label htmlFor='description'>Description</label>
          <textarea ref={description} name='description' id='description' />
        </p>

        <p>
          <label htmlFor='deadline'>Deadline</label>
          <input ref={deadline} type='date' name='deadline' id='deadline' />
        </p>

        <ul id='new-challenge-images'>
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1 },
              }}
              // backdrop이 늦게 닫히는 현상
              // exit할떄 활성화되는 variants를 visible로 덮어씌워서 오버라이드.
              // 모달에 해당하는 부모의 컴포넌트는 여전히 hidden이고, 자식 컴포넌트 중첩된 리스트 exit상태는 visible.
              // 여기서 exit: variants의 이름을 쓸 수 없다. 그에 해당하는 값을 써야한다. 나중에는 수정될 수 있지만, 배리언트 기능을 사용하려면 꼭 해결하고 넘어가야 한다. 애니메이션을 자동으로 활성화하면서 동시에 모달을 닫을 떄 발생하는 지연을 방지하기 위해서 이렇다.
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </ul>

        <p className='new-challenge-actions'>
          <button type='button' onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
