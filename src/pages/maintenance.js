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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
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
  Avatar,
  Badge
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import HandymanIcon from '@mui/icons-material/Handyman';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HistoryIcon from '@mui/icons-material/History';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import Layout from '../components/Layout';

// Sample data for appliances
const appliances = [
  { 
    id: 1, 
    name: 'Refrigerator', 
    brand: 'Samsung',
    model: 'RF28R7351SG',
    purchaseDate: '2023-01-15', 
    warrantyExpiry: '2028-01-15',
    status: 'Good Condition',
    nextMaintenance: 'Filter replacement in 2 months',
    location: 'Kitchen'
  },
  { 
    id: 2, 
    name: 'Washing Machine', 
    brand: 'LG',
    model: 'WM3600HWA',
    purchaseDate: '2022-03-05', 
    warrantyExpiry: '2025-03-05',
    status: 'Needs Attention',
    nextMaintenance: 'Making unusual noise during spin cycle',
    location: 'Laundry Room'
  },
  { 
    id: 3, 
    name: 'Dishwasher', 
    brand: 'Bosch',
    model: 'SHEM63W55N',
    purchaseDate: '2023-11-20', 
    warrantyExpiry: '2026-11-20',
    status: 'Good Condition',
    nextMaintenance: 'Clean filter in 2 weeks',
    location: 'Kitchen'
  },
  { 
    id: 4, 
    name: 'HVAC System', 
    brand: 'Carrier',
    model: 'Infinity 24ANB1',
    purchaseDate: '2020-06-10', 
    warrantyExpiry: '2022-06-10',
    status: 'Service Required',
    nextMaintenance: 'Annual maintenance overdue by 2 months',
    location: 'Whole House'
  },
  { 
    id: 5, 
    name: 'Oven', 
    brand: 'GE',
    model: 'JB750SJSS',
    purchaseDate: '2021-08-03', 
    warrantyExpiry: '2023-08-03',
    status: 'Good Condition',
    nextMaintenance: 'No maintenance needed at this time',
    location: 'Kitchen'
  },
];

// Sample maintenance schedule
const maintenanceSchedule = [
  { 
    id: 1, 
    appliance: 'Dishwasher', 
    task: 'Filter Cleaning',
    date: '2025-04-05', 
    estimatedTime: '30 min',
    priority: 'Medium',
    status: 'Scheduled'
  },
  { 
    id: 2, 
    appliance: 'HVAC System', 
    task: 'Annual Service',
    date: '2025-04-15', 
    estimatedTime: '2 hours',
    provider: 'Cool Air Inc.',
    priority: 'High',
    status: 'Scheduled'
  },
  { 
    id: 3, 
    appliance: 'Refrigerator', 
    task: 'Filter Replacement',
    date: '2025-05-22', 
    estimatedTime: '15 min',
    estimatedCost: '$45',
    priority: 'Medium',
    status: 'Scheduled'
  },
];

// Sample maintenance history
const maintenanceHistory = [
  { 
    id: 1, 
    date: '2025-03-15', 
    appliance: 'Washing Machine',
    task: 'Repair',
    description: 'Replaced drive belt and fixed water leak issue.',
    cost: 150,
    provider: 'Quick Fix Appliance Repair'
  },
  { 
    id: 2, 
    date: '2025-02-28', 
    appliance: 'HVAC System',
    task: 'Filter Replacement',
    description: 'Replaced air filters and cleaned vents.',
    cost: 45,
    provider: 'DIY'
  },
  { 
    id: 3, 
    date: '2025-01-10', 
    appliance: 'Refrigerator',
    task: 'Maintenance',
    description: 'Cleaned coils and replaced water filter.',
    cost: 85,
    provider: 'Cool Tech Services'
  },
];

// Sample service providers
const serviceProviders = [
  { 
    id: 1, 
    name: 'Quick Fix Appliance Repair', 
    specialty: 'Appliance Repair',
    rating: 4.7,
    phone: '555-123-4567',
    email: 'info@quickfixappliance.com'
  },
  { 
    id: 2, 
    name: 'Cool Air Inc.', 
    specialty: 'HVAC Services',
    rating: 4.9,
    phone: '555-987-6543',
    email: 'service@coolair.com'
  },
  { 
    id: 3, 
    name: 'Elite Plumbing', 
    specialty: 'Plumbing Services',
    rating: 4.5,
    phone: '555-456-7890',
    email: 'support@eliteplumbing.com'
  },
];

// Sample locations
const locations = ['Kitchen', 'Bathroom', 'Bedroom', 'Living Room', 'Laundry Room', 'Garage', 'Basement', 'Whole House'];

// Sample status options
const statusOptions = ['Good Condition', 'Needs Attention', 'Service Required', 'Out of Order'];

export default function HomeMaintenance() {
  const [tabValue, setTabValue] = useState(0);
  const [openNewAppliance, setOpenNewAppliance] = useState(false);
  const [openScheduleService, setOpenScheduleService] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [newAppliance, setNewAppliance] = useState({
    name: '',
    brand: '',
    model: '',
    purchaseDate: null,
    warrantyExpiry: null,
    status: 'Good Condition',
    location: 'Kitchen'
  });
  const [newService, setNewService] = useState({
    appliance: '',
    task: '',
    date: null,
    provider: '',
    estimatedCost: '',
    notes: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenNewAppliance = () => {
    setOpenNewAppliance(true);
  };

  const handleCloseNewAppliance = () => {
    setOpenNewAppliance(false);
  };

  const handleOpenScheduleService = (appliance) => {
    setSelectedAppliance(appliance);
    setNewService({
      ...newService,
      appliance: appliance.name
    });
    setOpenScheduleService(true);
  };

  const handleCloseScheduleService = () => {
    setOpenScheduleService(false);
  };

  const handleNewApplianceChange = (prop) => (event) => {
    setNewAppliance({ ...newAppliance, [prop]: event.target.value });
  };

  const handleNewServiceChange = (prop) => (event) => {
    setNewService({ ...newService, [prop]: event.target.value });
  };

  const handlePurchaseDateChange = (date) => {
    setNewAppliance({ ...newAppliance, purchaseDate: date });
  };

  const handleWarrantyExpiryChange = (date) => {
    setNewAppliance({ ...newAppliance, warrantyExpiry: date });
  };

  const handleServiceDateChange = (date) => {
    setNewService({ ...newService, date: date });
  };

  const handleSaveAppliance = () => {
    // Here you would typically save the appliance to your backend
    console.log('Saving appliance:', newAppliance);
    handleCloseNewAppliance();
  };

  const handleSaveService = () => {
    // Here you would typically save the service to your backend
    console.log('Scheduling service:', newService);
    handleCloseScheduleService();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good Condition':
        return 'success';
      case 'Needs Attention':
        return 'warning';
      case 'Service Required':
      case 'Out of Order':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getWarrantyStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const monthsRemaining = (expiry.getFullYear() - today.getFullYear()) * 12 + 
                           (expiry.getMonth() - today.getMonth());
    
    if (monthsRemaining < 0) {
      return { status: 'Expired', color: 'error' };
    } else if (monthsRemaining < 3) {
      return { status: 'Expiring Soon', color: 'warning' };
    } else {
      return { status: 'Active', color: 'success' };
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Home Maintenance
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenNewAppliance}
          >
            Add Appliance
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Track appliances, schedule maintenance, and manage warranties
        </Typography>
      </Box>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="home maintenance tabs">
            <Tab label="Appliances" />
            <Tab label="Maintenance Schedule" />
            <Tab label="Warranties" />
            <Tab label="Service History" />
          </Tabs>
        </Box>

        {/* Appliances Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader
                  title="Household Appliances"
                  action={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small">Filter</Button>
                      <Button variant="outlined" size="small">Sort</Button>
                    </Box>
                  }
                />
                <CardContent>
                  <List>
                    {appliances.map((appliance) => (
                      <React.Fragment key={appliance.id}>
                        <ListItem>
                          <ListItemIcon>
                            <Box 
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                borderRadius: 1, 
                                backgroundColor: 'primary.light',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                              }}
                            >
                              {appliance.name.charAt(0)}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1">{appliance.name}</Typography>
                                <Chip 
                                  label={appliance.status} 
                                  size="small" 
                                  color={getStatusColor(appliance.status)}
                                  sx={{ ml: 1 }}
                                />
                              </Box>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography variant="body2" component="span">
                                  Brand: {appliance.brand} • Model: {appliance.model} • Location: {appliance.location}
                                </Typography>
                                <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                                  {appliance.nextMaintenance}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          <ListItemSecondaryAction>
                            {appliance.status === 'Needs Attention' || appliance.status === 'Service Required' ? (
                              <Button 
                                variant="contained" 
                                color="primary" 
                                size="small"
                                onClick={() => handleOpenScheduleService(appliance)}
                              >
                                Schedule Service
                              </Button>
                            ) : (
                              <Button 
                                variant="outlined" 
                                color="primary" 
                                size="small"
                              >
                                Details
                              </Button>
                            )}
                          </ListItemSecondaryAction>
                        </ListItem>
                        {appliance.id !== appliances.length && <Divider variant="inset" component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title="Upcoming Maintenance"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <List>
                    {maintenanceSchedule.map((maintenance) => (
                      <React.Fragment key={maintenance.id}>
                        <ListItem>
                          <ListItemIcon>
                            <Box 
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                borderRadius: 1, 
                                backgroundColor: 'grey.200',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                {new Date(maintenance.date).getDate()}
                              </Typography>
                              <Typography variant="caption">
                                {new Date(maintenance.date).toLocaleString('default', { month: 'short' })}
                              </Typography>
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={`${maintenance.appliance} - ${maintenance.task}`}
                            secondary={
                              <React.Fragment>
                                <Typography variant="caption" component="span">
                                  {maintenance.estimatedTime && `Est. time: ${maintenance.estimatedTime}`}
                                  {maintenance.provider && ` • Provider: ${maintenance.provider}`}
                                  {maintenance.estimatedCost && ` • Est. cost: ${maintenance.estimatedCost}`}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          <Chip 
                            label={maintenance.priority} 
                            size="small" 
                            color={getPriorityColor(maintenance.priority)}
                          />
                        </ListItem>
                        {maintenance.id !== maintenanceSchedule.length && <Divider variant="inset" component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ mt: 3 }}>
                <CardHeader
                  title="Recommended Providers"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <List>
                    {serviceProviders.map((provider) => (
                      <React.Fragment key={provider.id}>
                        <ListItem>
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'secondary.light' }}>
                              {provider.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={provider.name}
                            secondary={
                              <React.Fragment>
                                <Typography variant="body2" component="span">
                                  {provider.specialty}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon 
                                      key={i} 
                                      sx={{ 
                                        fontSize: 16, 
                                        color: i < Math.floor(provider.rating) ? 'gold' : 'grey.300',
                                      }} 
                                    />
                                  ))}
                                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                                    {provider.rating}
                                  </Typography>
                                </Box>
                              </React.Fragment>
                            }
                          />
                          <IconButton edge="end" aria-label="call">
                            <PhoneIcon color="primary" />
                          </IconButton>
                        </ListItem>
                        {provider.id !== serviceProviders.length && <Divider variant="inset" component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Maintenance Schedule Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader
                  title="Maintenance Calendar"
                  action={
                    <Button 
                      variant="contained" 
                      color="primary" 
                      startIcon={<AddIcon />}
                    >
                      Schedule Maintenance
                    </Button>
                  }
                />
                <CardContent>
                  <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      Calendar view would be implemented here
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title="Upcoming Tasks"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <List>
                    {maintenanceSchedule.map((maintenance) => (
                      <React.Fragment key={maintenance.id}>
                        <ListItem>
                          <ListItemIcon>
                            <EventIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${maintenance.appliance} - ${maintenance.task}`}
                            secondary={`${new Date(maintenance.date).toLocaleDateString()}`}
                          />
                          <Button size="small" variant="outlined">
                            Details
                          </Button>
                        </ListItem>
                        {maintenance.id !== maintenanceSchedule.length && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ mt: 3 }}>
                <CardHeader
                  title="Maintenance Tips"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography variant="body2" paragraph>
                    • Replace HVAC filters every 1-3 months
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Clean refrigerator coils every 6 months
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Check smoke detector batteries twice a year
                  </Typography>
                  <Typography variant="body2">
                    • Clean dishwasher filter monthly for optimal performance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Warranties Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {appliances.map((appliance) => {
              const warrantyStatus = getWarrantyStatus(appliance.warrantyExpiry);
              return (
                <Grid item xs={12} sm={6} md={4} key={appliance.id}>
                  <Card>
                    <CardHeader
                      title={appliance.name}
                      subheader={`${appliance.brand} ${appliance.model}`}
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                    />
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Purchase Date: {new Date(appliance.purchaseDate).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Warranty Status:
                          </Typography>
                          <Chip 
                            label={warrantyStatus.status} 
                            size="small" 
                            color={warrantyStatus.color}
                            sx={{ ml: 1 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Expiry Date: {new Date(appliance.warrantyExpiry).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size="small" variant="outlined">
                          View Details
                        </Button>
                        <Button size="small" variant="outlined">
                          Upload Documents
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>

        {/* Service History Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader
                  title="Maintenance History"
                  action={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small">Filter</Button>
                      <Button variant="outlined" size="small">Export</Button>
                    </Box>
                  }
                />
                <CardContent>
                  <List>
                    {maintenanceHistory.map((history) => (
                      <React.Fragment key={history.id}>
                        <ListItem>
                          <ListItemIcon>
                            <HistoryIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1">{history.appliance} - {history.task}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                  ({new Date(history.date).toLocaleDateString()})
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography variant="body2" component="span">
                                  {history.description}
                                </Typography>
                                <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                                  <Typography variant="caption" component="span">Cost: ${history.cost}</Typography>
                                  <Typography variant="caption" component="span">Provider: {history.provider}</Typography>
                                </Box>
                              </React.Fragment>
                            }
                          />
                          <Button size="small" variant="outlined">
                            Details
                          </Button>
                        </ListItem>
                        {history.id !== maintenanceHistory.length && <Divider variant="inset" component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title="Maintenance Summary"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" gutterBottom>Total Maintenance Cost (YTD)</Typography>
                    <Typography variant="h4" color="primary.main">
                      ${maintenanceHistory.reduce((sum, history) => sum + history.cost, 0)}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" gutterBottom>Maintenance by Appliance</Typography>
                    {Array.from(new Set(maintenanceHistory.map(h => h.appliance))).map((appliance) => {
                      const applianceHistory = maintenanceHistory.filter(h => h.appliance === appliance);
                      const totalCost = applianceHistory.reduce((sum, h) => sum + h.cost, 0);
                      return (
                        <Box key={appliance} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">{appliance}</Typography>
                            <Typography variant="body2">${totalCost}</Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={(totalCost / maintenanceHistory.reduce((sum, h) => sum + h.cost, 0)) * 100} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: '#E0E4E9',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: 'primary.main',
                              }
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                  <Box>
                    <Typography variant="body2" gutterBottom>Most Recent Services</Typography>
                    <List dense>
                      {maintenanceHistory.slice(0, 2).map((history) => (
                        <ListItem key={history.id} disableGutters>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <BuildIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${history.appliance} - ${history.task}`}
                            secondary={new Date(history.date).toLocaleDateString()}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

      {/* Add Appliance Dialog */}
      <Dialog open={openNewAppliance} onClose={handleCloseNewAppliance} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Appliance</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Appliance Name"
              variant="outlined"
              value={newAppliance.name}
              onChange={handleNewApplianceChange('name')}
              margin="normal"
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Brand"
                  variant="outlined"
                  value={newAppliance.brand}
                  onChange={handleNewApplianceChange('brand')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Model"
                  variant="outlined"
                  value={newAppliance.model}
                  onChange={handleNewApplianceChange('model')}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Purchase Date"
                    value={newAppliance.purchaseDate}
                    onChange={handlePurchaseDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Warranty Expiry"
                    value={newAppliance.warrantyExpiry}
                    onChange={handleWarrantyExpiryChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newAppliance.status}
                    label="Status"
                    onChange={handleNewApplianceChange('status')}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Location</InputLabel>
                  <Select
                    value={newAppliance.location}
                    label="Location"
                    onChange={handleNewApplianceChange('location')}
                  >
                    {locations.map((location) => (
                      <MenuItem key={location} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Notes"
              variant="outlined"
              multiline
              rows={3}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewAppliance}>Cancel</Button>
          <Button onClick={handleSaveAppliance} variant="contained" color="primary">Add Appliance</Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Service Dialog */}
      <Dialog open={openScheduleService} onClose={handleCloseScheduleService} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Service</DialogTitle>
        <DialogContent>
          {selectedAppliance && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {selectedAppliance.name} - {selectedAppliance.brand} {selectedAppliance.model}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Issue: {selectedAppliance.nextMaintenance}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TextField
                fullWidth
                label="Service Task"
                variant="outlined"
                value={newService.task}
                onChange={handleNewServiceChange('task')}
                margin="normal"
                required
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Service Date"
                  value={newService.date}
                  onChange={handleServiceDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                />
              </LocalizationProvider>
              <FormControl fullWidth margin="normal">
                <InputLabel>Service Provider</InputLabel>
                <Select
                  value={newService.provider}
                  label="Service Provider"
                  onChange={handleNewServiceChange('provider')}
                >
                  {serviceProviders.map((provider) => (
                    <MenuItem key={provider.id} value={provider.name}>{provider.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Estimated Cost"
                variant="outlined"
                value={newService.estimatedCost}
                onChange={handleNewServiceChange('estimatedCost')}
                margin="normal"
                InputProps={{
                  startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
                }}
              />
              <TextField
                fullWidth
                label="Notes"
                variant="outlined"
                value={newService.notes}
                onChange={handleNewServiceChange('notes')}
                margin="normal"
                multiline
                rows={3}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseScheduleService}>Cancel</Button>
          <Button onClick={handleSaveService} variant="contained" color="primary">Schedule</Button>
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
