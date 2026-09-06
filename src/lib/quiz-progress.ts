export const questionProgress = (index: number, total: number): string =>
  `${index + 1} of ${total}`;

export const runningScore = (right: number, completed: number): string =>
  `Score: ${right}/${completed}`;

export const completedQuestions = (
  index: number,
  answered: boolean,
  total: number
): number => Math.min(total, index + (answered ? 1 : 0));
