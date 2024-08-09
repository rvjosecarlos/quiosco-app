export const formatCurrency = ( monto : number) => {
    return Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(monto);
};

export const getImageUrl = ( image: string ) => {
    const isImgCloudinary = image.includes("cloudinary");
    const imageUrl = isImgCloudinary ? image : `/products/${image}.jpg`;
    return imageUrl;
}