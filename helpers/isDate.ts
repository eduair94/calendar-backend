import moment from 'moment'

export const isDate = (date: string): boolean => {
  const d = moment(date)
  return d.isValid()
}
