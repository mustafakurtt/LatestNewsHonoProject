export default function updateProduct<T>(
    oldProduct: T,
    newProductData: Partial<Omit<T, "id" | "createdAt">>
  ): T {
    const updatedProduct = { ...oldProduct };

    for (const key in newProductData) {
      if (
        newProductData.hasOwnProperty(key) &&
        key !== "id" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "deletedAt"
      ) {
        (updatedProduct as any)[key] = (newProductData as any)[key];
      }
    }
    (updatedProduct as any).updatedAt = new Date().toISOString();
    return updatedProduct;
  }