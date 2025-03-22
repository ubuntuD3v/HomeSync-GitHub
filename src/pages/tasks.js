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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Layout from '../components/Layout';

// Sample data for tasks
const tasks = [
  { 
    id: 1, 
    title: 'Take out trash', 
    description: 'Empty all trash bins and take to curb for collection',
    dueDate: '2025-03-23', 
    priority: 'High', 
    category: 'Household',
    assignedTo: 'John Smith',
    status: 'Pending',
    recurring: 'Weekly'
  },
  { 
    id: 2, 
    title: 'Pay electricity bill', 
    description: 'Pay monthly electricity bill online',
    dueDate: '2025-03-24', 
    priority: 'High', 
    category: 'Finance',
    assignedTo: 'John Smith',
    status: 'Pending',
    recurring: 'Monthly'
  },
  { 
    id: 3, 
    title: 'Clean kitchen', 
    description: 'Deep clean kitchen including appliances',
    dueDate: '2025-03-25', 
    priority: 'Medium', 
    category: 'Household',
    assignedTo: 'Sarah Miller',
    status: 'Pending',
    recurring: 'Weekly'
  },
  { 
    id: 4, 
    title: 'Mow the lawn', 
    description: 'Mow front and back yard',
    dueDate: '2025-03-26', 
    priority: 'Low', 
    category: 'Outdoor',
    assignedTo: 'Mike Johnson',
    status: 'Pending',
    recurring: 'Bi-weekly'
  },
  { 
    id: 5, 
    title: 'Schedule dentist appointment', 
    description: 'Call dentist to schedule annual checkup',
    dueDate: '2025-03-27', 
    priority: 'Medium', 
    category: 'Health',
    assignedTo: 'John Smith',
    status: 'Pending',
    recurring: 'None'
  },
];

// Sample household members
const householdMembers = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sarah Miller' },
  { id: 3, name: 'Mike Johnson' },
  { id: 4, name: 'Emily Wilson' },
];

// Sample categories
const categories = [
  'Household', 'Finance', 'Health', 'Outdoor', 'Shopping', 'Work', 'Other'
];

// Sample priorities
const priorities = ['Low', 'Medium', 'High'];

// Sample recurring options
const recurringOptions = ['None', 'Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Yearly'];

export default function TaskScheduler() {
  const [tabValue, setTabValue] = useState(0);
  const [openNewTask, setOpenNewTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: null,
    priority: 'Medium',
    category: 'Household',
    assignedTo: '',
    recurring: 'None'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenNewTask = () => {
    setOpenNewTask(true);
  };

  const handleCloseNewTask = () => {
    setOpenNewTask(false);
  };

  const handleNewTaskChange = (prop) => (event) => {
    setNewTask({ ...newTask, [prop]: event.target.value });
  };

  const handleDateChange = (date) => {
    setNewTask({ ...newTask, dueDate: date });
  };

  const handleSaveTask = () => {
    // Here you would typically save the task to your backend
    console.log('Saving task:', newTask);
    handleCloseNewTask();
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

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Task Scheduler
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenNewTask}
          >
            Add New Task
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage and prioritize your household tasks
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="task tabs">
            <Tab label="All Tasks" />
            <Tab label="My Tasks" />
            <Tab label="Upcoming" />
            <Tab label="Completed" />
          </Tabs>
        </Box>
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
              placeholder="Search tasks..."
              variant="outlined"
            />
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }} aria-label="tasks table">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Recurring</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box>
                      <Typography variant="body1">{task.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={task.priority} 
                      size="small"
                      color={getPriorityColor(task.priority)}
                    />
                  </TableCell>
                  <TableCell>{task.category}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{task.recurring}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" color="primary">
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Task Categories"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category) => (
                  <Chip 
                    key={category} 
                    label={category} 
                    onClick={() => {}} 
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Household Members"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {householdMembers.map((member) => (
                  <Box 
                    key={member.id} 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      p: 1,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: '50%', 
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Box>
                    <Typography variant="body2">{member.name}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* New Task Dialog */}
      <Dialog open={openNewTask} onClose={handleCloseNewTask} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Task Title"
              variant="outlined"
              value={newTask.title}
              onChange={handleNewTaskChange('title')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={newTask.description}
              onChange={handleNewTaskChange('description')}
              margin="normal"
              multiline
              rows={3}
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due Date"
                    value={newTask.dueDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={newTask.priority}
                    label="Priority"
                    onChange={handleNewTaskChange('priority')}
                  >
                    {priorities.map((priority) => (
                      <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newTask.category}
                    label="Category"
                    onChange={handleNewTaskChange('category')}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Assign To</InputLabel>
                  <Select
                    value={newTask.assignedTo}
                    label="Assign To"
                    onChange={handleNewTaskChange('assignedTo')}
                  >
                    {householdMembers.map((member) => (
                      <MenuItem key={member.id} value={member.name}>{member.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <InputLabel>Recurring</InputLabel>
              <Select
                value={newTask.recurring}
                label="Recurring"
                onChange={handleNewTaskChange('recurring')}
              >
                {recurringOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label="Send notification reminders"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewTask}>Cancel</Button>
          <Button onClick={handleSaveTask} variant="contained" color="primary">Save Task</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
