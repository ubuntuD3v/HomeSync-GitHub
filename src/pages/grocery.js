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
  Checkbox,
  FormControlLabel,
  Paper
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Layout from '../components/Layout';

// Sample data for grocery items
const groceryItems = [
  { id: 1, name: 'Milk', quantity: '1 gallon', category: 'Dairy', checked: false },
  { id: 2, name: 'Eggs', quantity: '1 dozen', category: 'Dairy', checked: false },
  { id: 3, name: 'Bread', quantity: '1 loaf', category: 'Bakery', checked: false },
  { id: 4, name: 'Apples', quantity: '6', category: 'Produce', checked: false },
  { id: 5, name: 'Chicken Breast', quantity: '2 lbs', category: 'Meat', checked: false },
  { id: 6, name: 'Pasta', quantity: '1 box', category: 'Dry Goods', checked: false },
  { id: 7, name: 'Tomato Sauce', quantity: '1 jar', category: 'Canned Goods', checked: false },
  { id: 8, name: 'Cereal', quantity: '1 box', category: 'Breakfast', checked: false },
];

// Sample data for meal plans
const mealPlans = [
  { 
    id: 1, 
    day: 'Monday', 
    breakfast: 'Oatmeal with fruit',
    lunch: 'Chicken salad sandwich',
    dinner: 'Spaghetti with tomato sauce',
    snacks: 'Yogurt, Apple'
  },
  { 
    id: 2, 
    day: 'Tuesday', 
    breakfast: 'Scrambled eggs and toast',
    lunch: 'Tuna wrap',
    dinner: 'Grilled chicken with vegetables',
    snacks: 'Hummus with carrots, Granola bar'
  },
  { 
    id: 3, 
    day: 'Wednesday', 
    breakfast: 'Smoothie bowl',
    lunch: 'Quinoa salad',
    dinner: 'Stir-fry with rice',
    snacks: 'Mixed nuts, Orange'
  },
  { 
    id: 4, 
    day: 'Thursday', 
    breakfast: 'Avocado toast',
    lunch: 'Vegetable soup with bread',
    dinner: 'Baked salmon with potatoes',
    snacks: 'Greek yogurt, Banana'
  },
  { 
    id: 5, 
    day: 'Friday', 
    breakfast: 'Cereal with milk',
    lunch: 'Grilled cheese sandwich',
    dinner: 'Homemade pizza',
    snacks: 'Popcorn, Apple slices with peanut butter'
  },
  { 
    id: 6, 
    day: 'Saturday', 
    breakfast: 'Pancakes with syrup',
    lunch: 'Leftovers',
    dinner: 'Tacos',
    snacks: 'Trail mix, Peach'
  },
  { 
    id: 7, 
    day: 'Sunday', 
    breakfast: 'French toast',
    lunch: 'Pasta salad',
    dinner: 'Roast chicken with vegetables',
    snacks: 'Cheese and crackers, Grapes'
  },
];

// Sample data for recipes
const recipes = [
  { id: 1, name: 'Spaghetti Bolognese', prepTime: '30 mins', cookTime: '45 mins', servings: 4, difficulty: 'Easy' },
  { id: 2, name: 'Chicken Stir-Fry', prepTime: '15 mins', cookTime: '15 mins', servings: 2, difficulty: 'Easy' },
  { id: 3, name: 'Vegetable Lasagna', prepTime: '45 mins', cookTime: '60 mins', servings: 6, difficulty: 'Medium' },
  { id: 4, name: 'Grilled Salmon', prepTime: '10 mins', cookTime: '15 mins', servings: 2, difficulty: 'Easy' },
];

// Sample grocery categories
const groceryCategories = [
  'Produce', 'Dairy', 'Meat', 'Bakery', 'Frozen', 'Canned Goods', 'Dry Goods', 'Snacks', 'Beverages', 'Household', 'Other'
];

export default function GroceryMealPlanning() {
  const [tabValue, setTabValue] = useState(0);
  const [openNewItem, setOpenNewItem] = useState(false);
  const [openNewMeal, setOpenNewMeal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: 'Produce',
  });
  const [newMeal, setNewMeal] = useState({
    day: 'Monday',
    breakfast: '',
    lunch: '',
    dinner: '',
    snacks: ''
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenNewItem = () => {
    setOpenNewItem(true);
  };

  const handleCloseNewItem = () => {
    setOpenNewItem(false);
  };

  const handleOpenNewMeal = () => {
    setOpenNewMeal(true);
  };

  const handleCloseNewMeal = () => {
    setOpenNewMeal(false);
  };

  const handleNewItemChange = (prop) => (event) => {
    setNewItem({ ...newItem, [prop]: event.target.value });
  };

  const handleNewMealChange = (prop) => (event) => {
    setNewMeal({ ...newMeal, [prop]: event.target.value });
  };

  const handleSaveItem = () => {
    // Here you would typically save the item to your backend
    console.log('Saving item:', newItem);
    handleCloseNewItem();
  };

  const handleSaveMeal = () => {
    // Here you would typically save the meal to your backend
    console.log('Saving meal:', newMeal);
    handleCloseNewMeal();
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Grocery & Meal Planning
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your grocery list and plan your meals
        </Typography>
      </Box>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="grocery and meal tabs">
            <Tab label="Grocery List" />
            <Tab label="Meal Plan" />
            <Tab label="Recipes" />
          </Tabs>
        </Box>

        {/* Grocery List Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Shopping List</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={handleOpenNewItem}
            >
              Add Item
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <List>
                    {groceryItems.map((item) => (
                      <React.Fragment key={item.id}>
                        <ListItem>
                          <ListItemIcon>
                            <Checkbox edge="start" checked={item.checked} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.name}
                            secondary={`${item.quantity} • ${item.category}`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" size="small">
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" size="small">
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {item.id !== groceryItems.length && <Divider variant="inset" component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader
                  title="Categories"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {groceryCategories.map((category) => (
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

              <Card sx={{ mt: 3 }}>
                <CardHeader
                  title="Shopping Tips"
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography variant="body2" paragraph>
                    • Shop with a list to avoid impulse purchases
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Check your pantry before shopping to avoid duplicates
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Buy in-season produce for better prices and quality
                  </Typography>
                  <Typography variant="body2">
                    • Compare unit prices to get the best value
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Meal Plan Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Weekly Meal Plan</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={handleOpenNewMeal}
            >
              Update Meal
            </Button>
          </Box>

          <Grid container spacing={2}>
            {mealPlans.map((meal) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={meal.id}>
                <Card>
                  <CardHeader
                    title={meal.day}
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary">Breakfast</Typography>
                      <Typography variant="body2">{meal.breakfast}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary">Lunch</Typography>
                      <Typography variant="body2">{meal.lunch}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="primary">Dinner</Typography>
                      <Typography variant="body2">{meal.dinner}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="primary">Snacks</Typography>
                      <Typography variant="body2">{meal.snacks}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Recipes Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Favorite Recipes</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
            >
              Add Recipe
            </Button>
          </Box>

          <Grid container spacing={3}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 140, 
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <RestaurantIcon sx={{ fontSize: 40 }} />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{recipe.name}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Prep: {recipe.prepTime}</Typography>
                      <Typography variant="body2" color="text.secondary">Cook: {recipe.cookTime}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Servings: {recipe.servings}</Typography>
                      <Chip size="small" label={recipe.difficulty} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>

      {/* Add Grocery Item Dialog */}
      <Dialog open={openNewItem} onClose={handleCloseNewItem} maxWidth="sm" fullWidth>
        <DialogTitle>Add Grocery Item</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Item Name"
              variant="outlined"
              value={newItem.name}
              onChange={handleNewItemChange('name')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Quantity"
              variant="outlined"
              value={newItem.quantity}
              onChange={handleNewItemChange('quantity')}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={newItem.category}
                label="Category"
                onChange={handleNewItemChange('category')}
              >
                {groceryCategories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label="Add to recurring items"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewItem}>Cancel</Button>
          <Button onClick={handleSaveItem} variant="contained" color="primary">Add Item</Button>
        </DialogActions>
      </Dialog>

      {/* Update Meal Dialog */}
      <Dialog open={openNewMeal} onClose={handleCloseNewMeal} maxWidth="sm" fullWidth>
        <DialogTitle>Update Meal Plan</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Day</InputLabel>
              <Select
                value={newMeal.day}
                label="Day"
                onChange={handleNewMealChange('day')}
              >
                {mealPlans.map((meal) => (
                  <MenuItem key={meal.day} value={meal.day}>{meal.day}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Breakfast"
              variant="outlined"
              value={newMeal.breakfast}
              onChange={handleNewMealChange('breakfast')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Lunch"
              variant="outlined"
              value={newMeal.lunch}
              onChange={handleNewMealChange('lunch')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Dinner"
              variant="outlined"
              value={newMeal.dinner}
              onChange={handleNewMealChange('dinner')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Snacks"
              variant="outlined"
              value={newMeal.snacks}
              onChange={handleNewMealChange('snacks')}
              margin="normal"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Add ingredients to grocery list"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewMeal}>Cancel</Button>
          <Button onClick={handleSaveMeal} variant="contained" color="primary">Update Meal</Button>
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
