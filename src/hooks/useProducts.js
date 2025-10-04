// src/hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAllProducts, 
  getProductById, 
  deleteProductById,
  addProduct,
  updateProductById,
  searchProducts,
  getProductsByCategory,
  getFeaturedProducts
} from '../api/products';

// Get all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getAllProducts();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get single product by ID
export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await getProductById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Search products
export const useSearchProducts = (query) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async () => {
      const response = await searchProducts(query);
      return response.data;
    },
    enabled: !!query && query.length > 2,
  });
};

// Get products by category
export const useProductsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      const response = await getProductsByCategory(categoryId);
      return response.data;
    },
    enabled: !!categoryId,
  });
};

// Get featured products
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await getFeaturedProducts();
      return response.data;
    },
  });
};

// Mutations (for adding, updating, deleting)
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, productData }) => updateProductById(id, productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};