export default function getVietnameseDayOfWeek(dayOfWeek: string) {
  switch (dayOfWeek) {
    case 'Monday':
      return 'Thứ hai';
    case 'Tuesday':
      return 'Thứ ba';
    case 'Wednesday':
      return 'Thứ tư';
    case 'Thursday':
      return 'Thứ năm';
    case 'Friday':
      return 'Thứ sáu';
    case 'Saturday':
      return 'Thứ bảy';
    case 'Sunday':
      return 'Chủ nhật';
    default:
      return '';
  }
}

export const isWeekend = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDay();
  return day === 6 || day === 0;
};
