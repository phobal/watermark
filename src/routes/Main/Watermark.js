import { jsPDF } from "jspdf";
// import CompanySeal from './Seal'

function Watermark(canvas, opt = {}) {
  let img;
  let step = 0;
  const ctx = canvas.getContext("2d");
  let img_width, img_height;
  let userOptions = opt;
  const _draw = () => {
    drawImage();
    addMarks();
    // addWatermark();
  };
  const drawImage = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (step) {
      default:
      case 0:
        canvas.width = img_width;
        canvas.height = img_height;
        ctx.drawImage(img, 0, 0, img_width, img_height);
        break;
      case 1:
        canvas.width = img_height;
        canvas.height = img_width;
        ctx.save();
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, 0, -img_height, img_width, img_height);
        ctx.restore();
        break;
      case 2:
        canvas.width = img_width;
        canvas.height = img_height;
        ctx.save();
        ctx.rotate(180 * Math.PI / 180);
        ctx.drawImage(img, -img_width, -img_height, img_width, img_height);
        ctx.restore();
        break;
      case 3:
        canvas.width = img_height;
        canvas.height = img_width;
        ctx.save();
        ctx.rotate(270 * Math.PI / 180);
        ctx.drawImage(img, -img_width, 0, img_width, img_height);
        ctx.restore();
        break;
    }
  };
  const addMarks = () => {
    addTitle();
    addAgentName();
    addYear();
    addMonth();
    addDay();
    // addSeal();
  }
  const space = 58
  const textColor = 'rgba(0, 0, 0, 0.6)'
  const textFont = '400 32px 宋体'

  const addTitle = () => {
    const value = userOptions.title
    ctx.font = textFont
    ctx.fillStyle = textColor
    fillTextWrap(`${value}`, 580, img_height - 2200 + space)
  }

  const addAgentName = () => {
    const value = userOptions.agent
    ctx.font = textFont
    ctx.fillStyle = textColor
    fillTextWrap(`${value}`, 1050, img_height - 1370 + space)
  }

  const addYear = () => {
    const value = userOptions.year
    ctx.font = textFont
    ctx.fillStyle = textColor
    fillTextWrap(`${value}`, img_width - 470, img_height - 300 + space)
  }
  const addMonth = () => {
    const value = userOptions.month
    const diffWidth = String(value).length > 1 ? 330 : 320
    ctx.font = textFont
    ctx.fillStyle = textColor
    fillTextWrap(`${value}`, img_width - diffWidth, img_height - 300 + space)
  }
  const addDay = () => {
    const value = userOptions.day
    const diffWidth = String(value).length > 1 ? 235 : 225
    ctx.font = textFont
    ctx.fillStyle = textColor
    fillTextWrap(`${value}`, img_width - diffWidth, img_height - 300 + space)
  }

  // const addSeal = () => {
  //   new CompanySeal({ctx})
  // }

  const fillTextWrap = (text, x, y) => {
    const maxWidth = 700
    const lineHeight = space
    // 字符串分割为数组
    const arrText = text.split('')
    // 当前字符串及宽度
    let currentText = ''
    let currentWidth
    for (let letter of arrText) {
        currentText += letter
        currentWidth = ctx.measureText(currentText).width
        if (currentWidth > maxWidth) {
            ctx.fillText(currentText, x, y)
            currentText = ''
            x += 120
            y += lineHeight
        }
    }
    if (currentText) {
        ctx.fillText(currentText, x, y)
    }
  }

  this.draw = dataURL => {
    step = 0;
    img = new Image();
    img.onload = () => {
      img_width = img.width;
      const max = 2000;
      if (img_width > max) {
        img_width = max;
        img_height = max * img.height / img.width;
      } else {
        img_height = img.height;
      }
      _draw();
      console.log(img_width, img_height)
    };
    img.src = dataURL;
  };
  this.rotate = () => {
    if (!img) {
      return;
    }
    step >= 3 ? (step = 0) : step++;
    _draw();
  };
  this.save = () => {
    if (!img) {
      return;
    }
    const pdf = new jsPDF();
    const rate = 12
    pdf.addImage(canvas.toDataURL('png'), 'PNG', 15, 0, img_width / rate, img_height / rate);
    pdf.save(`${userOptions.title}委托书.pdf`);
  };
  this.setOptions = (obj = {}) => {
    userOptions = obj;
    // createWatermarkCanvas();
    if (!img) {
      return;
    }
    _draw();
  };
}

export default Watermark;
