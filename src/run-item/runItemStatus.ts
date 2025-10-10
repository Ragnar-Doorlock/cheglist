export const runItemStatus = {
    PASSED: 'passed',
    FAILED: 'failed',
    BLOCKED: 'blocked',
    NOT_RUN: 'not_run',
} as const;

export type RunItemStatus = (typeof runItemStatus)[keyof typeof runItemStatus];
