import { Box, Container, VStack, Text, Image, SimpleGrid, Heading, Link, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHome, FaBoxOpen, FaEnvelope, FaSearch } from "react-icons/fa";
import { useState } from "react";

const sampleProducts = [
  {
    id: 1,
    name: "Smartphone",
    image: "https://via.placeholder.com/150",
    price: 299,
    category: "Smartphone",
    brand: "Brand A",
  },
  {
    id: 2,
    name: "Laptop",
    image: "https://via.placeholder.com/150",
    price: 799,
    category: "Laptop",
    brand: "Brand B",
  },
  {
    id: 3,
    name: "Headphones",
    image: "https://via.placeholder.com/150",
    price: 199,
    category: "Headphones",
    brand: "Brand C",
  },
  {
    id: 4,
    name: "Smartwatch",
    image: "https://via.placeholder.com/150",
    price: 149,
    category: "Smartwatch",
    brand: "Brand A",
  },
];

const categories = ["All", "Smartphone", "Laptop", "Headphones", "Smartwatch"];
const brands = ["All", "Brand A", "Brand B", "Brand C"];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 1000]);
  const [brandFilter, setBrandFilter] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => setCategoryFilter(event.target.value);
  const handlePriceRangeChange = (event) => setPriceRangeFilter([event[0], event[1]]);
  const handleBrandChange = (event) => setBrandFilter(event.target.value);

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    const matchesPriceRange = product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1];
    const matchesBrand = brandFilter === "All" || product.brand === brandFilter;
    return matchesCategory && matchesPriceRange && matchesBrand;
  });

  return (
    <Box>
      <Flex as="nav" bg="blue.500" color="white" padding="1.5rem" justifyContent="space-around">
        <Link as={RouterLink} to="/" display="flex" alignItems="center">
          <FaHome />
          <Text marginLeft="0.5rem">Home</Text>
        </Link>
        <Link as={RouterLink} to="/products" display="flex" alignItems="center">
          <FaBoxOpen />
          <Text marginLeft="0.5rem">Products</Text>
        </Link>
        <Link as={RouterLink} to="/contact" display="flex" alignItems="center">
          <FaEnvelope />
          <Text marginLeft="0.5rem">Contact Us</Text>
        </Link>
        <InputGroup maxW="400px" mx="auto">
          <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            bg="white"
            color="black"
          />
        </InputGroup>
      </Flex>

      <Container maxW="container.xl" centerContent>
        <VStack spacing={4} mt={10}>
          <Heading as="h1" size="2xl">Welcome to Our Electronics Store</Heading>
          <Text fontSize="lg">Discover the latest in electronic & smart appliance technology.</Text>
        </VStack>

        <Flex direction={{ base: "column", md: "row" }} justify="space-between" mb={10}>
          <Box>
            <Text>Category</Text>
            <Select value={categoryFilter} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </Box>
          <Box>
            <Text>Price Range</Text>
            <RangeSlider
              defaultValue={[0, 1000]}
              min={0}
              max={1000}
              step={50}
              onChangeEnd={handlePriceRangeChange}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Box>
          <Box>
            <Text>Brand</Text>
            <Select value={brandFilter} onChange={handleBrandChange}>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </Select>
          </Box>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mt={10}>
          {filteredProducts.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" textAlign="center">
              <Image src={product.image} alt={product.name} />
              <Box p="6">
                <Text fontWeight="bold" fontSize="xl">{product.name}</Text>
                <Text mt="2">{product.price}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Index;