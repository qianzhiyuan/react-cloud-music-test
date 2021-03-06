import React from 'react';
import {
  Route,
  Router,
  Redirect
} from 'react-router-dom';
import {RouterConfig} from './RouteConfig';
import AnimatedRouter from 'react-animated-router';

let oldLocation = null;
export const Routes = ({location}) => {
  let cls = 'animated-router'

  if (location.pathname === '/playlist' || oldLocation?.pathname === '/playlist') {
    cls = 'animated-router-form-bottom'
  }

  // 更新旧location
  oldLocation = location;

  return (
    <AnimatedRouter location={location} prefix={cls}>
      {RouterConfig.map((config, index) => (
        <Route exact key={index} {...config}/>
      ))}
      <Redirect to={'/'}/>
    </AnimatedRouter>
  );
};

export {
  Router
}
