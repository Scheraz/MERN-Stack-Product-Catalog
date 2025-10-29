import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore()
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Local state for modal update form
  const [updatedProduct, setUpdatedProduct] = useState(product)

  // Keep modal state in sync with prop
  useEffect(() => {
    setUpdatedProduct(product)
  }, [product])

  // Delete handler
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid)
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  // Update handler
  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(updatedProduct)
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    })
    if (success) onClose()
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
      cursor="pointer"
    >
      {/* Product Image */}
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      {/* Product Info */}
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        {/* Action Buttons */}
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            onClick={onOpen}
            aria-label="Edit Product"
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
            aria-label="Delete Product"
          />
        </HStack>
      </Box>

      {/* Update Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductCard
