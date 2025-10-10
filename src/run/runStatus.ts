export const runStatus = {
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
} as const;

export type RunStatus = (typeof runStatus)[keyof typeof runStatus];
