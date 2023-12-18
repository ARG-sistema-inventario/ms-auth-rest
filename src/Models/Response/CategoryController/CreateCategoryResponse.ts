export default class CreateCategoryResponse {
    public categoryId: number;
    public categoryName: string;

    constructor(categoryId: number, categoryName: string) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }
}
