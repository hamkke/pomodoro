import { atom } from 'recoil';

export const minutesATOM = atom({
  key: 'minutes',
  default: 25,
});

export const secondsATOM = atom({
  key: 'seconds',
  default: 0,
});

export const isAnimatingATOM = atom({
  key: 'isAnimating',
  default: false,
});

export const roundATOM = atom({
  key: 'round',
  default: {
    round: {
      total: 0,
      current: 0,
    },
  },
});

export const goalATOM = atom({
  key: 'goal',
  default: {
    goal: {
      total: 0,
      current: 0,
    },
  },
});
