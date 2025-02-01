import knex from "../database/knex.js";

async function getRentals(req, res) {
  try {
    const rentals = await knex("rental").select("*");

    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).send();
    console.error(error);
  }
}

async function addRental(req, res) {
  const {
    user_id,
    bike_id,
    rental_start,
    rental_end,
    city,
    quantity,
    user_name,
    phone_number,
    email,
    bike_name,
    message,
    total_price,
  } = req.body;

  try {
    const rental = await knex("rental").insert({
      user_id,
      bike_id,
      rental_start,
      rental_end,
      city,
      quantity,
      user_name,
      phone_number,
      email,
      bike_name,
      message,
      total_price,
    });

    res.status(201).json(rental);
  } catch (error) {
    res.status(500).send();
    console.error(error);
  }
}

async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    await knex("rental").where({ id }).del();
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
    console.error(error);
  }
}

export { getRentals, addRental, deleteRental };
