import { ChecklistItemSchema } from "./checklist-item-base.schema";
import { checklistItemView } from "../../entities/checklist-item/checklist-item-view";
import { ChecklistGroupItemSchema } from "./group-checklist-item.schema";
import { ChecklistPlainItemSchema } from "./plain-checklist-item.schema";

ChecklistItemSchema.discriminator(
    checklistItemView.PLAIN,
    ChecklistPlainItemSchema,
);

ChecklistItemSchema.discriminator(
    checklistItemView.GROUP,
    ChecklistGroupItemSchema,
);

export { ChecklistItemSchema };
