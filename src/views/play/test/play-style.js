import styled from "styled-components";

const PlayDiv = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;

  .play-run {
    animation: spin 5s infinite linear;
    animation-play-state: ${props => props.runState ? 'running' : 'paused'};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      box-shadow: 0 0 15px #fff;
    }
    25% {
      transform: rotate(90deg);
      box-shadow: 0 0 30px #fff;
    }
    50% {
      transform: rotate(180deg);
      box-shadow: 0 0 45px #fff;
    }
    75% {
      transform: rotate(270deg);
      box-shadow: 0 0 30px #fff;
    }
    100% {
      transform: rotate(360deg);
      box-shadow: 0 0 15px #fff;
    }
  }
`;

export {
  PlayDiv
}