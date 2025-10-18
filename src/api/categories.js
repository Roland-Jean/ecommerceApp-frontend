import axiosInstance from "./axios";

// Einzelne Kategorie abrufen
export const getCategoryById = (id) => {
    return axiosInstance.get(`/categories/${id}`);
}

// Neue Kategorie erstellen (Admin-Funktion)
export const createCategory = (categoryData) => {
    return axiosInstance.post('/categories', categoryData);
}

// Kategorie aktualisieren (Admin-Funktion)
export const updateCategory = (id, categoryData) => {
    return axiosInstance.put(`/categories/${id}`, categoryData);
}

// Kategorie löschen (Admin-Funktion)
export const deleteCategory = (id) => {
    return axiosInstance.delete(`/categories/${id}`);
}
// Produkte einer bestimmten Kategorie abrufen
export const getProductsByCategory = (categoryId) => {
    return axiosInstance.get(`/categories/${categoryId}/products`);
}

// Haupt-/Unterkategorien
export const getParentCategories = () => {
    return axiosInstance.get('/categories?parent=null');
}

export const getSubCategories = (parentId) => {
    return axiosInstance.get(`/categories?parent=${parentId}`);
}