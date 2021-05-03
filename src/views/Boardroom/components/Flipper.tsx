import React from 'react';
import styled from 'styled-components'
//@ts-ignore
import Tick from '@pqina/flip';
import '@pqina/flip/dist/flip.min.css';

const StyledTick = styled.div`
  font-size: 38px;
`

const StyledFlipper = styled.span`
.tick-flip-panel {
  color: ${({theme}) => theme.color.primary.main};
  background-color: white;
}
`

export default class Flip extends React.Component {
  _tickRef: React.RefObject<unknown>;
  _tickInstance: any;
  constructor(props: { children?: React.ReactNode; value: number }) {
    super(props);
    this._tickRef = React.createRef();
  }

  componentDidMount() {
    this._tickInstance = Tick.DOM.create(this._tickRef.current, {
      // @ts-ignore
      value: this.props.value,
    });
  }

  componentDidUpdate() {
    if (!this._tickInstance) return;
    // @ts-ignore
    this._tickInstance.value = this.props.value;
  }

  componentWillUnmount() {
    if (!this._tickInstance) return;
    Tick.DOM.destroy(this._tickRef.current);
  }

  render() {
    return (
      //@ts-ignore
      <StyledTick ref={this._tickRef} className="tick">
        <div data-repeat="true" aria-hidden="true">
          <StyledFlipper data-view="flip">Tick</StyledFlipper>
        </div>
      </StyledTick>
    );
  }
}
