export class Photo {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;

    
    constructor(obj: any) {
        this.id = parseInt(obj.id, 10) ?? -1;
        this.author = obj.author ?? '';
        this.width = obj.width ?? 0;
        this.height = obj.height ?? 0;
        this.url = obj.url ?? '';
        this.download_url = obj.download_url ?? '';
    }
}