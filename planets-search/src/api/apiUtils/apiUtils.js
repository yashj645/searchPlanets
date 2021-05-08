export const serializeQueryParams = paramObj => {
  if (paramObj) {
    return `?${Object.keys(paramObj)
      .map(k => {
        if (typeof paramObj[k] === 'object') {
          return (
            paramObj[k] &&
            paramObj[k]
              .map(v => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
              .join('&')
          )
        }
        let text = paramObj[k].split('$$')
        if (text.length > 1) {
          let multiString = ''
         text.forEach(item => {
          multiString += `${encodeURIComponent(k)}=${encodeURIComponent(item)}&`
         }) 
         return multiString
        }
        return `${encodeURIComponent(k)}=${encodeURIComponent(paramObj[k])}`
      })
      .join('&')}`
  }
  return ''
}
