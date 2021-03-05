import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  Router,
  Redirect
} from 'react-router-dom';
import {RouterConfig} from './RouteConfig';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const DEFAULT_SCENE_CONFIG = {
  enter: 'from-right',
  exit: 'to-exit'
};

const getSceneConfig = location => {
  const matchedRoute = RouterConfig.find(config => {
    // return new RegExp(`^${config.path}$`).test(location.pathname)
    return location.pathname.includes(config.regPath)
  });
  return (matchedRoute?.sceneConfig) || DEFAULT_SCENE_CONFIG;
};

let oldLocation = null;
export const Routes = withRouter(({location, history}) => {

  // 转场动画应该都是采用当前页面的sceneConfig，所以：
  // push操作时，用新location匹配的路由sceneConfig
  // pop操作时，用旧location匹配的路由sceneConfig
  let classNames = '';
  if (history.action === 'PUSH') {
    classNames = 'forward-' + getSceneConfig(location).enter;
  } else if (history.action === 'POP' && oldLocation) {
    classNames = 'back-' + getSceneConfig(oldLocation).exit;
  }

  // 更新旧location
  oldLocation = location;

  return (
    <TransitionGroup
      className={'router-wrapper'}
      childFactory={child => React.cloneElement(child, {classNames})}>
      <CSSTransition timeout={500} key={location.pathname}>
        <Switch location={location}>
          {RouterConfig.map((config, index) => (
            <Route exact key={index} {...config}/>
          ))}
          <Redirect to={'/'}/>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
});

export {
  Router
}
