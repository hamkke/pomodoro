import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  motion,
  useAnimate,
  useTransform,
  useMotionValue,
  animate,
} from 'framer-motion';
import { getIndex, useFlubber } from './useFlubber';
import styled from 'styled-components';
import { play, pause } from './path';
import {
  minutesATOM,
  secondsATOM,
  isAnimatingATOM,
  roundATOM,
  goalATOM,
} from './atom';

const Ship = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px;
  border: 3px solid #000;
  background-color: #fff;
`;
const Title = styled.h1`
  font-size: 30px;
`;
const Box = styled(motion.div)`
  display: flex;
  margin: 40px 0 60px;
  p {
    font-size: 200px;
  }
`;

const Card = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 210px;
  background-color: #000000;
  color: #fff;
  font-size: 162px;
`;

const ScoreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  width: 100%;
`;
const PlayBtn = styled.button`
  padding: 0;
  width: 80px;
  height: 80px;
  border: 3px solid #000;
  background-color: transparent;
  cursor: pointer;
`;

const paths = [play, pause, play];
const colors = ['#000', '#000', '#000'];
// ------------------------------------------------------------------------------------------------------------------
const App = () => {
  const [minutes, setMinutes] = useRecoilState(minutesATOM);
  const [seconds, setSeconds] = useRecoilState(secondsATOM);
  const [isAnimating, setIsAnimating] = useRecoilState(isAnimatingATOM);
  const [round, setround] = useRecoilState(roundATOM);
  const [goal, setGoal] = useRecoilState(goalATOM);
  const [finished, setFinished] = useState(false);
  // ------------------------------------------------------------------------------------------------------------------
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  const path = useFlubber(progress, paths);
  const [minutesRef, minutesAnimate] = useAnimate();
  const [secondsRef, secondsAnimate] = useAnimate();

  useEffect(() => {
    // 제일 처음 버튼을 눌렀을 때 두번 눌러야 애니메이션이 되는 문제를 해결하기 위해 사용
    setPathIndex(1);
  }, []);

  useEffect(() => {
    let interval = 0;

    if (isAnimating) {
      interval = setInterval(() => {
        setSeconds((prev) => (prev === 0 ? 59 : prev - 1));

        secondsAnimate(
          secondsRef.current,
          { scale: [0.6, 1], opacity: [0.7, 1] },
          { duration: 0.9 }
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [
    isAnimating,
    setSeconds,
    secondsAnimate,
    secondsRef,
    setMinutes,
    minutesAnimate,
    minutesRef,
  ]);

  useEffect(() => {
    let timeout: number | undefined;

    if (seconds === 0 && isAnimating) {
      timeout = setTimeout(() => {
        setMinutes((prev) => {
          return Math.max(prev - 1, 0);
        });
        minutesAnimate(
          minutesRef.current,
          { scale: [0.6, 1], opacity: [0, 1] },
          { duration: 1 }
        );
      }, 760);
    } else {
      clearTimeout(timeout);
    }

    if (!seconds && !minutes) {
      setFinished(true);
      setIsAnimating(false);
      progress.set(0);
      setPathIndex(1);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [
    seconds,
    isAnimating,
    setMinutes,
    minutesAnimate,
    minutesRef,
    progress,
    setIsAnimating,
    setFinished,
    setPathIndex,
    minutes,
  ]);

  const onClick = () => {
    setIsAnimating((prev) => !prev);
    if (minutes === 25 && seconds === 0) {
      setMinutes(24);
      setSeconds(59);
    }

    animate(progress, pathIndex, {
      duration: 0.1,
      onComplete: () => {
        if (pathIndex >= paths.length - 1) {
          progress.set(0);
          setPathIndex(1);
        } else {
          setPathIndex(pathIndex + 1);
        }
      },
    });
  };

  return (
    <Ship>
      <Container>
        <Title>POMODORO</Title>
        <Box>
          <Card ref={minutesRef}>{minutes}</Card>
          <p>:</p>
          <Card ref={secondsRef}>{seconds}</Card>
        </Box>

        <ScoreContainer>
          <PlayBtn onClick={onClick}>
            <svg viewBox='0 0 20 20'>
              <motion.path fill={fill} d={path} />
            </svg>
          </PlayBtn>
          <ul>
            <li>0/4</li>
            <li>ROUND</li>
          </ul>
          <ul>
            <li>0/12</li>
            <li>GOAL</li>
          </ul>
        </ScoreContainer>
      </Container>
    </Ship>
  );
};

export default App;
