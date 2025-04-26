import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  NativeSelect,
} from "@mui/material";
import CreateProduct from "./CreateProduct";

const SIZE_OPTIONS = [
  { value: 1, label: "S" },
  { value: 2, label: "M" },
  { value: 3, label: "L" },
  { value: 4, label: "XL" },
  { value: 5, label: "XXL" },
  { value: 6, label: "XXXL" },
  { value: 7, label: "XXXXL" },
];

const ProductManage = () => {
  const [tableData, setTableData] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    axiosInstance
      .post("products/list", {
        categoriesIds: [],
        maxPrice: 10000,
        minPrice: 1,
        sizes: [],
      })
      .then((result) => {
        console.log(result.data);
        setTableData(result.data);
      })
      .catch((error) => {
        alert(error.message);
      });

    axiosInstance
      .get("categories/all")
      .then((result) => {
        setCategories(result.data);
      })
      .catch((error) => {
        alert("Failed to load categories: " + error.message);
      });
  }, []);

  const handleSelectItem = (item) => {
    axiosInstance
      .get(`products?id=${item.id}`)
      .then((result) => {
        console.log(result.data);
        const product = result.data;
        setSelectedItem(product);
        setFormData({
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          imageLink: product.imageLink || "",
          supportsSizes: product.supportsSizes || false,
          availableSizes: product.availableSizes || [],
          features: product.features || "",
          categoryId: product.categoryid || "",
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedItem) {
      setImageFile(file);
      const formDataToUpload = new FormData();
      formDataToUpload.append("image", file);

      const uploadUrl = `products/addImage?productId=${selectedItem.id}`;
      console.log("Uploading image to:", uploadUrl);
      console.log("Selected product ID:", selectedItem.id);
      console.log("File details:", file.name, file.size);

      axiosInstance
        .patch(uploadUrl, formDataToUpload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Image upload response:", response.data);
          const newImageUrl = response.data;
          if (!newImageUrl) {
            throw new Error("No image URL returned from server");
          }

          setFormData((prev) => ({
            ...prev,
            imageLink: newImageUrl,
          }));
          setTableData((prev) =>
            prev.map((item) =>
              item.id === selectedItem.id
                ? { ...item, imageLink: newImageUrl }
                : item
            )
          );
        })
        .catch((error) => {
          console.error(
            "Image upload error:",
            error.response?.data || error.message
          );
          alert(
            `Image upload failed: ${
              error.response?.data?.message || error.message
            }`
          );
        });
    } else {
      alert("Please select a product and an image.");
    }
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
  };

  const handleSave = () => {
    if (selectedItem) {
      const updatedProduct = {
        id: selectedItem.id,
        ...formData,
        price: parseFloat(formData.price),
        availableSizes: formData.supportsSizes ? formData.availableSizes : [],
      };
      updateProduct(updatedProduct);
    }
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`products?id=${id}`)
      .then((result) => {
        alert("Успішно видалено!");
        setFormData({
          name: "",
          price: "",
          description: "",
          imageLink: "",
          supportsSizes: false,
          availableSizes: [],
          features: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const updateProduct = (product) => {
    axiosInstance
      .put(`products`, product)
      .then(() => {
        setSelectedItem(null);
        setFormData({
          name: "",
          price: "",
          description: "",
          imageLink: "",
          supportsSizes: false,
          availableSizes: [],
          categoryId: "",
        });
        setImageFile(null);
        setTableData((prev) =>
          prev.map((item) => (item.id === product.id ? product : item))
        );
      })
      .catch((error) => {
        alert("Failed to update product: " + error.message);
      });
  };

  return (
    <Grid container spacing={3} sx={{ height: "100%" }}>
      <Grid item xs={12} md={8}>
        <Typography variant="h5" gutterBottom>
          Product Management
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", maxWidth: "100%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>
                  Buttons
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ marginLeft: "10px" }}
                    onClick={() => setCreateWindowOpen(true)}
                    startIcon={<AddIcon />}
                  >
                    Створити
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleSelectItem(row)}
                    >
                      Редагувати
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                      onClick={() => handleDelete(row.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Видалити
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <CreateProduct
        open={createWindowOpen}
        onClose={() => setCreateWindowOpen(false)}
        onProductCreated={() => {}}
      />
      <Grid item xs={12} md={4} maxWidth={500}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedItem ? "Редагувати продукт" : "Оберіть продукт"}
          </Typography>
          {selectedItem ? (
            <>
              <Paper sx={{ padding: "10px", mb: 2 }}>
                <img
                  src={formData.imageLink}
                  alt="Product"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Paper>
              <Button
                variant="contained"
                component="label"
                endIcon={<SendIcon />}
                sx={{ mb: 2 }}
              >
                Завантажити зображення
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              <TextField
                fullWidth
                label="Назва"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Ціна"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleFormChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Опис"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleFormChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Особливості"
                name="features"
                multiline
                rows={4}
                value={formData.features}
                onChange={handleFormChange}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-select-label">Категорія</InputLabel>
                <NativeSelect
                  labelId="category-select-label"
                  name="categoryId"
                  defaultValue={formData.categoryid || ""}
                  label="Category"
                  onChange={handleFormChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    name="supportsSizes"
                    checked={formData.supportsSizes}
                    onChange={handleFormChange}
                  />
                }
                label="Підтримка розмірів"
              />
              {formData.supportsSizes && (
                <FormControl component="fieldset" margin="normal">
                  <Typography variant="subtitle1">Доступні розміри</Typography>
                  <FormGroup row>
                    {SIZE_OPTIONS.map((size) => (
                      <FormControlLabel
                        key={size.value}
                        control={
                          <Checkbox
                            checked={formData.availableSizes.includes(
                              size.value
                            )}
                            onChange={handleSizesChange}
                            name={`size-${size.label}`}
                            value={size.value}
                          />
                        }
                        label={size.label}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              )}
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Зберегти
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setSelectedItem(null);
                    setFormData({
                      name: "",
                      price: "",
                      description: "",
                      imageLink: "",
                      supportsSizes: false,
                      availableSizes: [],
                    });
                    setImageFile(null);
                  }}
                  sx={{ ml: 1 }}
                >
                  Відмінити
                </Button>
              </Box>
            </>
          ) : (
            <Typography color="text.secondary">
              Натисніть "Редагувати" на продукт для його редагування та
              перегляду деталей.
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductManage;
