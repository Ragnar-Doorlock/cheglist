export const checklistItemView = {
    PLAIN: 'plain',
    GROUP: 'group',
} as const;

export type ChecklistItemView = (typeof checklistItemView)[keyof typeof checklistItemView];
