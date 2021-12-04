const operators = {
  atan: 'arctan',
  acos: 'arccos',
  asin: 'arcsin',
  atanh: 'arctanh',
  acosh: 'arccosh',
  asinh: 'arcsinh',
  log: 'ln',
  log10: 'log',
}

const nordOperators = {
  log: 'log10',
  arctan: 'atan',
  arccos: 'acos',
  arcsin: 'asin',
  arctanh: 'atanh',
  arccosh: 'acosh',
  arcsinh: 'asinh',
  ln: 'log',
}

const regex = /mathrm{(.*?)}/g
const keys = Object.keys(operators)
const values = Object.keys(nordOperators)

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

export const latexNormalize = (latexStr) => {
  let res = latexStr.replaceAll(regex, '$1')
  for (let key of keys) {
    res = res.replaceAll(key, operators[key])
  }
  res.replaceAll('\\ ', '')
  return res
}

export const nerdamerNormalize = (latexStr) => {
  let res = latexStr.replaceAll('\\ ', '')
  for (let key of values) {
    res = res.replaceAll(key, nordOperators[key])
  }
  res.replaceAll('\\ ', '')
  return res
}

export const trimLatexSpace = (latexStr) => {
  let res = latexStr
  res.replaceAll('\\ ', '')
  return res
}

export default trimLatexSpace
