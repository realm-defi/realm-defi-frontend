import React, { useEffect, useRef } from 'react';
import { useCountUp } from 'react-countup';
import styled from 'styled-components';

interface ValueCounter {
  value: number;
  decimals: number;
  color?: string;
  suffix?: string;
}

interface WrapperProps {
  color?: string
}

const Wrapper = styled.div<WrapperProps>`
font-size: 24px;
color: ${props => props.color};
font-weight: bold;
`

const ValueCounter: React.FC<ValueCounter> = ({ value, decimals = 2, color, suffix = '' }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals,
  });

  const updateValue = useRef(update);

  useEffect(() => {
    updateValue.current(value);
  }, [value, updateValue]);

  return <Wrapper color={color}>{countUp}{suffix}</Wrapper>;
};

export default ValueCounter;
