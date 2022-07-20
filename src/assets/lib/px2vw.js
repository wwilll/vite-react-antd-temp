/**
 * 针对styled-components to vw转换，排除fontsize属性
 */
import styled from 'styled-components';

const ignoreAttrs = ['font-size'];

const pxRe = /-?\d*[.\d]*px/g;
const ignoreTest = /\/\*\*.*px2vw_ignore.*\*\//;
const base64Re = /^data:\w+\/[a-zA-Z+\-.]+;base64,/i;

const px2vw = (px) => (Number(px) ? `${Math.round((Number(px) / 7.5) * 100000) / 100000}vw` : 0);

const convertStringPx2vw = (style) => {
  if (!style) return style;
  // console.log('style=======', style);
  // console.log('styleend=======');
  if (
    !base64Re.test(style) && // 非base64字符串
    pxRe.test(style) // 包含px单位
  ) {
    let list = style.split('\n');
    list = list.map((i) => {
      if (ignoreTest.test(i)) return i;
      if (ignoreAttrs.some((ii) => i.includes(ii))) return i;
      return i.replace(pxRe, (value) => px2vw(value.replace('px', '')));
    });
    return list.join('\n');
  }

  return style;
};

const isKeyframes = (interpolation) =>
  Object.prototype.toString.call(interpolation) === '[object Object]' && interpolation.constructor.name === 'Keyframes';

const convertKeyframesPx2vw = (keyframes) => {
  keyframes.stringifyArgs = keyframes.stringifyArgs.map(convertStringPx2vw);

  return keyframes;
};

const convertInterpolationPx2vw = (interpolation) => {
  if (typeof interpolation === 'string') {
    return convertStringPx2vw(interpolation);
  }

  if (isKeyframes(interpolation)) {
    return convertKeyframesPx2vw(interpolation);
  }

  if (Array.isArray(interpolation)) {
    return interpolation.map(convertInterpolationPx2vw);
  }

  if (typeof interpolation === 'function') {
    return (props) => convertInterpolationPx2vw(interpolation(props));
  }

  return interpolation;
};

const withCss = (styled) => {
  const interleave = (strings, ...interpolations) => {
    // console.log('strings', strings, interpolations);
    strings = strings.map(convertStringPx2vw);

    interpolations = interpolations.map(convertInterpolationPx2vw);

    return styled(strings, ...interpolations);
  };

  Object.keys(styled).forEach((prop) => (interleave[prop] = withTemplateFunc(styled[prop])));

  return interleave;
};

const withTemplateFunc =
  (styled) =>
  (...props) =>
    withCss(styled(...props));

const styledPx2vw = ((styled) => {
  const obj = withTemplateFunc(styled);

  Object.keys(styled).forEach((key) => {
    obj[key] = withCss(styled[key]);

    Object.keys(styled[key]).forEach((prop) => (obj[key][prop] = withTemplateFunc(styled[key][prop])));
  });

  return obj;
})(styled);

export default styledPx2vw;
export { px2vw };
export * from 'styled-components';
