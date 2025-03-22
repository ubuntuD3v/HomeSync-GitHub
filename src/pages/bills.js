import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  IconButton, 
  Button,
  TextField,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import Layout from '../components/Layout';

// Sample data for bills
const bills = [
  { 
    id: 1, 
    name: 'Electricity Bill', 
    amount: 120.45,
    dueDate: '2025-03-25', 
    category: 'Utilities',
    paymentMethod: 'Credit Card',
    status: 'Pending',
    recurring: 'Monthly'
  },
  { 
    id: 2, 
    name: 'Internet Bill', 
    amount: 65.99,
    dueDate: '2025-03-28', 
    category: 'Utilities',
    paymentMethod: 'Bank Account',
    status: 'Pending',
    recurring: 'Monthly'
  },
  { 
    id: 3, 
    name: 'Rent', 
    amount: 1450.00,
    dueDate: '2025-04-01', 
    category: 'Housing',
    paymentMethod: 'Bank Account',
    status: 'Pending',
    recurring: 'Monthly'
  },
  { 
    id: 4, 
    name: 'Water Bill', 
    amount: 45.30,
    dueDate: '2025-04-05', 
    category: 'Utilities',
    paymentMethod: 'Credit Card',
    status: 'Pending',
    recurring: 'Monthly'
  },
  { 
    id: 5, 
    name: 'Phone Bill', 
    amount: 85.00,
    dueDate: '2025-03-15', 
    category: 'Utilities',
    paymentMethod: 'Credit Card',
    status: 'Paid',
    recurring: 'Monthly'
  },
  { 
    id: 6, 
    name: 'Gas Bill', 
    amount: 78.25,
    dueDate: '2025-03-10', 
    category: 'Utilities',
    paymentMethod: 'Bank Account',
    status: 'Overdue',
    recurring: 'Monthly'
  },
];

// Sample budget categories
const budgetCategories = [
  { name: 'Housing', spent: 1450, budget: 1500, color: '#4A90E2' },
  { name: 'Utilities', spent: 395, budget: 400, color: '#F2994A' },
  { name: 'Groceries', spent: 650, budget: 600, color: '#EB5757' },
  { name: 'Transportation', spent: 250, budget: 300, color: '#6FCF97' },
  { name: 'Entertainment', spent: 200, budget: 200, color: '#BB6BD9' },
  { name: 'Savings', spent: 500, budget: 500, color: '#56CCF2' },
];

// Sample payment methods
const paymentMethods = [
  { id: 1, name: 'Visa ****4582', type: 'Credit Card', expiry: '05/27' },
  { id: 2, name: 'Mastercard ****7845', type: 'Credit Card', expiry: '09/26' },
  { id: 3, name: 'Bank Account', type: 'Bank', accountNumber: '****6789' },
];

// Sample bill categories
const billCategories = [
  'Housing', 'Utilities', 'Insurance', 'Subscriptions', 'Loans', 'Other'
];

// Sample recurring options
const recurringOptions = ['None', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

export default function BillPayment() {
  const [tabValue, setTabValue] = useState(0);
  const [openNewBill, setOpenNewBill] = useState(false);
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    dueDate: null,
    category: 'Utilities',
    paymentMethod: '',
    recurring: 'Monthly'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenNewBill = () => {
    setOpenNewBill(true);
  };

  const handleCloseNewBill = () => {
    setOpenNewBill(false);
  };

  const handleNewBillChange = (prop) => (event) => {
    setNewBill({ ...newBill, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setNewBill({ ...newBill, dueDate: date });
  };

  const handleSaveBill = () => {
    // Here you would typically save the bill to your backend
    console.log('Saving bill:', newBill);
    handleCloseNewBill();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  // Calculate total income, expenses, and remaining
  const totalIncome = 5200;
  const totalExpenses = budgetCategories.reduce((sum, category) => sum + category.spent, 0);
  const remaining = totalIncome - totalExpenses;
  const percentSpent = Math.round((totalExpenses / totalIncome) * 100);

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Bill Payment & Budgeting
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenNewBill}
          >
            Add New Bill
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage your bills, track expenses, and plan your budget
        </Typography>
      </Box>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="bill payment tabs">
            <Tab label="Bills" />
            <Tab label="Budget" />
            <Tab label="Reports" />
            <Tab label="Payment Methods" />
          </Tabs>
        </Box>

        {/* Bills Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button startIcon={<FilterListIcon />} variant="outlined" size="small">
                Filter
              </Button>
              <Button startIcon={<SortIcon />} variant="outlined" size="small">
                Sort
              </Button>
            </Box>
            <Box>
              <TextField
                size="small"
                placeholder="Search bills..."
                variant="outlined"
              />
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ minWidth: 650 }} aria-label="bills table">
              <TableHead>
                <TableRow>
                  <TableCell>Bill</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow
                    key={bill.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: 1, 
                            backgroundColor: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            mr: 2
                          }}
                        >
                          {bill.name.charAt(0)}
                        </Box>
                        <Typography variant="body1">{bill.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">${bill.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{bill.category}</TableCell>
                    <TableCell>{bill.paymentMethod}</TableCell>
                    <TableCell>
                      <Chip 
                        label={bill.status} 
                        size="small"
                        color={getStatusColor(bill.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        size="small"
                        disabled={bill.status === 'Paid'}
                      >
                        {bill.status === 'Paid' ? 'Paid' : 'Pay Now'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Budget Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader
                  title="Budget by Category"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  {budgetCategories.map((category) => (
                    <Box key={category.name} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">{category.name}</Typography>
                        <Box sx={{ display: 'flex' }}>
                          <Typography variant="body1" color="text.primary">${category.spent}</Typography>
                          <Typography variant="body1" color="text.secondary">/${category.budget}</Typography>
                        </Box>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(category.spent / category.budget) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#E0E4E9',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: category.color,
                          }
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title="Monthly Budget"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">Total Income</Typography>
                      <Typography variant="body1" color="text.primary">${totalIncome.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">Total Expenses</Typography>
                      <Typography variant="body1" color="text.primary">${totalExpenses.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body1">Remaining</Typography>
                      <Typography 
                        variant="body1" 
                        color={remaining >= 0 ? 'success.main' : 'error.main'}
                      >
                        ${remaining.toFixed(2)}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={percentSpent} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#E0E4E9',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: percentSpent > 90 ? 'error.main' : percentSpent > 75 ? 'warning.main' : 'primary.main',
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption">0%</Typography>
                      <Typography variant="caption">{percentSpent}% spent</Typography>
                      <Typography variant="caption">100%</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mt: 3 }}>
                <CardHeader
                  title="Payment Methods"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <List>
                    {paymentMethods.map((method) => (
                      <React.Fragment key={method.id}>
                        <ListItem>
                          <ListItemIcon>
                            {method.type === 'Credit Card' ? (
                              <CreditCardIcon color="primary" />
                            ) : (
                              <AccountBalanceIcon color="primary" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={method.name}
                            secondary={method.type === 'Credit Card' ? `Expires: ${method.expiry}` : method.accountNumber}
                          />
                          <Button size="small">Edit</Button>
                        </ListItem>
                        {method.id !== paymentMethods.length && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      startIcon={<AddIcon />}
                    >
                      Add Payment Method
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Reports Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader
                  title="Monthly Expenses"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                    {budgetCategories.map((category) => (
                      <Box 
                        key={category.name} 
                        sx={{ 
                          flex: 1,
                          height: `${(category.spent / Math.max(...budgetCategories.map(c => c.spent))) * 100}%`,
                          backgroundColor: category.color,
                          borderRadius: '4px 4px 0 0',
                          position: 'relative',
                          minWidth: 40,
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            position: 'absolute', 
                            top: -24, 
                            left: 0, 
                            right: 0, 
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}
                        >
                          ${category.spent}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            position: 'absolute', 
                            bottom: -24, 
                            left: 0, 
                            right: 0, 
                            textAlign: 'center',
                          }}
                        >
                          {category.name.substring(0, 3)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title="Recent Transactions"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <List>
                    {bills.filter(bill => bill.status === 'Paid').slice(0, 3).map((bill) => (
                      <React.Fragment key={bill.id}>
                        <ListItem>
                          <ListItemIcon>
                            <ReceiptIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={bill.name}
                            secondary={`Paid on ${new Date(bill.dueDate).toLocaleDateString()}`}
                          />
                          <Typography variant="body2" color="text.primary">${bill.amount.toFixed(2)}</Typography>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outlined" color="primary">View All Transactions</Button>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mt: 3 }}>
                <CardHeader
                  title="Spending Insights"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography variant="body2" paragraph>
                    • Your highest expense category is Housing at ${budgetCategories.find(c => c.name === 'Housing').spent}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • You've exceeded your Groceries budget by ${budgetCategories.find(c => c.name === 'Groceries').spent - budgetCategories.find(c => c.name === 'Groceries').budget}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • You're saving ${budgetCategories.find(c => c.name === 'Savings').spent} this month
                  </Typography>
                  <Typography variant="body2">
                    • You have {bills.filter(bill => bill.status === 'Pending').length} pending bills totaling ${bills.filter(bill => bill.status === 'Pending').reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Payment Methods Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            {paymentMethods.map((method) => (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 140, 
                      backgroundColor: method.type === 'Credit Card' ? 'primary.light' : 'secondary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      p: 2
                    }}
                  >
                    {method.type === 'Credit Card' ? (
                      <CreditCardIcon sx={{ fontSize: 80, opacity: 0.2, position: 'absolute', right: -20, bottom: -20 }} />
                    ) : (
                      <AccountBalanceIcon sx={{ fontSize: 80, opacity: 0.2, position: 'absolute', right: -20, bottom: -20 }} />
                    )}
                    <Box sx={{ zIndex: 1, width: '100%' }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>{method.name}</Typography>
                      {method.type === 'Credit Card' && (
                        <Typography variant="body2">Expires: {method.expiry}</Typography>
                      )}
                      {method.type === 'Bank' && (
                        <Typography variant="body2">{method.accountNumber}</Typography>
                      )}
                    </Box>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="outlined" size="small">Edit</Button>
                      <Button variant="outlined" size="small" color="error">Remove</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>Add Payment Method</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                  >
                    Add New
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

      {/* Add Bill Dialog */}
      <Dialog open={openNewBill} onClose={handleCloseNewBill} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Bill</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Bill Name"
              variant="outlined"
              value={newBill.name}
              onChange={handleNewBillChange('name')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              variant="outlined"
              value={newBill.amount}
              onChange={handleNewBillChange('amount')}
              margin="normal"
              InputProps={{
                startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
              }}
              required
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due Date"
                    value={newBill.dueDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newBill.category}
                    label="Category"
                    onChange={handleNewBillChange('category')}
                  >
                    {billCategories.map((category) => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={newBill.paymentMethod}
                    label="Payment Method"
                    onChange={handleNewBillChange('paymentMethod')}
                  >
                    {paymentMethods.map((method) => (
                      <MenuItem key={method.id} value={method.name}>{method.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Recurring</InputLabel>
                  <Select
                    value={newBill.recurring}
                    label="Recurring"
                    onChange={handleNewBillChange('recurring')}
                  >
                    {recurringOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewBill}>Cancel</Button>
          <Button onClick={handleSaveBill} variant="contained" color="primary">Add Bill</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
