import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

// 字符串字面量
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

interface TransitionProps extends CSSTransitionProps {
  animation?: AnimationName;
}

const Transition: React.FC<TransitionProps> = props => {
  const { children, classNames, animation, ...restProps } = props;

  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  // appear 表示如果menOpen第一次值为true的话，也会执行动画过程
  // unmoutOnExit 表示当状态达到exit-done时，被包裹的节点会被unmount，即子节点不存在。反之依然，一开始如果menuOpen是false状态，子节点是不存在的。
  unmountOnExit: true,
  appear: true
};

export default Transition;
