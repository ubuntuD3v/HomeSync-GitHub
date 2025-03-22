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
  Badge,
  Paper,
  Switch,
  FormControlLabel
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Layout from '../components/Layout';

// Sample data for chores
const chores = [
  { 
    id: 1, 
    title: 'Clean kitchen', 
    description: 'Wipe counters, clean sink, sweep floor',
    frequency: 'Daily',
    points: 10,
    assignedTo: 'Sarah Miller',
    status: 'Pending',
    dueDate: '2025-03-23'
  },
  { 
    id: 2, 
    title: 'Take out trash', 
    description: 'Empty all trash bins and take to curb',
    frequency: 'Daily',
    points: 5,
    assignedTo: 'John Smith',
    status: 'Completed',
    dueDate: '2025-03-22'
  },
  { 
    id: 3, 
    title: 'Vacuum living room', 
    description: 'Vacuum carpet and furniture',
    frequency: 'Weekly',
    points: 15,
    assignedTo: 'Mike Johnson',
    status: 'Pending',
    dueDate: '2025-03-25'
  },
  { 
    id: 4, 
    title: 'Clean bathroom', 
    description: 'Clean toilet, sink, shower, and floor',
    frequency: 'Weekly',
    points: 20,
    assignedTo: 'Emily Wilson',
    status: 'Pending',
    dueDate: '2025-03-24'
  },
  { 
    id: 5, 
    title: 'Mow lawn', 
    description: 'Mow front and back yard',
    frequency: 'Bi-weekly',
    points: 25,
    assignedTo: 'John Smith',
    status: 'Pending',
    dueDate: '2025-03-26'
  },
];

// Sample household members
const householdMembers = [
  { 
    id: 1, 
    name: 'John Smith', 
    points: 85, 
    completedChores: 8, 
    pendingChores: 2,
    streak: 5
  },
  { 
    id: 2, 
    name: 'Sarah Miller', 
    points: 120, 
    completedChores: 12, 
    pendingChores: 1,
    streak: 7
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    points: 65, 
    completedChores: 6, 
    pendingChores: 3,
    streak: 3
  },
  { 
    id: 4, 
    name: 'Emily Wilson', 
    points: 95, 
    completedChores: 9, 
    pendingChores: 2,
    streak: 4
  },
];

// Sample rewards
const rewards = [
  { id: 1, name: 'Movie Night Pick', points: 50, claimed: false },
  { id: 2, name: 'Restaurant Choice', points: 100, claimed: false },
  { id: 3, name: 'Day Off Chores', points: 150, claimed: false },
  { id: 4, name: '$10 Gift Card', points: 200, claimed: false },
];

// Sample frequencies
const frequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'One-time'];

export default function ChoreDelegation() {
  const [tabValue, setTabValue] = useState(0);
  const [openNewChore, setOpenNewChore] = useState(false);
  const [openNewReward, setOpenNewReward] = useState(false);
  const [newChore, setNewChore] = useState({
    title: '',
    description: '',
    frequency: 'Weekly',
    points: 10,
    assignedTo: '',
    dueDate: null
  });
  const [newReward, setNewReward] = useState({
    name: '',
    points: 50,
    description: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenNewChore = () => {
    setOpenNewChore(true);
  };

  const handleCloseNewChore = () => {
    setOpenNewChore(false);
  };

  const handleOpenNewReward = () => {
    setOpenNewReward(true);
  };

  const handleCloseNewReward = () => {
    setOpenNewReward(false);
  };

  const handleNewChoreChange = (prop) => (event) => {
    setNewChore({ ...newChore, [prop]: event.target.value });
  };

  const handleNewRewardChange = (prop) => (event) => {
    setNewReward({ ...newReward, [prop]: event.target.value });
  };

  const handleSaveChore = () => {
    // Here you would typically save the chore to your backend
    console.log('Saving chore:', newChore);
    handleCloseNewChore();
  };

  const handleSaveReward = () => {
    // Here you would typically save the reward to your backend
    console.log('Saving reward:', newReward);
    handleCloseNewReward();
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chore Delegation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Assign, track, and reward household chores
        </Typography>
      </Box>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="chore delegation tabs">
            <Tab label="Chores" />
            <Tab label="Leaderboard" />
            <Tab label="Rewards" />
          </Tabs>
        </Box>

        {/* Chores Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Household Chores</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={handleOpenNewChore}
            >
              Add Chore
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <List>
                    {chores.map((chore) => (
                      <React.Fragment key={chore.id}>
                        <ListItem>
                          <ListItemIcon>
                            <CleaningServicesIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1">{chore.title}</Typography>
                                <Chip 
                                  label={`${chore.points} pts`} 
                                  size="small" 
                                  color="primary"
                                  sx={{ ml: 1 }}
                                />
                              </Box>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography variant="body2" component="span">{chore.description}</Typography>
                                <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                                  <Typography variant="caption" component="span">Due: {new Date(chore.dueDate).toLocaleDateString()}</Typography>
                                  <Typography variant="caption" component="span">Frequency: {chore.frequency}</Typography>
                                  <Typography variant="caption" component="span">Assigned to: {chore.assignedTo}</Typography>
                                </Box>
                              </React.Fragment>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="complete" color={chore.status === 'Completed' ? 'success' : 'default'}>
                              <CheckCircleIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {chore.id !== chores.length && <Divider variant="inset" component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title="Chore Assignment"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <List>
                    {householdMembers.map((member) => (
                      <ListItem key={member.id}>
                        <ListItemIcon>
                          <Badge badgeContent={member.pendingChores} color="error">
                            <Avatar sx={{ bgcolor: 'primary.light' }}>
                              {getInitials(member.name)}
                            </Avatar>
                          </Badge>
                        </ListItemIcon>
                        <ListItemText
                          primary={member.name}
                          secondary={`${member.completedChores} completed, ${member.pendingChores} pending`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ mt: 3 }}>
                <CardHeader
                  title="Gamification Settings"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable point system"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Show leaderboard"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable rewards"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Send notifications"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Leaderboard Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Household Leaderboard</Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <List>
                    {[...householdMembers].sort((a, b) => b.points - a.points).map((member, index) => (
                      <ListItem key={member.id}>
                        <ListItemIcon>
                          {index === 0 ? (
                            <Avatar sx={{ bgcolor: 'gold' }}>
                              <EmojiEventsIcon />
                            </Avatar>
                          ) : (
                            <Avatar sx={{ bgcolor: index === 1 ? 'silver' : index === 2 ? '#cd7f32' : 'primary.light' }}>
                              {index + 1}
                            </Avatar>
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body1">{member.name}</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                <StarIcon sx={{ color: 'gold', fontSize: 16 }} />
                                <Typography variant="body2" sx={{ ml: 0.5 }}>{member.streak} day streak</Typography>
                              </Box>
                            </Box>
                          }
                          secondary={`${member.completedChores} chores completed`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h6" color="primary.main">{member.points}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>pts</Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title="Weekly Progress"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  {householdMembers.map((member) => (
                    <Box key={member.id} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{member.name}</Typography>
                        <Typography variant="body2">{member.completedChores}/{member.completedChores + member.pendingChores} chores</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(member.completedChores / (member.completedChores + member.pendingChores)) * 100} 
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
                  ))}
                </CardContent>
              </Card>

              <Card sx={{ mt: 3 }}>
                <CardHeader
                  title="Achievements"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Chip icon={<StarIcon />} label="5 Day Streak" color="primary" variant="outlined" />
                    <Chip icon={<StarIcon />} label="10 Chores Completed" color="primary" variant="outlined" />
                    <Chip icon={<StarIcon />} label="First Reward Claimed" color="primary" variant="outlined" />
                    <Chip icon={<StarIcon />} label="100 Points Earned" color="primary" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Rewards Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Rewards Marketplace</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={handleOpenNewReward}
            >
              Add Reward
            </Button>
          </Box>

          <Grid container spacing={3}>
            {rewards.map((reward) => (
              <Grid item xs={12} sm={6} md={3} key={reward.id}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 100, 
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <EmojiEventsIcon sx={{ fontSize: 40 }} />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{reward.name}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip label={`${reward.points} points`} color="primary" />
                      <Typography variant="body2" color={reward.claimed ? 'error.main' : 'success.main'}>
                        {reward.claimed ? 'Claimed' : 'Available'}
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      disabled={reward.claimed}
                    >
                      {reward.claimed ? 'Claimed' : 'Redeem'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>

      {/* Add Chore Dialog */}
      <Dialog open={openNewChore} onClose={handleCloseNewChore} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Chore</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Chore Title"
              variant="outlined"
              value={newChore.title}
              onChange={handleNewChoreChange('title')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={newChore.description}
              onChange={handleNewChoreChange('description')}
              margin="normal"
              multiline
              rows={3}
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    value={newChore.frequency}
                    label="Frequency"
                    onChange={handleNewChoreChange('frequency')}
                  >
                    {frequencies.map((frequency) => (
                      <MenuItem key={frequency} value={frequency}>{frequency}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Points"
                  type="number"
                  variant="outlined"
                  value={newChore.points}
                  onChange={handleNewChoreChange('points')}
                  margin="normal"
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <InputLabel>Assign To</InputLabel>
              <Select
                value={newChore.assignedTo}
                label="Assign To"
                onChange={handleNewChoreChange('assignedTo')}
              >
                {householdMembers.map((member) => (
                  <MenuItem key={member.id} value={member.name}>{member.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewChore}>Cancel</Button>
          <Button onClick={handleSaveChore} variant="contained" color="primary">Add Chore</Button>
        </DialogActions>
      </Dialog>

      {/* Add Reward Dialog */}
      <Dialog open={openNewReward} onClose={handleCloseNewReward} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Reward</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Reward Name"
              variant="outlined"
              value={newReward.name}
              onChange={handleNewRewardChange('name')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={newReward.description}
              onChange={handleNewRewardChange('description')}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Points Required"
              type="number"
              variant="outlined"
              value={newReward.points}
              onChange={handleNewRewardChange('points')}
              margin="normal"
              InputProps={{ inputProps: { min: 1 } }}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewReward}>Cancel</Button>
          <Button onClick={handleSaveReward} variant="contained" color="primary">Add Reward</Button>
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
