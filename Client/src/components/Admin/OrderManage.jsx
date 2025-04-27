import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../AxiosInstance";
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
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const SIZE_OPTIONS = [
  { value: 0, label: "-" },
  { value: 1, label: "S" },
  { value: 2, label: "M" },
  { value: 3, label: "L" },
  { value: 4, label: "XL" },
  { value: 5, label: "XXL" },
  { value: 6, label: "XXXL" },
  { value: 7, label: "XXXXL" },
];

const OrderManage = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("order")
      .then((result) => {
        setTableData(result.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handleSelectItem = (item) => {
    setSelectedOrder(item);
  };

  const formatDate = (date) => {
    return format(new Date(date), "dd.MM.yyyy");
  };

  return (
    <Grid container spacing={3} sx={{ height: "100%", width: "100%" }}>
      {/* Таблиця зі списком замовлень */}
      <Grid item size={8}>
        <Typography variant="h5" gutterBottom>
          Керування покупками
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", maxWidth: "100%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="order table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Сума</TableCell>
                <TableCell>Замовник</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{formatDate(row.orderDate)}</TableCell>
                  <TableCell>{row.totalAmount}</TableCell>
                  <TableCell>{row.contactName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleSelectItem(row)}
                    >
                      Детальніше
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item size={4} sx={{ maxWidth: 500 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {selectedOrder ? "Деталі замовлення" : "Оберіть замовлення"}
          </Typography>
          {selectedOrder ? (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Основна інформація
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ID:</strong> {selectedOrder.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Дата:</strong> {formatDate(selectedOrder.orderDate)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Сума:</strong> {selectedOrder.totalAmount} грн
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Адреса доставки:</strong>{" "}
                    {selectedOrder.shippingAddress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Ім'я замовника:</strong> {selectedOrder.contactName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {selectedOrder.contactEmail}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Товари у замовленні
                </Typography>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="order items table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID товару</TableCell>
                        <TableCell>Назва</TableCell>
                        <TableCell>Кількість</TableCell>
                        <TableCell>Розмір</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.orderItems.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>{item.productId}</TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            {
                              SIZE_OPTIONS.find(
                                (x) => x.value == item.productSize
                              ).label
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Закрити
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Typography color="text.secondary">
              Натисніть "Детальніше" на замовлення для перегляду деталей.
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderManage;
