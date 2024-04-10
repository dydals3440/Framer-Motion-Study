import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

import cityImg from '../assets/city.jpg';
import heroImg from '../assets/hero.png';

export default function WelcomePage() {
  // scrollYProgress 0~1사이 1은 완전히 내려간거
  const { scrollY } = useScroll();

  // scrollY는 number of pixel, breakPoints
  // 초기값: 0 어느 시점 수직축 따라 200px 스크롤내림.
  // 이 픽셀값 불투명도 1로 바꿔야함 (그래야 스크롤 내리지 않은 상태에선 도시이미지 잘 보임)
  // 마지막에는 불투명도가 0.5가 되면 50%정도 투명해짐. (스크롤 200px내리면) 그 중간값은 알아서 프레이머 모션이 해줌. 배열안에 값을 여러개 넣어줄 수 있음.
  const opacityCity = useTransform(scrollY, [0, 200], [1, 0.5]);
  // 위의 값은 뒷단에서 프레이머모션이 관리, 값이 변할떄 이 컴포넌트 함수는 재실행되지 않음. 따라서 animate에는 이 특수한 값을 못넣어서쓰고 style은 가능.
  const yCity = useTransform(scrollY, [0, 200], [0, -100]);

  const yHero = useTransform(scrollY, [0, 200], [0, -150]);
  const opacityHero = useTransform(scrollY, [0, 300, 500], [1, 1, 0]);
  const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
  const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);

  return (
    <>
      <header id='welcome-header'>
        <motion.div
          id='welcome-header-content'
          style={{ scale: scaleText, y: yText }}
        >
          <h1>Ready for a challenge?</h1>
          <Link id='cta-link' to='/challenges'>
            Get Started
          </Link>
        </motion.div>
        <motion.img
          // style(motion) 프레이머 모션이 지켜보는 속성, style 속성에 적용된 값이 변경될 떄 프레이머 모션이 자동으로 애니메이션 실행.
          style={{ opacity: opacityCity, y: yCity }}
          src={cityImg}
          alt='A city skyline touched by sunlight'
          id='city-image'
        />
        <motion.img
          style={{ y: yHero, opacity: opacityHero }}
          src={heroImg}
          alt='A superhero wearing a cape'
          id='hero-image'
        />
      </header>
      <main id='welcome-content'>
        <section>
          <h2>There&apos;s never been a better time.</h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

        <section>
          <h2>Why Challenge Yourself?</h2>
          <p>
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            “I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!” - Alex
            P.
          </p>
          {/* You can add more testimonials or even a carousel for multiple testimonials */}
        </section>
      </main>
    </>
  );
}
