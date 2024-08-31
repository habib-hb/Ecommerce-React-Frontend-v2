export const formatPrice = (amount:number)=>{

    let currency = 'BDT';

    if(currency == 'USD'){

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount / 102);

    }

    if(currency == 'BDT'){

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BDT',
        }).format(amount);

    }
};