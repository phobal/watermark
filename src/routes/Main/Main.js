import React from "react";
import Upload, { filesToDataURL } from "dxc-upload";
import Watermark from "./Watermark";
import Block from "dxc-flex";
import Button from "./Button";
import { Input } from "dxc-input";
import example from "./demo.jpeg";
import styles from "./Main.css";

export default class Main extends React.Component {
  state = {
    isExist: true,
    jingDu: '106.74923000',
    weiDu: '31.74923000',
    jinDu: '3.0',
    mingCheng: '巴州区江北办事处岳家坡村4组八字诃坡道GNSS基站',
    diDian: '巴中市巴州区大茅坪镇',
    shiJian: '2021-04-02 13:23:13'
  };
  componentDidMount() {
    this.watermark = new Watermark(this.mainCanvas);
    this.setOptions();
    this.watermark.draw(example);
  }
  onChangeFile = files => {
    filesToDataURL(files).then(dataUrls => {
      this.watermark.draw(dataUrls[0]);
      this.setState({ isExist: true });
    });
  };
  save = () => {
    this.watermark.save();
  };
  setOptions = () => {
    const { jingDu, weiDu, jinDu, mingCheng, diDian,  shiJian } = this.state;
    this.watermark.setOptions({ jingDu, weiDu, jinDu, mingCheng, diDian,  shiJian });
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value }, () => {
      this.setOptions();
    });
  };
  renderControl = () => {
    const { isExist, jingDu, weiDu, jinDu, mingCheng, diDian,  shiJian } = this.state;
    const labelWidth = 62;
    return (
      <Block horizontal="center" style={{ position: 'fixed', marginTop: 200 }}>
        <div style={{ width: 345 }}>
          <Block>
            <Upload onChange={this.onChangeFile}>
              <Button>选择文件</Button>
            </Upload>
            {isExist ? <Button onClick={this.save} background="green">保存</Button> : null}
          </Block>
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={jingDu}
            onChange={this.onChangeText.bind(this, "jingDu")}
            label="经度:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={weiDu}
            onChange={this.onChangeText.bind(this, "weiDu")}
            label="纬度:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={jinDu}
            onChange={this.onChangeText.bind(this, "jinDu")}
            label="精度:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={mingCheng}
            onChange={this.onChangeText.bind(this, "mingCheng")}
            label="名称:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={diDian}
            onChange={this.onChangeText.bind(this, "diDian")}
            label="地点:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={shiJian}
            onChange={this.onChangeText.bind(this, "shiJian")}
            label="时间:"
          />
        </div>
      </Block>
    );
  };
  render() {
    return (
      <Block className={styles.main_box} style={{ marginTop: 30 }}>
        {this.renderControl()}
        <div className={styles.canvas_box} style={{ flex: 1, minWidth: 345 }}>
          <canvas style={{ width: "100%" }} ref={mainCanvas => (this.mainCanvas = mainCanvas)} />
        </div>
      </Block>
    );
  }
}
