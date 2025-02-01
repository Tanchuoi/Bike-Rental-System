const getBrandId = async (brandName) => {
  const brand = await knex("brand").where({ name: brandName }).first(); // Assuming 'brands' is your brand table
  return brand ? brand.id : null; // Return the brand ID or null if not found
};

export { getBrandId };
