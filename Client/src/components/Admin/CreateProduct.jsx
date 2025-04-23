import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  FormGroup,
} from "@mui/material";
import axiosInstance from "../AxiosInstance";

const SIZE_OPTIONS = [
  { value: 1, label: "S" },
  { value: 2, label: "M" },
  { value: 3, label: "L" },
  { value: 4, label: "XL" },
  { value: 5, label: "XXL" },
  { value: 6, label: "XXXL" },
  { value: 7, label: "XXXXL" },
];

const CreateProduct = ({ open, onClose, onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    features: "",
    imageLink: "",
    supportsSizes: false,
    availableSizes: [],
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      axiosInstance
        .get("categories/all")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          alert(`Failed to load categories: ${error.message}`);
        });
    }
  }, [open]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSizesChange = (e) => {
    const sizeValue = parseInt(e.target.value);
    const isChecked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      availableSizes: isChecked
        ? [...prev.availableSizes, sizeValue]
        : prev.availableSizes.filter((size) => size !== sizeValue),
    }));
    setErrors((prev) => ({ ...prev, availableSizes: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      newErrors.price = "Valid price is required.";
    }
    if (formData.supportsSizes && !formData.availableSizes.length) {
      newErrors.availableSizes = "At least one size is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      description: formData.description || null,
      features: formData.features || null,
      supportsSizes: formData.supportsSizes,
      availableSizes: formData.supportsSizes ? formData.availableSizes : [],
      categoryId: parseInt(formData.categoryId) || null,
    };

    try {
      const response = await axiosInstance.post("products", productData);
      const newProduct = response.data;

      onProductCreated(newProduct);
      handleClose();
    } catch (error) {
      alert(
        `Failed to create product: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      features: "",
      imageLink: "",
      supportsSizes: false,
      availableSizes: [],
      categoryId: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleFormChange}
          margin="normal"
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleFormChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Features"
          name="features"
          multiline
          rows={4}
          value={formData.features || ""}
          onChange={handleFormChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            name="categoryId"
            value={formData.categoryId || ""}
            label="Category"
            onChange={handleFormChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.image && (
          <Typography color="error" variant="body2">
            {errors.image}
          </Typography>
        )}
        <FormControlLabel
          control={
            <Checkbox
              name="supportsSizes"
              checked={formData.supportsSizes}
              onChange={handleFormChange}
            />
          }
          label="Supports Sizes"
        />
        {formData.supportsSizes && (
          <FormControl
            component="fieldset"
            margin="normal"
            error={!!errors.availableSizes}
          >
            <Typography variant="subtitle1">Available Sizes</Typography>
            <FormGroup row>
              {SIZE_OPTIONS.map((size) => (
                <FormControlLabel
                  key={size.value}
                  control={
                    <Checkbox
                      checked={formData.availableSizes.includes(size.value)}
                      onChange={handleSizesChange}
                      name={`size-${size.label}`}
                      value={size.value}
                    />
                  }
                  label={size.label}
                />
              ))}
            </FormGroup>
            {errors.availableSizes && (
              <Typography color="error" variant="body2">
                {errors.availableSizes}
              </Typography>
            )}
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProduct;
