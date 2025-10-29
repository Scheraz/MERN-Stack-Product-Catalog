import { create } from 'zustand'

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  // Create new product
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields' }
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      const data = await res.json()
      set((state) => ({ products: [...state.products, data.data] }))
      return { success: true, message: 'Product created successfully' }
    } catch (error) {
      console.log(error)
      return { success: false, message: 'Failed to create product' }
    }
  },

  // Fetch all products
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      set({ products: data.data })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  },

  // Delete a product
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: 'DELETE' })
      const data = await res.json()
      if (!data.success)
        return { success: false, message: data.msg || 'Delete failed' }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }))
      return {
        success: true,
        message: data.msg || 'Product deleted successfully',
      }
    } catch (error) {
      console.log(error)
      return { success: false, message: 'Failed to delete product' }
    }
  },

  // Update a product
  updateProduct: async (updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${updatedProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      })
      const data = await res.json()
      if (!res.ok)
        return { success: false, message: data.msg || 'Update failed' }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === updatedProduct._id ? data : product
        ),
      }))
      return { success: true, message: 'Product updated successfully' }
    } catch (error) {
      console.log(error)
      return { success: false, message: 'Failed to update product' }
    }
  },
}))
