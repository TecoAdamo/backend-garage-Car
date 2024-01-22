const express = require("express");
const router = express.Router();

const cars = require("./models/cars");

router.get("/cars", (req, res) => {
  if (cars.length == 0) {
    res.status(404).json({ message: "Nenhum carro foi encontrado" });
  } else {
    res.status(200).json(cars);
  }
});

router.post("/cars", (req, res) => {
  const newCar = req.body;

  //adicionar uma ID única pra cada carro adicionado!!
  const nextId =
    cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1;
  newCar.id = nextId;

  cars.push(newCar);

  res.status(200).json(newCar);
});

router.put("/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCar = req.body;

  console.log("Requisição PUT recebida para:", `/cars/${carId}`);
  console.log("Dados Atualizados:", updatedCar);

  const carIndex = cars.findIndex((car) => car.id === carId);

  console.log("Índice do Carro:", carIndex);

  if (carIndex !== -1) {
    cars[carIndex] = { ...cars[carIndex], ...updatedCar };
    res.json({
      success: true,
      message: "Carro atualizado com sucesso",
      data: cars[carIndex],
    });
  } else {
    res.status(404).json({ success: false, message: "Carro não encontrado" });
  }
});

module.exports = router;
