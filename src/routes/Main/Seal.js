export default class CompanySeal {
  constructor(props) {
    /* 用户可配置项 */
    this.ctx = props.ctx;
    // 印章半径
    this.radius = props.radius || 180;
    // 印章颜色
    this.color = props.color || "rgba(240, 191, 185,1)";
    // 字体
    this.fontFamily = props.fontFamily || "serif";
    // 公司名称
    this.companyName = props.companyName || "新空厚普氢能源装备有限公司"; // 中国电力工程顾问集团西南电力设计研究院有限公司
    // 印章类型名称
    this.typeName = props.typeName;
    // 是否有内边框线
    this.hasInnerLine = props.hasInnerLine || false;
    // 防伪码
    this.securityCode = props.securityCode || '5101245122175';

    /* 默认根据半径进行设置 */

    // 边框线的宽度
    this.lineWidth = (4 / 75) * this.radius;
    // 文字与外边框线的距离
    this.lineTextGap = 0.73;
    // 公司名称字体大小
    this.companyNameFontSize = (20 / 75) * this.radius;
    // 印章类型名称字体大小
    this.typeNameFontSize = (11 / 75) * this.radius;
    // 防伪码字体大小
    this.securityCodeFontSize = 0.12 * this.radius;
    // 内边框线的宽度
    this.innerLineWidth = (1 / 75) * this.radius;
    // 字与字之间相差的弧度
    this.step = 0.34;
    // 根据公司名称有多少个字，控制第一个字的起始位置
    this.aStartPos = [
      0, -0.15, -0.31, -0.5, -0.63, -0.83, -0.95, -1.12, -1.27, -1.44, -1.61,
      -1.77, -1.93, -2.1, -2.23, -2.4, -2.57, -2.73, -2.89,
    ];
    // 起始位置的index
    this.startIndex = this.companyName.length - 1;
    // 起始位置
    this.startPos = this.aStartPos[this.startIndex];
    this._init();
  }
  _init() {
    // this.canvas.width = this.canvas.height = this.radius * 2;
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawOuterLine();
    if (this.hasInnerLine) {
      this._drawInnerLine();
    }
    this._drawStar();
    if (this.companyName) {
      this._drawCompanyName();
    }
    if (this.typeName) {
      this._drawTypeName();
    }
    if (this.securityCode) {
      this._drawSecurityCode();
    }
  }

  _drawOuterLine() {
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(
      this.radius,
      this.radius,
      this.radius - this.lineWidth,
      0,
      Math.PI * 2,
      true
    );
    this.ctx.stroke();
    this.ctx.restore();
  }

  _drawInnerLine() {
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.innerLineWidth;
    this.ctx.beginPath();
    this.ctx.arc(
      this.radius,
      this.radius,
      this.radius - this.lineWidth - this.radius / 15,
      0,
      Math.PI * 2,
      true
    );
    this.ctx.stroke();
    this.ctx.restore();
  }

  _drawStar() {
    var R = this.radius,
      r = R / 3,
      c = ((360 / 5) * Math.PI) / 180,
      d = c / 2,
      e = d / 2,
      l = (r * Math.sin(e)) / Math.sin(d + e),
      lsd = l * Math.sin(d),
      lcd = l * Math.cos(d),
      lsc = l * Math.sin(c),
      lcc = l * Math.cos(c),
      rsc = r * Math.sin(c),
      rcc = r * Math.cos(c),
      rsd = r * Math.sin(d),
      rcd = r * Math.cos(d),
      p0 = [R, (2 / 3) * R],
      p1 = [R + lsd, R - lcd],
      p2 = [R + rsc, R - rcc],
      p3 = [R + lsc, R + lcc],
      p4 = [R + rsd, R + rcd],
      p5 = [R, R + l],
      p6 = [R - rsd, R + rcd],
      p7 = [R - lsc, R + lcc],
      p8 = [R - rsc, R - rcc],
      p9 = [R - lsd, R - lcd],
      aPs = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9];
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    aPs.forEach(function (item) {
      this.ctx.lineTo(item[0], item[1]);
    }, this);
    // for (var i = 0; i < aPs.length; i++) {
    //   var item = aPs[i];
    //   this.ctx.lineTo(item[0], item[1]);
    // }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  _drawCompanyName() {
    if (this.companyName.length > 30) {
      throw new RangeError("公司名称最多只能为30个字符！");
    }
    this._drawText(this.companyName, this.companyNameFontSize, false, false);
  }

  _drawText(text, fontSize, isTypeName, isSecurityCode) {
    var i, letter;
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.font = "normal normal normal " + fontSize + "px " + this.fontFamily;
    this.ctx.textBaseline = "middle";
    if (isTypeName) {
      this.ctx.textAlign = "center";
    } else {
      this.ctx.textAlign = "left";
    }
    this.ctx.translate(this.radius, this.radius);
    if (isTypeName) {
      this.ctx.fillText(text, 0, this.radius / 2);
    } else {
      for (i = 0; i < text.length; i++) {
        letter = text[i];
        if (isSecurityCode) {
          this._drawLetter(
            letter,
            0.57 - i * 0.1,
            -this.securityCodeFontSize / 2,
            this.radius * 0.8
          );
        } else {
          this._drawLetter(
            letter,
            this.startPos + i * this.step,
            -fontSize / 2,
            -this.radius * this.lineTextGap
          );
        }
      }
    }
    this.ctx.restore();
  }

  _drawLetter = function _drawLetter(letter, angle, x, y) {
    this.ctx.save();
    this.ctx.rotate(angle);
    this.ctx.fillText(letter, x, y);
    this.ctx.restore();
  };

  _drawTypeName = function _drawTypeName() {
    if (typeof this.typeName !== "string") {
      throw new TypeError("印章类型名称只能为字符串！");
    }
    this._drawText(this.typeName, this.typeNameFontSize, true, false);
  };

  _drawSecurityCode = function _drawSecurityCode() {
    if (typeof this.securityCode !== "string") {
      throw new TypeError("防伪码只能为字符串！");
    }
    if (this.securityCode.length !== 13) {
      throw new RangeError("防伪码只能为13位！");
    }
    this._drawText(this.securityCode, this.securityCodeFontSize, false, true);
  };
}
