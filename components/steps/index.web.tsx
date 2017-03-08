import React from 'react';
import RcSteps from 'rc-steps';
import classnames from 'classnames';
import Icon from '../icon/index.web';

export interface StepsProps {
  prefixCls?: string;
  iconPrefix?: string;
  direction?: string;
  labelPlacement?: string;
  children: any;
  status?: string;
  size?: string;
  current?: number;
}

export default class Steps extends React.Component<StepsProps, any> {
  static Step = (RcSteps as any).Step;

  static defaultProps = {
    prefixCls: 'am-steps',
    iconPrefix: 'ant',
    labelPlacement: 'vertical',
    direction: 'vertical',
    current: 0,
  };
  stepRefs: any;

  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    if (this.props.direction !== 'horizontal') {
      return;
    }
    // set tail's left position based on main's width for each step dynamically.
    this.stepRefs.forEach(s => {
      if (s.refs.tail) {
        s.refs.tail.style.left = `${s.refs.main.offsetWidth / 2}px`;
      }
    });
  }
  render() {
    this.stepRefs = [];
    const { children, current, status } = this.props;
    // css height: oneLine 40px, twoLine 80px, threeLine 120px
    let isTwoLine = false;
    let newChildren: Array<any> = React.Children.map(children, (item: any) => {
      if (item.props.description) {
        isTwoLine = true;
      }
      return item; // flattern the array at first https://github.com/ant-design/ant-design-mobile/issues/934
    });
    const stepCount = newChildren.length;
    newChildren = React.Children.map(newChildren, (item: any, index) => {
      let cls = classnames({
        [item.props.className]: item.props.className,
        'error-tail': index + 1 <  stepCount && newChildren[index + 1].props.status === 'error',
        'two-line': isTwoLine,
      });

      let icon = item.props.icon;
      if (!icon) {
        if (index < current) {
          // 对应 state: finish
          icon = require('./style/assets/step-check.svg');
          cls = classnames({
            [cls]: true,
            'check-item': true,
          });
        } else if (index > current) {
          // 对应 state: wait
          icon = require('./style/assets/step-ellipsis.svg');
          cls = classnames({
            [cls]: cls,
            'ellipsis-item': true,
          });
        }
        if (status === 'error' && index === current || item.props.status === 'error') {
          icon = 'cross-circle-o';
        }
      }
      icon = typeof icon === 'string' ? <Icon type={icon} /> : icon;
      return React.cloneElement(item, { icon, className: cls, ref: c => this.stepRefs[index] = c });
    });
    return <RcSteps ref="rcSteps" {...this.props}>{newChildren}</RcSteps>;
  }
}
