import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  Divider,
  FormControlLabel,
  Checkbox,
  Card,
  CardMedia,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
];

const AdminPage = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth); // Assuming 'auth' is the slice name
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn && !isAdmin) {
      navigate("/");
      console.log("Not Admin");
    }
  }, [isLoggedIn, isAdmin, navigate]);

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [tableData, setTableData] = useState([]);

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
  }, []);

  const handleSelectItem = (item) => {
    axiosInstance
      .get(`products?id=${item.id}`)
      .then((result) => {
        const product = result.data;
        setSelectedItem(product);
        setFormData({
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          imageLink: product.imageLink || "",
          supportsSizes: product.supportsSizes || false,
          availableSizes: product.availableSizes || [],
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
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({
        ...prev,
        imageLink: URL.createObjectURL(file), // Тимчасовий перегляд
      }));
    }
  };

  const handleSave = () => {
    if (selectedItem) {
      const updatedProduct = {
        id: selectedItem.id,
        ...formData,
        price: parseFloat(formData.price), // Перетворення в число
        availableSizes: formData.supportsSizes ? formData.availableSizes : [], // Скидаємо розміри, якщо supportsSizes=false
      };
      console.log("Saving changes for:", updatedProduct);

      // Якщо є нове зображення, потрібно завантажити його на сервер
      if (imageFile) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("image", imageFile);

        // Приклад запиту для завантаження зображення
        /*
        axiosInstance
          .post("upload/image", formDataToUpload)
          .then((response) => {
            updatedProduct.imageLink = response.data.imageUrl; // Оновлюємо URL зображення
            // Продовжуємо з оновленням продукту
            updateProduct(updatedProduct);
          })
          .catch((error) => {
            alert("Image upload failed: " + error.message);
          });
        */
      } else {
        // Оновлення продукту без нового зображення
        updateProduct(updatedProduct);
      }
    }
  };

  const updateProduct = (product) => {
    // Приклад API-запиту для оновлення продукту
    axiosInstance
      .put(`products/${product.id}`, product)
      .then(() => {
        alert("Product updated successfully!");
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
        // Оновлюємо таблицю
        setTableData((prev) =>
          prev.map((item) => (item.id === product.id ? product : item))
        );
      })
      .catch((error) => {
        alert("Failed to update product: " + error.message);
      });
  };

  const handleLogOut = async () => {
    await axiosInstance
      .delete("/auth/logout")
      .then(async () => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setFormState("login");
        dispatch(logout());
        navigate("/");
      });
  };

  const handleItemClick = async (itemText) => {
    switch (itemText) {
      case "LogOut":
        await handleLogOut();
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon /> },
            { text: "Users", icon: <PeopleIcon /> },
            { text: "LogOut", icon: <SettingsIcon /> },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleItemClick(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          display: "flex",
        }}
      >
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
                    <TableCell>Buttons</TableCell>
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
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => console.log("Delete", row.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={4} maxWidth={500}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedItem ? "Edit User" : "Select a User"}
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
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleFormChange}
                    margin="normal"
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
                    value={formData.features}
                    onChange={handleFormChange}
                    margin="normal"
                  />
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
                    <TextField
                      fullWidth
                      label="Available Sizes (comma-separated)"
                      name="availableSizes"
                      value={formData.availableSizes.join(",")}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          availableSizes: e.target.value
                            .split(",")
                            .map((size) => parseInt(size.trim()))
                            .filter((size) => !isNaN(size)),
                        }))
                      }
                      margin="normal"
                    />
                  )}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
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
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <Typography color="text.secondary">
                  Click "Edit" on a product to modify its details.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminPage;
