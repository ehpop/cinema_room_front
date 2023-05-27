export type IDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export function extractDateTimeInfo(dateTimeString: string): IDate {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return { year, month, day, hour, minute, second };
}

export function formatDateTimeInfo(dateTime: IDate): string {
  const { year, month, day, hour, minute } = dateTime;

  const yearString = year.toString().padStart(4, "0");
  const monthString = month.toString().padStart(2, "0");
  const dayString = day.toString().padStart(2, "0");
  const hourString = hour.toString().padStart(2, "0");
  const minuteString = minute.toString().padStart(2, "0");

  return `${yearString}-${monthString}-${dayString} ${hourString}:${minuteString}`;
}

export function extractTimeOnlyInfo(dateTimeString: string): string {
  const date = new Date(dateTimeString);

  const hourString = date.getHours().toString().padStart(2, "0");
  const minuteString = date.getMinutes().toString().padStart(2, "0");

  return `${hourString}:${minuteString}`;
}

export function extractDateOnlyInfo(dateTimeString: string): string {
  const date = new Date(dateTimeString);

  const yearString = date.getFullYear().toString().padStart(4, "0");
  const monthString = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayString = date.getDate().toString().padStart(2, "0");

  return `${yearString}-${monthString}-${dayString}`;
}
