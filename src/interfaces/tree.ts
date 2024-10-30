export interface Tree {
    id: string;
    name: string;
    data?: string | null;
    parentId?: string | null;
    children?: Tree[];
}

export interface TreeElement {
    data?: string | null;
    id: string;
    name: string;
    parentId?: string | null;
}

export interface ITreeQueryResponse {
    data: {
        treeList: TreeElement[];
    }
}

export interface TagViewProps {
    item: Tree;
    level: number;
    handleSubmit: (name: string, data: string, parentId: string) => void;
    handleEdit: (value: string, id: string, field: string) => void;
}
