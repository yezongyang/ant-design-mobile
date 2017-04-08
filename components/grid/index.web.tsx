/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import classNames from 'classnames';
import Flex from '../flex';
import Carousel from '../carousel/index.web';
import { DataItem, GridProps } from './PropsType';

export default class Grid extends React.Component<GridProps, any> {
  static defaultProps = {
    data: [],
    hasLine: true,
    isCarousel: false,
    columnNum: 4,
    carouselMaxRow: 2,
    prefixCls: 'am-grid',
  };

  render() {
    const {
      prefixCls, className,
      data, hasLine, isCarousel, onClick = () => {},
    } = this.props;

    const columnNum = this.props.columnNum as number;
    const carouselMaxRow = this.props.carouselMaxRow as number;

    const dataLength = data && data.length || 0;
    const rowCount = Math.ceil(dataLength / columnNum);
    const rowWidth = `${100 / columnNum}%`;
    const colStyle = {
      width: rowWidth,
    };
    const renderItem = this.props.renderItem || ((dataItem: DataItem) => (
      [
        <div
          className={`${prefixCls}-item-content`}
        >
          <div className={`${prefixCls}-item-inner-content column-num-${columnNum}`}>
            {
              React.isValidElement(dataItem.icon) ? dataItem.icon : (
                <img className={`${prefixCls}-icon`} src={dataItem.icon} />
              )
            }
            <div className={`${prefixCls}-text`}>{dataItem.text}</div>
          </div>
        </div>,
        <div className={`${prefixCls}-item-inner`}/>,
      ]
    ));

    const rowsArr: any[] = [];

    for (let i = 0; i < rowCount; i++) {
      const rowArr: any[] = [];
      for (let j = 0; j < columnNum; j++) {
        const dataIndex = i * columnNum + j;
        if (dataIndex < dataLength) {
          const el = data && data[dataIndex];
          rowArr.push(<Flex.Item
            key={`griditem-${dataIndex}`}
            className={`${prefixCls}-item`}
            onClick={() => onClick(el, dataIndex)}
            style={colStyle}
          >
            {renderItem(el, dataIndex)}
          </Flex.Item>);
        } else {
          rowArr.push(<Flex.Item
            key={`griditem-${dataIndex}`}
            style={colStyle}
          />);
        }
      }
      rowsArr.push(<Flex justify="center" align="stretch" key={`gridline-${i}`}>{rowArr}</Flex>);
    }

    const pageCount = Math.ceil(rowCount / carouselMaxRow);
    const pagesArr: any[] = [];
    if (isCarousel && pageCount > 1) {
      for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        const pageRows: any[] = [];
        for (let ii = 0; ii < carouselMaxRow; ii++) {
          const rowIndex = pageIndex * carouselMaxRow + ii;
          if (rowIndex < rowCount) {
            pageRows.push(rowsArr[rowIndex]);
          } else {
            // 空节点为了确保末尾页的最后未到底的行有底线(样式中last-child会没线)
            pageRows.push(<div key={`gridline-${rowIndex}`} />);
          }
        }
        pagesArr.push(<div key={`pageitem-${pageIndex}`} className={`${prefixCls}-carousel-page`}>{pageRows}</div>);
      }
    }

    return (
      <div
        className={classNames({
          [prefixCls as string]: true,
          [`${prefixCls}-line`]: hasLine,
          [className as string]: className,
        })}
      >
        {isCarousel && pageCount > 1 ? <Carousel>{pagesArr}</Carousel> : rowsArr}
      </div>
    );
  }
}
