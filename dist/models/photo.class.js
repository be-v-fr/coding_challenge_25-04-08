export class Photo {
    constructor(obj) {
        var _a, _b, _c, _d, _e, _f;
        this.id = (_a = parseInt(obj.id, 10)) !== null && _a !== void 0 ? _a : -1;
        this.author = (_b = obj.author) !== null && _b !== void 0 ? _b : '';
        this.width = (_c = obj.width) !== null && _c !== void 0 ? _c : 0;
        this.height = (_d = obj.height) !== null && _d !== void 0 ? _d : 0;
        this.url = (_e = obj.url) !== null && _e !== void 0 ? _e : '';
        this.download_url = (_f = obj.download_url) !== null && _f !== void 0 ? _f : '';
    }
}
