import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Divider,
  Button,
  LinearProgress,
  Chip
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import HandymanIcon from '@mui/icons-material/Handyman';
import Layout from '../components/Layout';

// Sample data for dashboard
const upcomingTasks = [
  { id: 1, title: 'Take out trash', dueDate: 'Today', priority: 'High', completed: false },
  { id: 2, title: 'Pay electricity bill', dueDate: 'Tomorrow', priority: 'High', completed: false },
  { id: 3, title: 'Clean kitchen', dueDate: 'Mar 24', priority: 'Medium', completed: false },
  { id: 4, title: 'Mow the lawn', dueDate: 'Mar 25', priority: 'Low', completed: false },
];

const groceryItems = [
  { id: 1, name: 'Milk', quantity: '1 gallon' },
  { id: 2, name: 'Eggs', quantity: '1 dozen' },
  { id: 3, name: 'Bread', quantity: '1 loaf' },
  { id: 4, name: 'Apples', quantity: '6' },
];

const upcomingBills = [
  { id: 1, name: 'Electricity', amount: '$120.45', dueDate: 'Mar 25, 2025', status: 'pending' },
  { id: 2, name: 'Internet', amount: '$65.99', dueDate: 'Mar 28, 2025', status: 'pending' },
  { id: 3, name: 'Rent', amount: '$1,450.00', dueDate: 'Apr 1, 2025', status: 'pending' },
];

const maintenanceAlerts = [
  { id: 1, name: 'HVAC Service', description: 'Annual maintenance overdue', priority: 'high' },
  { id: 2, name: 'Dishwasher Filter', description: 'Clean filter in 2 weeks', priority: 'medium' },
  { id: 3, name: 'Refrigerator', description: 'Replace water filter in 2 months', priority: 'low' },
];

const householdStats = [
  { name: 'Tasks Completed', value: 12, total: 15, color: '#4A90E2' },
  { name: 'Chores Assigned', value: 8, total: 10, color: '#6FCF97' },
  { name: 'Budget Used', value: 3845, total: 5200, color: '#F2994A' },
];

export default function Dashboard() {
  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, John
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening in your household today
        </Typography>
      </Box>

      {/* Household Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {householdStats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.name}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {stat.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {stat.name === 'Budget Used' ? `$${stat.value.toLocaleString()}` : stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.name === 'Budget Used' ? `$${stat.total.toLocaleString()}` : stat.total}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(stat.value / stat.total) * 100} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#E0E4E9',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: stat.color,
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Upcoming Tasks */}
        <Grid item xs={12} md={6}>
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
                {upcomingTasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="complete">
                          <CheckCircleIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <EventIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        secondary={`Due: ${task.dueDate} • Priority: ${task.priority}`}
                      />
                    </ListItem>
                    {task.id !== upcomingTasks.length && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" color="primary">View All Tasks</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Grocery List */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Grocery List"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <List>
                {groceryItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      secondaryAction={
                        <Typography variant="body2" color="text.secondary">
                          {item.quantity}
                        </Typography>
                      }
                    >
                      <ListItemIcon>
                        <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                      />
                    </ListItem>
                    {item.id !== groceryItems.length && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" color="primary">View Full List</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Bills */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Upcoming Bills"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <List>
                {upcomingBills.map((bill) => (
                  <React.Fragment key={bill.id}>
                    <ListItem
                      secondaryAction={
                        <Button size="small" variant="contained" color="primary">
                          Pay
                        </Button>
                      }
                    >
                      <ListItemIcon>
                        <PaymentIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${bill.name} - ${bill.amount}`}
                        secondary={`Due: ${bill.dueDate}`}
                      />
                    </ListItem>
                    {bill.id !== upcomingBills.length && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" color="primary">View All Bills</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance Alerts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Maintenance Alerts"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <List>
                {maintenanceAlerts.map((alert) => (
                  <React.Fragment key={alert.id}>
                    <ListItem
                      secondaryAction={
                        <Chip 
                          label={alert.priority} 
                          size="small"
                          color={
                            alert.priority === 'high' ? 'error' : 
                            alert.priority === 'medium' ? 'warning' : 'success'
                          }
                        />
                      }
                    >
                      <ListItemIcon>
                        <HandymanIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={alert.name}
                        secondary={alert.description}
                      />
                    </ListItem>
                    {alert.id !== maintenanceAlerts.length && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" color="primary">View All Maintenance</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
