export interface IBlog {
    id: number;
    created: Date;
    title: string;
    text: string;
    score: number;
    tags: ITag[];
    comments: IComment[];
}

export interface ITag {
    title: string;
}

export interface IComment {
    id: number;
    name: string;
    text: string;
    created: Date;
}
