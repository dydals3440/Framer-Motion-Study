import Badge from './Badge.jsx';
import { motion } from 'framer-motion';

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge caption={badgeCaption}></Badge>
      </button>
      {isSelected && (
        // layoutId를 주어서, 같은 돔요소가, 스타일링만 변경되는 경우에 알아서 부드러운 효과를 준다.
        // 페이지의 다른 위치에 있는 같은 layoutId를 지닌 다른 요소가 렌더링 되는 떄를 자동으로 감지해서 알아서 부드러운 애니메이션을 적용해 준다.
        <motion.div layoutId='tab-indicator' className='active-tab-indicator' />
      )}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id='tabs'>
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
