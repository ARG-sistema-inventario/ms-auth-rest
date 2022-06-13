export default class CategoryResponse {
    public categoryId: number;
    public categoryName: string;
    public categoryDescription: string;
    public categoryStatus: boolean;

    constructor(categoryId: number, categoryName: string, categoryDescription: string, categoryStatus: boolean) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryDescription = categoryDescription;
        this.categoryStatus = categoryStatus;
    }
}
