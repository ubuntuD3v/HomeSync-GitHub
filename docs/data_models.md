# HomeSync Data Models

## User Model
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  profilePicture: String (URL),
  households: [
    {
      householdId: ObjectId,
      role: String (owner, admin, member)
    }
  ],
  preferences: {
    notifications: {
      email: Boolean,
      push: Boolean,
      sms: Boolean
    },
    theme: String,
    timezone: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Household Model
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
  members: [
    {
      userId: ObjectId,
      role: String,
      joinedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Task Model
```javascript
{
  _id: ObjectId,
  householdId: ObjectId,
  title: String,
  description: String,
  category: String,
  priority: String (high, medium, low),
  status: String (pending, in-progress, completed),
  dueDate: Date,
  assignedTo: [ObjectId],
  recurring: {
    isRecurring: Boolean,
    frequency: String (daily, weekly, monthly),
    endDate: Date
  },
  reminders: [
    {
      time: Date,
      sent: Boolean
    }
  ],
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## Grocery Model
```javascript
{
  _id: ObjectId,
  householdId: ObjectId,
  name: String,
  lists: [
    {
      _id: ObjectId,
      name: String,
      items: [
        {
          name: String,
          quantity: Number,
          unit: String,
          category: String,
          purchased: Boolean,
          price: Number
        }
      ],
      totalEstimatedCost: Number,
      status: String (active, completed),
      createdAt: Date,
      updatedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Meal Plan Model
```javascript
{
  _id: ObjectId,
  householdId: ObjectId,
  name: String,
  startDate: Date,
  endDate: Date,
  meals: [
    {
      day: Date,
      mealType: String (breakfast, lunch, dinner, snack),
      recipe: {
        recipeId: ObjectId,
        name: String,
        ingredients: [
          {
            name: String,
            quantity: Number,
            unit: String
          }
        ],
        instructions: String,
        prepTime: Number,
        cookTime: Number,
        servings: Number
      },
      notes: String
    }
  ],
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## Chore Model
```javascript
{
  _id: ObjectId,
  householdId: ObjectId,
  name: String,
  description: String,
  points: Number,
  frequency: String (daily, weekly, monthly),
  assignedTo: [ObjectId],
  rotation: Boolean,
  history: [
    {
      completedBy: ObjectId,
      completedAt: Date,
      verified: Boolean,
      verifiedBy: ObjectId,
      pointsAwarded: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Bill Model
```javascript
{
  _id: ObjectId,
  householdId: ObjectId,
  name: String,
  category: String,
  amount: Number,
  dueDate: Date,
  recurring: {
    isRecurring: Boolean,
    frequency: String (monthly, quarterly, annually),
    endDate: Date
  },
  paymentMethod: {
    type: String,
    lastFour: String,
    expiryDate: String
  },
  status: String (pending, paid, overdue),
  paymentHistory: [
    {
      amount: Number,
      date: Date,
      method: String,
      confirmation: String
    }
  ],
  reminders: [
    {
      days: Number,
      sent: Boolean
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Maintenance Model
```javascript
{
  _id: ObjectId,
  householdId: ObjectId,
  item: {
    name: String,
    category: String,
    purchaseDate: Date,
    warranty: {
      expiryDate: Date,
      provider: String,
      details: String
    }
  },
  maintenanceSchedule: [
    {
      type: String,
      frequency: String,
      lastPerformed: Date,
      nextDue: Date,
      notes: String
    }
  ],
  serviceHistory: [
    {
      date: Date,
      serviceType: String,
      provider: {
        name: String,
        contact: String
      },
      cost: Number,
      notes: String,
      attachments: [String]
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Community Marketplace Model
```javascript
{
  _id: ObjectId,
  householdId: ObjectId,
  listings: [
    {
      _id: ObjectId,
      title: String,
      description: String,
      category: String (service, item, skill),
      type: String (offer, request),
      price: {
        amount: Number,
        negotiable: Boolean
      },
      location: {
        address: String,
        coordinates: {
          latitude: Number,
          longitude: Number
        },
        radius: Number
      },
      images: [String],
      status: String (active, pending, completed, cancelled),
      createdBy: ObjectId,
      createdAt: Date,
      updatedAt: Date
    }
  ],
  transactions: [
    {
      listingId: ObjectId,
      buyer: ObjectId,
      seller: ObjectId,
      status: String (pending, completed, cancelled),
      messages: [
        {
          sender: ObjectId,
          content: String,
          timestamp: Date
        }
      ],
      rating: {
        score: Number,
        comment: String,
        createdAt: Date
      },
      createdAt: Date,
      updatedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Notification Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String,
  title: String,
  message: String,
  relatedTo: {
    model: String,
    id: ObjectId
  },
  read: Boolean,
  createdAt: Date
}
```
