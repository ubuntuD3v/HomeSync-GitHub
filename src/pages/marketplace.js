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
  Avatar,
  Rating,
  Paper,
  Badge
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../components/Layout';

// Sample data for marketplace listings
const listings = [
  { 
    id: 1, 
    title: 'Lawn Mowing Service', 
    description: 'Professional lawn mowing service available on weekends. I have my own equipment and can handle yards of any size.',
    category: 'Services',
    subcategory: 'Yard Work',
    price: 30,
    priceType: 'per hour',
    location: 'Local',
    postedBy: 'John Smith',
    postedDate: '2025-03-15',
    status: 'Active',
    image: null,
    rating: 4.8,
    reviewCount: 12
  },
  { 
    id: 2, 
    title: 'Babysitting Services', 
    description: 'Experienced babysitter available evenings and weekends. CPR certified and great with kids of all ages.',
    category: 'Services',
    subcategory: 'Childcare',
    price: 20,
    priceType: 'per hour',
    location: 'Local',
    postedBy: 'Sarah Miller',
    postedDate: '2025-03-18',
    status: 'Active',
    image: null,
    rating: 4.9,
    reviewCount: 24
  },
  { 
    id: 3, 
    title: 'Power Tools for Rent', 
    description: 'Various power tools available for daily or weekly rental. Includes drills, saws, sanders, and more.',
    category: 'Items',
    subcategory: 'Tools',
    price: 15,
    priceType: 'per day',
    location: 'Local',
    postedBy: 'Mike Johnson',
    postedDate: '2025-03-10',
    status: 'Active',
    image: null,
    rating: 4.6,
    reviewCount: 8
  },
  { 
    id: 4, 
    title: 'Homemade Sourdough Bread', 
    description: 'Fresh baked sourdough bread available weekly. Made with organic ingredients and a 5-year-old starter.',
    category: 'Items',
    subcategory: 'Food',
    price: 8,
    priceType: 'per loaf',
    location: 'Local',
    postedBy: 'Emily Wilson',
    postedDate: '2025-03-20',
    status: 'Active',
    image: null,
    rating: 5.0,
    reviewCount: 16
  },
  { 
    id: 5, 
    title: 'Dog Walking Service', 
    description: 'Available to walk dogs during weekdays. Can handle multiple dogs and provide basic training reinforcement.',
    category: 'Services',
    subcategory: 'Pet Care',
    price: 15,
    priceType: 'per walk',
    location: 'Local',
    postedBy: 'David Brown',
    postedDate: '2025-03-12',
    status: 'Active',
    image: null,
    rating: 4.7,
    reviewCount: 9
  },
  { 
    id: 6, 
    title: 'Vegetable Garden Surplus', 
    description: 'Sharing extra vegetables from my garden. Currently have tomatoes, zucchini, and bell peppers available.',
    category: 'Items',
    subcategory: 'Food',
    price: 0,
    priceType: 'free',
    location: 'Local',
    postedBy: 'Lisa Chen',
    postedDate: '2025-03-19',
    status: 'Active',
    image: null,
    rating: 4.9,
    reviewCount: 7
  },
];

// Sample data for community members
const communityMembers = [
  { 
    id: 1, 
    name: 'John Smith', 
    bio: 'Handyman and gardening enthusiast. Happy to help with home repairs and yard work.',
    skills: ['Home Repair', 'Gardening', 'Carpentry'],
    rating: 4.8,
    listingCount: 3,
    memberSince: '2024-06'
  },
  { 
    id: 2, 
    name: 'Sarah Miller', 
    bio: 'Elementary school teacher and certified babysitter. Love working with children of all ages.',
    skills: ['Childcare', 'Tutoring', 'First Aid'],
    rating: 4.9,
    listingCount: 2,
    memberSince: '2024-08'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    bio: 'Retired contractor with a workshop full of tools. Happy to lend tools or offer advice on DIY projects.',
    skills: ['Construction', 'Plumbing', 'Electrical'],
    rating: 4.6,
    listingCount: 5,
    memberSince: '2024-05'
  },
  { 
    id: 4, 
    name: 'Emily Wilson', 
    bio: 'Professional baker who loves sharing homemade treats with the community.',
    skills: ['Baking', 'Cooking', 'Event Planning'],
    rating: 5.0,
    listingCount: 2,
    memberSince: '2024-09'
  },
];

// Sample categories
const categories = [
  { name: 'Services', count: 15 },
  { name: 'Items', count: 23 },
  { name: 'Rideshare', count: 5 },
  { name: 'Events', count: 8 },
  { name: 'Housing', count: 3 },
];

// Sample subcategories
const subcategories = {
  Services: ['Yard Work', 'Childcare', 'Pet Care', 'Home Repair', 'Tutoring', 'Cleaning', 'Other'],
  Items: ['Tools', 'Food', 'Clothing', 'Furniture', 'Electronics', 'Books', 'Other'],
  Rideshare: ['Daily Commute', 'One-time Trip', 'Airport', 'Other'],
  Events: ['Community', 'Classes', 'Sports', 'Other'],
  Housing: ['Room for Rent', 'House Sitting', 'Vacation Swap', 'Other'],
};

// Sample price types
const priceTypes = ['per hour', 'per day', 'per week', 'fixed price', 'free', 'trade/barter'];

export default function CommunityMarketplace() {
  const [tabValue, setTabValue] = useState(0);
  const [openNewListing, setOpenNewListing] = useState(false);
  const [openListingDetails, setOpenListingDetails] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    category: 'Services',
    subcategory: '',
    price: '',
    priceType: 'per hour',
    location: 'Local'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenNewListing = () => {
    setOpenNewListing(true);
  };

  const handleCloseNewListing = () => {
    setOpenNewListing(false);
  };

  const handleOpenListingDetails = (listing) => {
    setSelectedListing(listing);
    setOpenListingDetails(true);
  };

  const handleCloseListingDetails = () => {
    setOpenListingDetails(false);
  };

  const handleNewListingChange = (prop) => (event) => {
    setNewListing({ ...newListing, [prop]: event.target.value });
  };

  const handleSaveListing = () => {
    // Here you would typically save the listing to your backend
    console.log('Saving listing:', newListing);
    handleCloseNewListing();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = searchQuery === '' || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || listing.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Community Marketplace
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenNewListing}
          >
            Create Listing
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Exchange goods, services, and skills with your local community
        </Typography>
      </Box>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="marketplace tabs">
            <Tab label="Browse Listings" />
            <Tab label="My Listings" />
            <Tab label="Community Members" />
          </Tabs>
        </Box>

        {/* Browse Listings Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <TextField
                placeholder="Search listings..."
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              />
              <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                  label="Category"
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.name} value={category.name}>
                      {category.name} ({category.count})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button startIcon={<FilterListIcon />} variant="outlined" size="small">
                More Filters
              </Button>
              <Button startIcon={<SortIcon />} variant="outlined" size="small">
                Sort
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {filteredListings.map((listing) => (
              <Grid item xs={12} sm={6} md={4} key={listing.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box 
                    sx={{ 
                      height: 140, 
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      position: 'relative'
                    }}
                  >
                    {listing.category === 'Services' ? (
                      <HandshakeIcon sx={{ fontSize: 60 }} />
                    ) : (
                      <ShareIcon sx={{ fontSize: 60 }} />
                    )}
                    <Chip 
                      label={listing.category} 
                      size="small" 
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        left: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        color: 'primary.main'
                      }} 
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>{listing.title}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'secondary.light' }}>
                        {getInitials(listing.postedBy)}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        {listing.postedBy}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {listing.description.length > 120 
                        ? `${listing.description.substring(0, 120)}...` 
                        : listing.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          {listing.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={listing.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          ({listing.reviewCount})
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary.main">
                        {listing.price === 0 ? 'Free' : `$${listing.price} ${listing.priceType}`}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small"
                        onClick={() => handleOpenListingDetails(listing)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* My Listings Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">My Marketplace Listings</Typography>
          </Box>

          <Grid container spacing={3}>
            {listings.filter(listing => listing.postedBy === 'John Smith').map((listing) => (
              <Grid item xs={12} sm={6} md={4} key={listing.id}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 120, 
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      position: 'relative'
                    }}
                  >
                    {listing.category === 'Services' ? (
                      <HandshakeIcon sx={{ fontSize: 50 }} />
                    ) : (
                      <ShareIcon sx={{ fontSize: 50 }} />
                    )}
                    <Chip 
                      label={listing.status} 
                      size="small" 
                      color={listing.status === 'Active' ? 'success' : 'default'}
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8,
                      }} 
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{listing.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {listing.description.length > 100 
                        ? `${listing.description.substring(0, 100)}...` 
                        : listing.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" color="primary.main">
                        {listing.price === 0 ? 'Free' : `$${listing.price} ${listing.priceType}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posted: {new Date(listing.postedDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1 }}>
                    <Button size="small" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                    <Button size="small" color="error">
                      Deactivate
                    </Button>
                    <Button size="small" color="primary">
                      Promote
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>Create New Listing</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={handleOpenNewListing}
                  >
                    Create Listing
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Community Members Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Community Members</Typography>
            <TextField
              placeholder="Search members..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
          </Box>

          <Grid container spacing={3}>
            {communityMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        bgcolor: 'primary.light',
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      {getInitials(member.name)}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>{member.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      <Rating value={member.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        ({member.rating})
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Member since {member.memberSince}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {member.bio}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.5, mb: 2 }}>
                      {member.skills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {member.listingCount} active listings
                    </Typography>
                  </CardContent>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1 }}>
                    <Button size="small" startIcon={<MessageIcon />}>
                      Message
                    </Button>
                    <Button size="small" startIcon={<FavoriteIcon />}>
                      Follow
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>

      {/* Create Listing Dialog */}
      <Dialog open={openNewListing} onClose={handleCloseNewListing} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Listing</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={newListing.title}
              onChange={handleNewListingChange('title')}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={newListing.description}
              onChange={handleNewListingChange('description')}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newListing.category}
                    label="Category"
                    onChange={handleNewListingChange('category')}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    value={newListing.subcategory}
                    label="Subcategory"
                    onChange={handleNewListingChange('subcategory')}
                  >
                    {subcategories[newListing.category]?.map((subcategory) => (
                      <MenuItem key={subcategory} value={subcategory}>{subcategory}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  variant="outlined"
                  value={newListing.price}
                  onChange={handleNewListingChange('price')}
                  margin="normal"
                  InputProps={{
                    startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Price Type</InputLabel>
                  <Select
                    value={newListing.priceType}
                    label="Price Type"
                    onChange={handleNewListingChange('priceType')}
                  >
                    {priceTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <InputLabel>Location</InputLabel>
              <Select
                value={newListing.location}
                label="Location"
                onChange={handleNewListingChange('location')}
              >
                <MenuItem value="Local">Local (Within 5 miles)</MenuItem>
                <MenuItem value="Neighborhood">Neighborhood Only</MenuItem>
                <MenuItem value="City">Entire City</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" fullWidth>
                Upload Images
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewListing}>Cancel</Button>
          <Button onClick={handleSaveListing} variant="contained" color="primary">Create Listing</Button>
        </DialogActions>
      </Dialog>

      {/* Listing Details Dialog */}
      {selectedListing && (
        <Dialog open={openListingDetails} onClose={handleCloseListingDetails} maxWidth="md" fullWidth>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box 
                  sx={{ 
                    height: 250, 
                    backgroundColor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: 1
                  }}
                >
                  {selectedListing.category === 'Services' ? (
                    <HandshakeIcon sx={{ fontSize: 80 }} />
                  ) : (
                    <ShareIcon sx={{ fontSize: 80 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{selectedListing.title}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'secondary.light' }}>
                    {getInitials(selectedListing.postedBy)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">
                      {selectedListing.postedBy}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={selectedListing.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        ({selectedListing.reviewCount} reviews)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" color="primary.main">
                    {selectedListing.price === 0 ? 'Free' : `$${selectedListing.price} ${selectedListing.priceType}`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2, gap: 1 }}>
                  <Chip label={selectedListing.category} />
                  <Chip label={selectedListing.subcategory} />
                  <Chip icon={<LocationOnIcon />} label={selectedListing.location} />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" paragraph>
                    {selectedListing.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posted on {new Date(selectedListing.postedDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" color="primary" startIcon={<MessageIcon />}>
                    Contact
                  </Button>
                  <Button variant="outlined" startIcon={<FavoriteIcon />}>
                    Save
                  </Button>
                  <Button variant="outlined" startIcon={<ShareIcon />}>
                    Share
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseListingDetails}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
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

// Missing icon definition
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);
