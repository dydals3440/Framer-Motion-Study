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
        {/* framer안쓰면 키는 다른 용도로 사용됨, 어떤 요소에 키를 추가하고 키에 할당된 값을 변경하면 예컨데 상태변화로 인해서 말이다. 리액트는 이전 컴포넌트 인스턴스를 없애고 새것을 랜더링한다. 따라서 원하는 컴포넌트에 key 속성을 추가하고, 값을 변경하면 리액트가 해당 컴포넌트를 다시 생성해 준다. 이로써 해당 컴포넌트에 저장된 내부상태는 재설정, 따라서 플레이되어야하는 뱃지의 진입 애니메이션이 다시 시작되게함. */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
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
