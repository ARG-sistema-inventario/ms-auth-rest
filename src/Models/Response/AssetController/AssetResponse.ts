import { AssetEntity } from "src/Models/Entities/AssetsEntity";

export default class AssetResponse {
    public assetId: number;
    public assetName: string;
    public assetDescription: string;
    public assetStock: boolean;
    public assetStockAmount: number;
    public assetPrice: number;
    public assetStatus: boolean;

    constructor(data: AssetEntity) {
        this.assetId = data ? data.getId() : null;
        this.assetName = data ? data.getName() : null;
        this.assetDescription = data ? data.getDescription() : null;
        this.assetStock = data ? data.isStock() : null;
        this.assetStockAmount = data ? data.getStockAmount() : null;
        this.assetPrice = data ? data.getPrice() : null;
        this.assetStatus = data ? data.isEnable() : null;
    }

}