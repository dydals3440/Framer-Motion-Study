import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className='backdrop' onClick={onClose} />
      <motion.dialog
        // initial (DOM에 추가 된후 곧바로 실행할 애니메이션의 초기 상태 적용 가능)
        // 만약 그 상태가 animate 상태에 벗어나면 framer 모션이 자동으로 애니메이션을 재생해 목표로하는 animate 상태에 도달한다.
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        open
        className='modal'
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
