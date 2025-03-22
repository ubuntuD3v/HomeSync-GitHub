# HomeSync Technical Documentation

## System Architecture

HomeSync is built using a modern microservices architecture with a clear separation between frontend and backend components. The system is containerized using Docker for easy deployment and scalability.

### Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client Browser │────▶│  Nginx Proxy    │────▶│  Frontend       │
│                 │     │                 │     │  (Next.js)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  MongoDB        │◀───▶│  Backend API    │◀───▶│  Third-Party    │
│  Database       │     │  (Express.js)   │     │  Services       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Components

1. **Frontend (Next.js)**
   - Server-side rendered React application
   - Material UI component library
   - Responsive design for all device sizes
   - Client-side state management with React Context API

2. **Backend API (Express.js)**
   - RESTful API endpoints
   - JWT authentication
   - Business logic implementation
   - Third-party service integrations

3. **Database (MongoDB)**
   - Document-oriented NoSQL database
   - Mongoose ODM for schema validation
   - Indexed collections for performance

4. **Nginx Proxy**
   - SSL/TLS termination
   - Request routing
   - Static file serving
   - Security headers

5. **Third-Party Integrations**
   - Google Calendar API
   - Twilio SMS API
   - Stripe Payment API
   - Amazon Alexa Skills API

## Technology Stack

### Frontend
- **Framework**: Next.js 14.x (React 18.x)
- **UI Library**: Material UI 5.x
- **State Management**: React Context API
- **Styling**: CSS Modules, Emotion
- **HTTP Client**: Axios
- **Form Validation**: Formik, Yup
- **Date Handling**: date-fns
- **Charts**: Chart.js, React-Chartjs-2

### Backend
- **Runtime**: Node.js 20.x
- **Framework**: Express.js 4.x
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Database ODM**: Mongoose 7.x
- **Validation**: express-validator
- **Logging**: Winston, Morgan
- **API Documentation**: Swagger/OpenAPI

### Database
- **Database**: MongoDB 6.x
- **Indexes**: Created for frequently queried fields
- **Relationships**: Referenced and embedded documents

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Reverse Proxy**: Nginx
- **SSL/TLS**: Let's Encrypt
- **Logging**: ELK Stack (optional)
- **Monitoring**: Prometheus, Grafana (optional)

## Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  phoneNumber: String (optional),
  household: ObjectId (ref: 'Household'),
  profileImage: String (optional),
  preferences: {
    theme: String,
    notifications: {
      email: Boolean,
      sms: Boolean,
      push: Boolean
    }
  },
  integrations: {
    googleCalendar: {
      connected: Boolean,
      tokens: Object
    },
    alexa: {
      connected: Boolean,
      userId: String
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Household
```javascript
{
  _id: ObjectId,
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  members: [ObjectId] (ref: 'User'),
  admin: ObjectId (ref: 'User'),
  inviteCode: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  dueDate: Date,
  priority: String (enum: ['Low', 'Medium', 'High']),
  status: String (enum: ['Pending', 'In Progress', 'Completed']),
  category: String,
  assignedTo: ObjectId (ref: 'User'),
  household: ObjectId (ref: 'Household'),
  recurring: {
    isRecurring: Boolean,
    frequency: String (enum: ['Daily', 'Weekly', 'Monthly', 'Custom']),
    interval: Number,
    endDate: Date (optional)
  },
  completedAt: Date,
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### GroceryItem
```javascript
{
  _id: ObjectId,
  name: String,
  quantity: String,
  category: String,
  checked: Boolean,
  recurring: Boolean,
  household: ObjectId (ref: 'Household'),
  addedBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### MealPlan
```javascript
{
  _id: ObjectId,
  day: String (enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  week: Date,
  breakfast: String,
  lunch: String,
  dinner: String,
  snacks: String,
  household: ObjectId (ref: 'Household'),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### Chore
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  frequency: String (enum: ['Daily', 'Weekly', 'Monthly', 'Custom']),
  points: Number,
  status: String (enum: ['Pending', 'Completed']),
  assignedTo: ObjectId (ref: 'User'),
  dueDate: Date,
  household: ObjectId (ref: 'Household'),
  recurring: {
    isRecurring: Boolean,
    interval: Number,
    endDate: Date (optional)
  },
  completedAt: Date,
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### Bill
```javascript
{
  _id: ObjectId,
  name: String,
  amount: Number,
  dueDate: Date,
  category: String,
  paymentMethod: String,
  status: String (enum: ['Pending', 'Paid', 'Overdue']),
  recurring: String (enum: ['One-time', 'Weekly', 'Monthly', 'Quarterly', 'Annually']),
  household: ObjectId (ref: 'Household'),
  paidDate: Date,
  paidBy: ObjectId (ref: 'User'),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### Appliance
```javascript
{
  _id: ObjectId,
  name: String,
  brand: String,
  model: String,
  purchaseDate: Date,
  warrantyExpiry: Date,
  status: String (enum: ['Good Condition', 'Needs Attention', 'Service Required', 'Replaced']),
  nextMaintenance: String,
  location: String,
  household: ObjectId (ref: 'Household'),
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### MarketplaceListing
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  subcategory: String,
  price: Number,
  priceType: String (enum: ['fixed', 'per hour', 'negotiable', 'free']),
  location: String,
  images: [String],
  status: String (enum: ['Active', 'Pending', 'Sold', 'Cancelled']),
  postedBy: ObjectId (ref: 'User'),
  household: ObjectId (ref: 'Household'),
  reviews: [{
    user: ObjectId (ref: 'User'),
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Household Management
- `POST /api/users/household` - Create a household
- `GET /api/users/household` - Get household details
- `PUT /api/users/household` - Update household details
- `POST /api/users/household/join` - Join a household with invite code
- `GET /api/users/household/members` - Get household members

### Task Management
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks for household
- `GET /api/tasks/my-tasks` - Get user's tasks
- `GET /api/tasks/:id` - Get a task by ID
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Grocery Management
- `POST /api/grocery/items` - Create a grocery item
- `GET /api/grocery/items` - Get all grocery items for household
- `PUT /api/grocery/items/:id` - Update a grocery item
- `DELETE /api/grocery/items/:id` - Delete a grocery item
- `POST /api/grocery/meal-plans` - Create/update a meal plan
- `GET /api/grocery/meal-plans` - Get meal plans for the week
- `DELETE /api/grocery/meal-plans/:id` - Delete a meal plan

### Chore Management
- `POST /api/chores` - Create a new chore
- `GET /api/chores` - Get all chores for household
- `GET /api/chores/my-chores` - Get user's chores
- `GET /api/chores/:id` - Get a chore by ID
- `PUT /api/chores/:id` - Update a chore
- `DELETE /api/chores/:id` - Delete a chore
- `GET /api/chores/leaderboard` - Get household chore leaderboard

### Bill Management
- `POST /api/bills` - Create a new bill
- `GET /api/bills` - Get all bills for household
- `GET /api/bills/:id` - Get a bill by ID
- `PUT /api/bills/:id` - Update a bill
- `DELETE /api/bills/:id` - Delete a bill
- `GET /api/bills/summary` - Get household budget summary

### Maintenance Management
- `POST /api/maintenance` - Create a new appliance
- `GET /api/maintenance` - Get all appliances for household
- `GET /api/maintenance/:id` - Get an appliance by ID
- `PUT /api/maintenance/:id` - Update an appliance
- `DELETE /api/maintenance/:id` - Delete an appliance
- `GET /api/maintenance/alerts` - Get maintenance alerts

### Marketplace Management
- `POST /api/marketplace` - Create a new listing
- `GET /api/marketplace` - Get all marketplace listings
- `GET /api/marketplace/my-listings` - Get user's listings
- `GET /api/marketplace/:id` - Get a listing by ID
- `PUT /api/marketplace/:id` - Update a listing
- `DELETE /api/marketplace/:id` - Delete a listing
- `POST /api/marketplace/:id/reviews` - Add a review to a listing
- `GET /api/marketplace/categories` - Get marketplace categories

## Third-Party Integrations

### Google Calendar Integration
The Google Calendar integration allows users to sync their tasks and events with their Google Calendar.

**Implementation Details:**
- OAuth 2.0 authentication flow
- Calendar event creation and retrieval
- Automatic syncing of tasks with due dates

**API Methods:**
- `getAuthUrl()` - Generate authentication URL
- `getTokensFromCode(code)` - Get tokens from authorization code
- `createCalendarEvent(tokens, eventData)` - Create a calendar event
- `getCalendarEvents(tokens, timeMin, timeMax)` - Get calendar events

### Twilio SMS Notifications
The Twilio integration enables sending SMS notifications for task reminders, bill due dates, and other alerts.

**Implementation Details:**
- Twilio API client initialization
- Formatted message templates for different notification types
- Scheduled sending based on user preferences

**API Methods:**
- `sendSMS(to, message)` - Send an SMS message
- `sendTaskReminder(user, task)` - Send a task reminder
- `sendBillReminder(user, bill)` - Send a bill payment reminder
- `sendChoreReminder(user, chore)` - Send a chore reminder

### Stripe Payment Processing
The Stripe integration provides secure payment processing for bill payments.

**Implementation Details:**
- Stripe API client initialization
- Payment intent creation and confirmation
- Customer and payment method management

**API Methods:**
- `createPaymentIntent(amount, currency, metadata)` - Create a payment intent
- `processBillPayment(bill, paymentMethodId)` - Process a bill payment
- `createCustomer(user)` - Create a Stripe customer
- `addPaymentMethod(customerId, paymentMethodId)` - Add a payment method
- `getCustomerPaymentMethods(customerId)` - Get customer payment methods

### Amazon Alexa Voice Assistant
The Alexa integration allows users to interact with HomeSync using voice commands.

**Implementation Details:**
- Alexa skill configuration with intents and slots
- Request handling for different voice commands
- Account linking between Alexa and HomeSync

**API Methods:**
- `configureAlexaSkill()` - Configure the Alexa skill
- `handleAlexaRequest(request)` - Handle Alexa requests
- `linkAlexaAccount(alexaUserId, homeSyncUserId)` - Link Alexa account

## Deployment

### Docker Configuration
HomeSync is deployed using Docker containers orchestrated with Docker Compose.

**docker-compose.yml:**
- Frontend container (Next.js)
- Backend container (Express.js)
- MongoDB container
- Nginx container for routing and SSL

### Nginx Configuration
Nginx serves as a reverse proxy, handling SSL termination and routing requests to the appropriate services.

**Key Features:**
- SSL/TLS configuration
- HTTP to HTTPS redirection
- Security headers
- API and frontend routing

### Logging and Monitoring
The system uses a comprehensive logging setup to track application events and errors.

**Logging Configuration:**
- Console logging for development
- File-based logging for production
- Error-specific logging
- Log rotation for disk space management

### Deployment Script
The deployment script automates the process of deploying the HomeSync platform.

**Key Steps:**
1. Create necessary directories
2. Build and start Docker containers
3. Wait for services to be ready
4. Run database setup and seeding
5. Set up monitoring

## Security Considerations

### Authentication and Authorization
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- CSRF protection

### Data Protection
- HTTPS for all communications
- Sensitive data encryption
- Secure headers configuration
- Input validation and sanitization

### API Security
- Rate limiting
- Request validation
- Error handling without sensitive information
- Proper HTTP status codes

## Performance Optimization

### Frontend Optimization
- Server-side rendering for initial load
- Code splitting for faster page loads
- Image optimization
- Caching strategies

### Backend Optimization
- Database indexing
- Query optimization
- Connection pooling
- Response compression

### Database Optimization
- Proper indexing strategy
- Efficient document structure
- Pagination for large result sets
- Caching frequently accessed data

## Maintenance and Updates

### Backup Strategy
- Regular database backups
- Backup verification
- Retention policy

### Update Process
1. Pull latest code changes
2. Build new Docker images
3. Deploy with zero downtime
4. Verify deployment
5. Rollback procedure if needed

### Monitoring
- Error rate monitoring
- Performance metrics
- User activity tracking
- System resource utilization

## Troubleshooting

### Common Issues
- Database connection problems
- API endpoint errors
- Authentication failures
- Third-party service integration issues

### Debugging Tools
- Application logs
- Docker container logs
- Database query logs
- Network traffic analysis

## Future Enhancements

### Planned Features
- Mobile application (React Native)
- Advanced analytics dashboard
- Machine learning for task suggestions
- Additional third-party integrations

### Scalability Considerations
- Horizontal scaling with multiple instances
- Database sharding for large datasets
- Caching layer implementation
- Microservices architecture evolution
