---
order: 0
title:
  zh-CN: 垂直步骤条
  en-US: Vertical Steps
---


````jsx
/* eslint global-require: 0 */
import { Steps, WingBlank, WhiteSpace, Icon } from 'antd-mobile';

const Step = Steps.Step;

const Demo = () => (
  <WingBlank size="lg">
    <div className="sub-title">正常尺寸, 双行文本</div>
    <WhiteSpace size="lg" />
    <Steps current={1}>
      <Step title="支付成功" description="辅助说明文本" icon={<Icon type={require('./alipay.svg')} />} />
      <Step title="标签文本" description="辅助说明文本" icon={<Icon type={require('./pay-circle-blue.svg')} />} />
      <Step title="标签文本" description="辅助说明文本" icon={<Icon type={require('./pay-circle-red.svg')} />} />
    </Steps>
    <div className="sub-title">正常尺寸, 单行文本</div>
    <WhiteSpace size="lg" />
    <Steps>
      <Step status="process" title="已完成" />
      <Step status="error" title="出错" />
      <Step title="待运行" />
    </Steps>
    <WhiteSpace size="lg" />
    <div className="sub-title">小尺寸, 双行文本</div>
    <WhiteSpace />
    <Steps size="small" current={1}>
      <Step title="已完成" description="这里是信息的描述" />
      <Step title="进行中" description="这里是信息的描述" />
      <Step title="待运行" description="这里是信息的描述" />
    </Steps>
    <div className="sub-title">小尺寸, 单行文字</div>
    <WhiteSpace />
    <Steps size="small" current={1}>
      <Step title="已完成" />
      <Step title="进行中" />
      <Step title="待运行" />
    </Steps>
    <div className="sub-title">自定义 status </div>
    <WhiteSpace size="lg" />
    <Steps>
      <Step status="finish" title="步骤1" icon={<Icon type={require('./pay-circle-gray.svg')} />} />
      <Step status="process" title="步骤2" icon={<Icon type={require('./pay-circle-gray.svg')} />} />
      <Step status="error" title="步骤3" icon={<Icon type={require('./pay-circle-gray.svg')} />} />
    </Steps>

    <div className="sub-title">自定义 icon </div>
    <WhiteSpace size="lg" />
    <Steps current={1}>
      <Step title="步骤1" icon={<Icon type={require('./pay-circle-gray.svg')} />} description="这里是信息的描述" />
      <Step title="步骤2" icon={<Icon type={require('./pay-circle-gray.svg')} />} description="这里是信息的描述" />
      <Step title="步骤3" icon={<Icon type={require('./pay-circle-gray.svg')} />} description="这里是信息的描述" />
    </Steps>

    <div className="sub-title">多 steps </div>
    <WhiteSpace size="lg" />
    <Steps current={1}>
      <Step title="步骤1" icon={<Icon type={require('./pay-circle-gray.svg')} />} />
      <Step title="步骤2" icon={<Icon type={require('./pay-circle-gray.svg')} />} />
      <Step title="步骤3" status="error" icon={<Icon type={require('./pay-circle-gray.svg')} />} />
      <Step title="步骤4" icon={<Icon type={require('./pay-circle-gray.svg')} />} />
    </Steps>
  </WingBlank>
);
ReactDOM.render(<Demo />, mountNode);
````
