function priceOrder (product, quality, shippingMethod) {
    const priceData = calculatePricingData(product, quality)
    return applyShipping(priceData, shippingMethod)
}

function applyShipping (priceData, shippingMethod) {
    const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)
            ? shippingMethod.discountedFee : shippingMethod.shippingPerCase
    const shippingCost = priceData.quality * shippingPerCase
    return priceData.basePrice - priceData.discount + shippingCost
}
function calculatePricingData (product, quality) {
    const basePrice = product.basePrice * quality
    const discount = Math.max(quality - product.discountThreshold, 0)
            * product.basePrice * product.discountRate
    return {
        basePrice: basePrice,
        quality: quality,
        discount: discount
    }
}