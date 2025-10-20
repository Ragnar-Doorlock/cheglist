export type NewProjectData = {
    name: string;
    ownerId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ProjectData = NewProjectData & {
    id: string;
};
