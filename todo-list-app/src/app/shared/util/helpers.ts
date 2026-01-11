export const generateNextId = <T extends { id: number }>(items: T[]): number => {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id)) + 1;
};

export function formatDuration(ms: number): string {
  if (ms < 0 || isNaN(ms)) {
    return '00:00:00';
  }

  const MS_IN_SECOND = 1000;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;

  let totalSeconds = Math.floor(ms / MS_IN_SECOND);

  const hours = Math.floor(totalSeconds / (SECONDS_IN_MINUTE * MINUTES_IN_HOUR));
  totalSeconds %= SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

  const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);

  const seconds = totalSeconds % SECONDS_IN_MINUTE;

  const pad = (num: number) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
