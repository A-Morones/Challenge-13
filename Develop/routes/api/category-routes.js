const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try{
    const categories = await Category.findAll({ includes: [{ model: Product}] });
    res.status(200).json(categories);
  }catch (err) {
    res.status(500).json({ message: 'not found!' });
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
  if (!category) {
    res.status(404).json({ message: 'id not found' });
    return;
  }
  res.status(200).json(category);
} catch (err) {
  res.status(500).json({ message: 'not found!' });
}
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'creation failed' });
  }
  });

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updated = await Category.update(req.body, { where: { id: req.params.id } });
    if (!updated[0]) {
      res.status(404).json({ message: 'id not found' });
    }
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id} });
    if (!deleted) {
      res.status(404).json({ message: 'id not found' }) : res.status(200).json(deleted);
    }
  }
});

module.exports = router;
