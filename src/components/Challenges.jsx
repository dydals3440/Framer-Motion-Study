import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter(
      (challenge) => challenge.status === 'completed'
    ),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id='challenges'>
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {/* 갑자기 사라지는 이유 빈 배열이되면 DOM에서 사라지기 떄문. 애니메이션에 적용할려면 <AnimationPresence></AnimationPresence>로 감싸야함.*/}
        {/* mode의 기본속성은 sync, 컴포넌트 안에 있는 모든 애니메이션을 동시에 플레이 리스트처럼 어떤 요소가 사라지거나, 아래의 문구처럼 어떤 요소가 나타나면 두 애니메이션을 동시에 플레이함.*/}
        {/* mode를 wait으로 설정한 후, 첫번쨰 요소가 사라지길 기다리고, 나타나는 애니메이션을 플레이하도록 함., 첫번째 두번째 투두항목이 지워지고 => fallback 텍스트가 나오게함. */}
        <AnimatePresence mode='wait'>
          {displayedChallenges.length > 0 && (
            // 전체 리스트가 제거되면, motion.ol의 exit 애니메이션이 실행.
            <motion.ol
              // 여러개의 컴포넌트가 있으면 key를 추가해야함.
              // key를 넣어서 아래의 p태그와 별개라는걸 알려줘야 exit효과가 정상동작.
              key='list'
              exit={{ y: -30, opacity: 0 }}
              className='challenge-items'
            >
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}

          {displayedChallenges.length === 0 && (
            <motion.p
              key='fallback'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
