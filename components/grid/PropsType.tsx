import React from 'react';

export interface DataItem {
  icon?: any;
  text?: any;
  [key: string]: any;
}

export type reactNode = React.ReactElement<any>;

export interface GridProps {
  data?: Array<DataItem | undefined>;
  hasLine?: boolean;
  columnNum?: number;
  isCarousel?: boolean;
  carouselMaxRow?: number;
  onClick?: (dataItem: DataItem | undefined, itemIndex: number) => void;
  /** web only */
  renderItem?: (dataItem: DataItem | undefined, itemIndex: number) => reactNode | Array<reactNode>;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** rn only **/
  styles?: any;
}
