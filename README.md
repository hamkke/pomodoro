# 뽀모도로 타이머 20240710

## 과제 완성을 하지 못했습니다.

### 구현한 조건들

- 앱에는 25분부터 카운트다운되는 타이머가 있어야 합니다.
- 타이머는 현재 시간을 MM:SS 형식(즉, 25:00, 24:59, 24:58 등)으로 표시해야 한다.
- 타이머에는 재생 및 일시 중지 버튼이 있어야 합니다.
- 모션을 사용하여 재생 및 일시 중지 버튼을 애니메이션화합니다.
- 모션을 사용하여 숫자를 애니메이션화합니다.
- 반동을 사용하여 타이머 상태를 관리합니다.

### 구현하지 못한 조건들

- 앱은 사용자가 몇 번을 완료했는지 추적해야 합니다.
- 4라운드는 한 골과 같아야 한다.
- 타이머가 00:00에 도달하면 시간을 재설정하고, 완료된 회진 수를 1개씩 늘린다.
- 사용자가 4라운드를 완료하면 골 카운터 수를 늘리고 라운드 카운터를 재설정합니다.

## Requirements:

- The app should have a timer that counts down from 25 minutes.
- The timer should display the current time in MM:SS format (i.e. 25:00, 24:59, 24:58, etc).
- The timer should have a play and pause button.
- Use Motion to animate the play and pause button.
- Use Motion to animate the numbers.
- Use Recoil to manage the timer state.
- The app should keep track of how many times the user has completed a round.
- Four rounds should equal one goal.
- When the timer reaches 00:00, reset the time, and increase the number of rounds completed by 1.
- When the user completes 4 rounds, increase the number of goals counter and reset the rounds counter.

## Notes:

- Recoil, Styled Components and Motion are already installed in the template.
- Icons: https://heroicons.dev/?iconset=v2-20-solid
