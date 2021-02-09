import { useEffect } from "react";
import styled from "styled-components";
import anime from "animejs";

const Wrapper = styled.div`
  display: inline-flex;
  position: absolute;
  top: 50%;
  left: 50%;
  > *:not(:last-child) {
    margin-right: 12px;
  }
  .box {
    height: 15px;
    width: 15px;
    border-radius: 50px;
  }
  .box-1 {
    background: red;
  }
  .box-2 {
    background: white;
  }
  .box-3 {
    background: blue;
  }
`;

export const Loading = () => {
  useEffect(() => {
    anime({
      targets: "div.box",
      borderRadius: 0,
      scale: 1.5,
      delay: anime.stagger(150),
      loop: true,
      direction: "alternate",
      elasticity: 1000,
      easing: "easeOutInBounce",
    });
  }, []);

  return (
    <Wrapper>
      <div className="box box-1"></div>
      <div className="box box-2"></div>
      <div className="box box-3"></div>
    </Wrapper>
  );
};
