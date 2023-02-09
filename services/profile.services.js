const getPurchases = (orderID, user) => {
    if (orderID) {
        console.log(user.purchaseOrders);
        const purchaseOrder = user.purchaseOrders.find(elem => elem.id == orderID).items;
        let total = 0;
        purchaseOrder.forEach(elem => { total += elem.priceTotal; });
        return{ purchaseOrder, total };
    } else {
        return false;
    }
}

export { getPurchases }