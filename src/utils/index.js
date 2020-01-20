import dayjs from "dayjs"

// 时间格式化工具
export const formatDate = (date, formater = 'YYYY/MM/DD HH:mm') => {
  if (!date) return '--'
  return dayjs(date).format(formater)
}

export const clone = (target) => {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// 条件查询 参数转换
// TODO: sort
export const filterConvert = (obj) => {
  let filters = {
    betweens: [],
    fieldFilters: [],
    fieldOrders: [],
    keywords: ""
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];

      console.log(element);
      switch (element.type) {
        case "kewords":
          filters.keywords = element.value
          break

        case "filter":
          let filter = {
            fieldName: key,
            filedValue: element.value
          }
          filters.fieldFilters.push(filter)
          break

        case "range":
          if (!element.value) break
          let range = {
            fieldName: key,
            minValue: element.value[0],
            maxValue: element.value[1],
          }
          if (range.minValue && range.maxValue) {
            filters.betweens.push(range)
          }
          break
      }
    }
  }
  return filters
}