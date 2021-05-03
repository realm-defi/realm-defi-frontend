//TODO: Fix these fucking typescript errors

import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
// @ts-ignore
import countdown from 'countdown';
import Flipper from './Flipper';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import moment from 'moment';

const Timer: React.FC = () => {
  const [timer, setTimer] = useState({
    hours: '',
    minutes: '',
    seconds: '',
  });

  const { prevAllocation, nextAllocation } = useTreasuryAllocationTimes();

  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );
  const nextEpoch = useMemo(() => moment(prevEpoch).add(1, 'days').toDate(), [prevEpoch]);

  useEffect(() => {
    const time = 1000 * 60 * 60 * 8; // 8 hours
    const timeLeft = new Date(nextEpoch).getTime() + time;
    const interval = setInterval(() => {
      setTimer(countdown(Date.now(), timeLeft));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [nextEpoch]);

  return (
    <FlipperWrapper>
      {/* @ts-ignore */}
      <Flipper value={timer.hours.toString().padStart(2, '0')} />
      {/* @ts-ignore */}
      <Flipper value={timer.minutes.toString().padStart(2, '0')} />
      {/* @ts-ignore */}
      <Flipper value={timer.seconds.toString().padStart(2, '0')} />
    </FlipperWrapper>
  );
};

const FlipperWrapper = styled.div`
  display: flex;
`;

export default Timer;
