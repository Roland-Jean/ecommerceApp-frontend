import {
  getAllProducts,
  getProductById,
  deleteProductById,
  deleteAllProducts,
  addProduct,
  updateProductById,
  searchProducts,
  getProductsByCategory,
  getFeaturedProducts,
} from "../api/products";

// Alle Produkte abrufen
export const getProductsService = async () => {
  try {
    const response = await getAllProducts();
    return response.data;
  } catch (error) {
    console.error("Get products service error:", error);
    throw error;
  }
};

// Einzelnes Produkt abrufen
export const getProductByIdService = async (id) => {
  try {
    const response = await getProductById(id);
    return response.data;
  } catch (error) {
    console.error("Get product by ID service error:", error);
    throw error;
  }
};

// Produkt löschen
export const deleteProductService = async (id) => {
  try {
    const response = await deleteProductById(id);
    return response.data;
  } catch (error) {
    console.error("Delete product service error:", error);
    throw error;
  }
};

// Alle Produkte löschen (Admin-Funktion)
export const deleteAllProductsService = async () => {
  try {
    const response = await deleteAllProducts();
    return response.data;
  } catch (error) {
    console.error("Delete all products service error:", error);
    throw error;
  }
};

// Neues Produkt hinzufügen
export const addProductService = async (productData) => {
  try {
    const response = await addProduct(productData);
    return response.data;
  } catch (error) {
    console.error("Add product service error:", error);
    throw error;
  }
};

// Produkt aktualisieren
export const updateProductService = async (id, productData) => {
  try {
    const response = await updateProductById(id, productData);
    return response.data;
  } catch (error) {
    console.error("Update product service error:", error);
    throw error;
  }
};

// Produkte suchen
export const searchProductsService = async (query) => {
  try {
    const response = await searchProducts(query);
    return response.data;
  } catch (error) {
    console.error("Search products service error:", error);
    throw error;
  }
};

// Produkte nach Kategorie abrufen
export const getProductsByCategoryService = async (categoryId) => {
  try {
    const response = await getProductsByCategory(categoryId);
    return response.data;
  } catch (error) {
    console.error("Get products by category service error:", error);
    throw error;
  }
};

// Featured Produkte abrufen
export const getFeaturedProductsService = async () => {
  try {
    const response = await getFeaturedProducts();
    return response.data;
  } catch (error) {
    console.error("Get featured products service error:", error);
    throw error;
  }
};

// Zusätzliche Service-Funktionen:

// Produkte mit Pagination
export const getProductsWithPaginationService = async (
  page = 1,
  limit = 10
) => {
  try {
    const response = await getAllProducts();
    const products = response.data;

    // Client-seitige Pagination (falls Backend keine Pagination hat)
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      totalProducts: products.length,
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      hasNextPage: endIndex < products.length,
      hasPrevPage: page > 1,
    };
  } catch (error) {
    console.error("Get products with pagination service error:", error);
    throw error;
  }
};

// Produkte nach Preis filtern
export const getProductsByPriceRangeService = async (minPrice, maxPrice) => {
  try {
    const response = await getAllProducts();
    const products = response.data;

    const filteredProducts = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    return filteredProducts;
  } catch (error) {
    console.error("Get products by price range service error:", error);
    throw error;
  }
};

// Produkte sortieren
export const getSortedProductsService = async (
  sortBy = "name",
  sortOrder = "asc"
) => {
  try {
    const response = await getAllProducts();
    const products = response.data;

    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    return sortedProducts;
  } catch (error) {
    console.error("Get sorted products service error:", error);
    throw error;
  }
};
