import dayjs from 'dayjs'

const formatDateString = (date: Date | null, formatStr = 'YYYY-MM-DD HH:mm:ss'): string | null => {
	if (!date) return date
	return dayjs(date).format(formatStr)
}
export default formatDateString
