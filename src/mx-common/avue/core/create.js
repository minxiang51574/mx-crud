/*
 * @Author: Mx
 * @Date: 2023-03-16 09:46:12
 * @Description: 
 */
import bem from '../utils/bem';
import { COMPONENTNAME } from './constant';
export default function(component) {
  component.name = COMPONENTNAME + component.name;
  component.mixins = component.mixins || [];
  component.mixins.push(bem);
  return component;
}
