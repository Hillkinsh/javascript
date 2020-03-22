class Order {
    constructor (quality, item) {
        this._quality = quality
        this._item = item
    }
    get price () {
        // const baseprice = this.baseprice
        
        return this.baseprice * this.discountfactor
    }
    get baseprice () {
        return this._quality * this._item.price
    }
    get discountfactor () {
        var discountfactor = 0.98
        if (baseprice > 1000) {
            discountfactor -= 0.03
        }
        return discountfactor
    }
}

let order = new Order(100, {price: 250})