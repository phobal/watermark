import React from "react";
import Upload, { filesToDataURL } from "dxc-upload";
import Watermark from "./Watermark";
import Block from "dxc-flex";
import Button from "./Button";
import { Input } from "dxc-input";
import example from "./template.png";
import styles from "./Main.css";

export default class Main extends React.Component {
  state = {
    isExist: true,
    title: "一种加氢站氢气质量在线检测控制系统",
    agent: "黎飞",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  componentDidMount() {
    this.watermark = new Watermark(this.mainCanvas);
    this.setOptions();
    this.watermark.draw(example);
  }
  onChangeFile = (files) => {
    filesToDataURL(files).then((dataUrls) => {
      this.watermark.draw(dataUrls[0]);
      this.setState({ isExist: true });
    });
  };
  save = () => {
    this.watermark.save();
  };
  setOptions = () => {
    const { title, agent, year, month, day } = this.state;
    this.watermark.setOptions({ title, agent, year, month, day });
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value }, () => {
      this.setOptions();
    });
  };
  renderControl = () => {
    const { isExist, title, agent, year, month, day } = this.state;
    const labelWidth = 62;
    return (
      <Block horizontal="center" style={{ position: "fixed", marginTop: 200 }}>
        <div style={{ width: 345 }}>
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={title}
            onChange={this.onChangeText.bind(this, "title")}
            label="专利名称:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={130}
            value={agent}
            onChange={this.onChangeText.bind(this, "agent")}
            label="代理人:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={4}
            value={year}
            onChange={this.onChangeText.bind(this, "year")}
            label="年:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={2}
            value={month}
            onChange={this.onChangeText.bind(this, "month")}
            label="月:"
          />
          <Input
            labelWidth={labelWidth}
            style={{ marginTop: 15 }}
            maxLength={2}
            value={day}
            onChange={this.onChangeText.bind(this, "day")}
            label="日:"
          />
          <Block>
            {/* <Upload onChange={this.onChangeFile}>
              <Button>选择文件</Button>
            </Upload> */}
            {isExist ? (
              <Button onClick={this.save} background="green">
                保存
              </Button>
            ) : null}
          </Block>
        </div>
      </Block>
    );
  };
  render() {
    return (
      <Block className={styles.main_box} style={{ marginTop: 30 }}>
        {this.renderControl()}
        <div className={styles.canvas_box} style={{ flex: 1, minWidth: 345 }}>
          <canvas
            style={{ width: "100%" }}
            ref={(mainCanvas) => (this.mainCanvas = mainCanvas)}
          />
        </div>
      </Block>
    );
  }
}
