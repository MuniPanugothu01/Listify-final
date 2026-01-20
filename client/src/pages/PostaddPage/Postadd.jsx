import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  Users, 
  Wrench, 
  Calendar,
  Car,
  ArrowLeft,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronRight,
  Tag,
  Heart,
  ShoppingBag,
  Plane,
  Building,
  GraduationCap,
  Camera,
  BookOpen,
  Utensils,
  DollarSign,
  TrendingUp,
  Ticket
} from 'lucide-react';

const PostaddPage = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    contactName: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // Main categories with enhanced descriptions and features
  const categories = [
    { 
      id: 'careServices', 
      name: 'Care Services', 
      icon: <Heart className="w-8 h-8" />,
      description: 'Find the right care for your child and family',
      features: [
        'Daycare Services',
        'Nanny Services', 
        'Babysitter Services',
        'Housekeeping Services',
        'Cooking Services',
        'Eldercare Services',
        'Petcare Services',
        'Tutoring Services'
      ],
      stats: '10,000+ care providers',
      tagline: 'Post your care needs'
    },
    { 
      id: 'buySell', 
      name: 'Buy & Sell', 
      icon: <ShoppingBag className="w-8 h-8" />,
      description: 'Post your products and find great deals',
      features: [
        'Antiques & Collectibles',
        'Arts & Crafts',
        'Auto Parts & Accessories',
        'Baby And Kids Stuff',
        'Books & Magazines',
        'Electronic Appliances',
        'Furniture & Home Decor',
        'Real Estate',
        'Mobile Phones & Gadgets'
      ],
      stats: '50,000+ active listings',
      tagline: 'Post Your Products'
    },
    { 
      id: 'housing', 
      name: 'Housing & Rentals', 
      icon: <Home className="w-8 h-8" />,
      description: 'Find over 10,000+ Roommates/Rental listings',
      features: [
        'Roommates: I Offer Room for Share',
        'Roommates: I Need Room to Share', 
        'Rentals: I Offer House for Rent',
        'Rentals: I Need House to Rent',
        'Commercial Space for Rent'
      ],
      stats: '10,000+ listings',
      tagline: 'Find your perfect home'
    },
    { 
      id: 'localServices', 
      name: 'Local Services', 
      icon: <Wrench className="w-8 h-8" />,
      description: 'Get the right service pros for all your local needs',
      features: [
        'Astrologers',
        'Beautician Services',
        'Catering Services',
        'Cooking Services',
        'Dance Classes',
        'DJ Services',
        'Financial & Taxation Services',
        'Legal Services',
        'Photography/Video'
      ],
      stats: 'Expert service providers',
      tagline: 'Post your service needs'
    },
    { 
      id: 'jobs', 
      name: 'Jobs & Careers', 
      icon: <Briefcase className="w-8 h-8" />,
      description: 'Find your dream job or the perfect candidate',
      features: [
        'Post IT Jobs',
        'Post Non-IT Jobs',
        'Resume Packages',
        'Job Fair Listings',
        'Premium Jobseeker Profiles'
      ],
      stats: '5,000+ active jobs',
      tagline: 'Check out our recruiter packages!'
    },
    { 
      id: 'travels', 
      name: 'Travels', 
      icon: <Plane className="w-8 h-8" />,
      description: 'Planning a Trip to India? Get a Quote',
      features: [
        'Flight Booking',
        'Hotel Booking',
        'Tour Packages',
        'India Trip Planning',
        'Custom Travel Itineraries'
      ],
      stats: 'Best price guarantee',
      tagline: 'Get custom quotes'
    },
    { 
      id: 'events', 
      name: 'Events & Tickets', 
      icon: <Calendar className="w-8 h-8" />,
      description: 'Discover and share local events',
      features: [
        'Concerts & Shows',
        'Workshops & Classes',
        'Community Events',
        'Sports Events',
        'Cultural Festivals'
      ],
      stats: '500+ upcoming events',
      tagline: 'Share your event'
    },
    { 
      id: 'automotive', 
      name: 'Automotive', 
      icon: <Car className="w-8 h-8" />,
      description: 'Do you want to sell a car? Find used cars',
      features: [
        'Sell Your Car',
        'Rent Your Car',
        'Buy Used Cars',
        'Auto Parts',
        'Car Services'
      ],
      stats: '5,000+ used cars',
      tagline: 'Sell your car in minutes'
    },
    { 
      id: 'community', 
      name: 'Community', 
      icon: <Users className="w-8 h-8" />,
      description: 'Connect with local communities',
      features: [
        'Activities & Hobbies',
        'Groups & Clubs',
        'Volunteer Opportunities',
        'Language Exchange',
        'Sports Groups'
      ],
      stats: '1,000+ active groups',
      tagline: 'Join local communities'
    },
    { 
      id: 'homesForSale', 
      name: 'Homes for Sale', 
      icon: <Building className="w-8 h-8" />,
      description: 'List your home for sale in 3 simple steps',
      features: [
        'For Property Owner',
        'For Agent/Broker',
        'Condo/Apartment',
        'Single Family Homes',
        'Commercial Property'
      ],
      stats: '10,000+ homes',
      tagline: 'Sell your home now'
    },
    { 
      id: 'itTraining', 
      name: 'IT Training', 
      icon: <GraduationCap className="w-8 h-8" />,
      description: 'Get trained by our trusted training providers',
      features: [
        'SAP IS Healthcare',
        'Cloud Computing',
        'Android Development',
        'MS SQL Server',
        'Big Data Analytics'
      ],
      stats: 'Certification recognition',
      tagline: 'List your business'
    }
  ];

  // Enhanced subcategories with detailed features - FIXED: Added all categories
  const subCategories = {
    // Care Services
    careServices: [
      { 
        id: 'daycare', 
        name: 'Daycare Services', 
        icon: '👶',
        fields: ['serviceName', 'description', 'ageGroup', 'hours', 'price', 'facilities', 'location'],
        features: ['Full-time care', 'Educational activities', 'Meals provided', 'Safe environment'],
        description: 'Professional daycare services for children'
      },
      { 
        id: 'nanny', 
        name: 'Nanny Services', 
        icon: '👩‍🍼',
        fields: ['serviceType', 'description', 'experience', 'availability', 'price', 'qualifications', 'location'],
        features: ['Live-in/Live-out', 'Childcare experience', 'First-aid certified', 'Reference checks'],
        description: 'Qualified nannies for your family'
      }
    ],
    
    // Buy & Sell
    buySell: [
      { 
        id: 'antiques', 
        name: 'Antiques', 
        icon: '🏺',
        fields: ['itemName', 'description', 'age', 'condition', 'price', 'authenticity', 'location'],
        features: ['Vintage items', 'Collectibles', 'Authenticity verified', 'Home decor'],
        description: 'Sell or buy antique items'
      },
      { 
        id: 'electronics', 
        name: 'Electronic Appliances', 
        icon: '📱',
        fields: ['applianceType', 'description', 'brand', 'condition', 'price', 'warranty', 'location'],
        features: ['Home appliances', 'Gadgets', 'Branded items', 'Warranty available'],
        description: 'Buy or sell electronics and appliances'
      },
      { 
        id: 'furniture', 
        name: 'Furniture & Home Decor', 
        icon: '🛋️',
        fields: ['itemType', 'description', 'material', 'condition', 'price', 'dimensions', 'location'],
        features: ['Modern furniture', 'Vintage pieces', 'Home decor', 'Office furniture'],
        description: 'Furniture and home decoration items'
      },
      { 
        id: 'realEstate', 
        name: 'Real Estate', 
        icon: '🏘️',
        fields: ['propertyType', 'description', 'area', 'condition', 'price', 'amenities', 'location'],
        features: ['Residential', 'Commercial', 'Plots', 'Investment property'],
        description: 'Properties for sale or rent'
      }
    ],
    
    // Housing & Rentals with enhanced options
    housing: [
      { 
        id: 'roommateOffer', 
        name: 'Roommates: I Offer Room for Share', 
        icon: '🏠',
        fields: ['title', 'description', 'rent', 'roomType', 'location', 'amenities', 'genderPreference', 'availableFrom'],
        features: ['Single Room', 'Shared Room', 'Paying Guest', 'Utilities included'],
        description: 'Share your extra room with verified roommates'
      },
      { 
        id: 'roommateNeed', 
        name: 'Roommates: I Need Room to Share', 
        icon: '🔍',
        fields: ['title', 'description', 'budget', 'roomType', 'location', 'preferences', 'moveInDate'],
        features: ['Budget-friendly', 'Location preference', 'Room type selection', 'Immediate move-in'],
        description: 'Find rooms available for sharing'
      },
      { 
        id: 'rentalOffer', 
        name: 'Rentals: I Offer House for Rent', 
        icon: '🏡',
        fields: ['title', 'description', 'rent', 'propertyType', 'bedrooms', 'bathrooms', 'location', 'amenities'],
        features: ['Apartment', 'Single Family Home', 'Condo', 'Town House'],
        description: 'List your property for rent'
      },
      { 
        id: 'commercialSpace', 
        name: 'Commercial Space for Rent', 
        icon: '🏢',
        fields: ['title', 'description', 'rent', 'spaceType', 'squareFeet', 'location', 'amenities', 'leaseTerms'],
        features: ['Office Space', 'Retail Space', 'Warehouse', 'Industrial'],
        description: 'Commercial properties for business'
      }
    ],
    
    // Local Services
    localServices: [
      { 
        id: 'astrologers', 
        name: 'Astrologers', 
        icon: '🔮',
        fields: ['serviceType', 'description', 'specialization', 'consultationType', 'price', 'experience', 'location'],
        features: ['Vedic Astrology', 'Horoscope Reading', 'Numerology', 'Palmistry'],
        description: 'Expert astrological consultations'
      },
      { 
        id: 'beautician', 
        name: 'Beautician Services', 
        icon: '💇‍♀️',
        fields: ['serviceType', 'description', 'specialization', 'availability', 'price', 'certification', 'location'],
        features: ['Hair Styling', 'Makeup', 'Skincare', 'Bridal Packages'],
        description: 'Professional beauty services'
      },
      { 
        id: 'catering', 
        name: 'Catering Services', 
        icon: <Utensils className="w-5 h-5" />,
        fields: ['serviceType', 'description', 'cuisine', 'capacity', 'price', 'experience', 'location'],
        features: ['Wedding Catering', 'Corporate Events', 'Home Parties', 'Custom Menus'],
        description: 'Delicious catering for all occasions'
      },
      { 
        id: 'legal', 
        name: 'Legal Services', 
        icon: '⚖️',
        fields: ['serviceType', 'description', 'specialization', 'consultationType', 'price', 'experience', 'location'],
        features: ['Immigration Law', 'Family Law', 'Business Law', 'Real Estate Law'],
        description: 'Expert legal advice and services'
      }
    ],
    
    // Jobs
    jobs: [
      { 
        id: 'itJobs', 
        name: 'IT Jobs', 
        icon: '💻',
        fields: ['jobTitle', 'description', 'company', 'salary', 'jobType', 'experience', 'skills', 'location'],
        features: ['Software Development', 'IT Support', 'Networking', 'Cybersecurity'],
        description: 'Information technology job opportunities'
      },
      { 
        id: 'nonItJobs', 
        name: 'Non-IT Jobs', 
        icon: '👔',
        fields: ['jobTitle', 'description', 'industry', 'salary', 'jobType', 'requirements', 'location'],
        features: ['Administration', 'Sales', 'Healthcare', 'Education'],
        description: 'Non-technical job opportunities'
      },
      { 
        id: 'partTime', 
        name: 'Part-time Jobs', 
        icon: '⏰',
        fields: ['jobTitle', 'description', 'schedule', 'pay', 'requirements', 'location'],
        features: ['Flexible hours', 'Weekend jobs', 'Student-friendly', 'Remote options'],
        description: 'Part-time employment opportunities'
      },
      { 
        id: 'freelance', 
        name: 'Freelance Work', 
        icon: '🎯',
        fields: ['projectType', 'description', 'budget', 'duration', 'skills', 'deliverables'],
        features: ['Remote work', 'Project-based', 'Flexible schedule', 'Multiple projects'],
        description: 'Freelance and contract work'
      }
    ],
    
    // Travels
    travels: [
      { 
        id: 'indiaTrip', 
        name: 'India Trip Planning', 
        icon: '🇮🇳',
        fields: ['tripType', 'description', 'duration', 'travelers', 'budget', 'preferences', 'contactTime'],
        features: ['Custom itineraries', 'Flight booking', 'Hotel arrangements', 'Local guides'],
        description: 'Plan your trip to India'
      },
      { 
        id: 'flightBooking', 
        name: 'Flight Booking', 
        icon: '✈️',
        fields: ['destination', 'description', 'travelDates', 'passengers', 'budget', 'class', 'contact'],
        features: ['Domestic flights', 'International flights', 'Best deals', 'Group discounts'],
        description: 'Book flights at best prices'
      },
      { 
        id: 'tourPackages', 
        name: 'Tour Packages', 
        icon: '🗺️',
        fields: ['packageName', 'description', 'duration', 'inclusions', 'price', 'availability', 'contact'],
        features: ['All-inclusive packages', 'Guided tours', 'Accommodation', 'Transportation'],
        description: 'Complete tour packages'
      }
    ],
    
    // Events
    events: [
      { 
        id: 'concerts', 
        name: 'Concerts & Shows', 
        icon: '🎤',
        fields: ['eventName', 'description', 'date', 'time', 'venue', 'ticketPrice', 'artist'],
        features: ['Live music', 'Theater shows', 'Stand-up comedy', 'Cultural events'],
        description: 'Entertainment events and tickets'
      },
      { 
        id: 'workshops', 
        name: 'Workshops & Classes', 
        icon: '🎓',
        fields: ['workshopName', 'description', 'date', 'time', 'venue', 'fee', 'instructor'],
        features: ['Skill development', 'Professional training', 'Hobby classes', 'Certification'],
        description: 'Educational workshops and classes'
      },
      { 
        id: 'communityEvents', 
        name: 'Community Events', 
        icon: '👥',
        fields: ['eventName', 'description', 'date', 'time', 'venue', 'organizer', 'contact'],
        features: ['Local gatherings', 'Cultural festivals', 'Charity events', 'Networking'],
        description: 'Community gatherings and events'
      }
    ],
    
    // Automotive
    automotive: [
      { 
        id: 'sellCar', 
        name: 'Sell Your Car', 
        icon: '🚗',
        fields: ['make', 'model', 'year', 'price', 'mileage', 'condition', 'location', 'features'],
        features: ['Quick Sale', 'Free Valuation', 'Verified Buyers', 'Paperwork Assistance'],
        description: 'Sell your car quickly and easily'
      },
      { 
        id: 'rentCar', 
        name: 'Rent Your Car', 
        icon: '🔑',
        fields: ['make', 'model', 'year', 'dailyRate', 'availability', 'location', 'insurance', 'terms'],
        features: ['Daily/Monthly Rental', 'Full Insurance', '24/7 Support', 'Flexible Terms'],
        description: 'Earn money by renting your car'
      },
      { 
        id: 'usedCars', 
        name: 'Used Cars for Sale', 
        icon: '🏎️',
        fields: ['make', 'model', 'year', 'price', 'mileage', 'condition', 'location', 'features'],
        features: ['Certified Used Cars', 'Financing Options', 'Test Drive', 'Warranty Available'],
        description: 'Find quality used cars from trusted sellers'
      }
    ],
    
    // Community
    community: [
      { 
        id: 'activities', 
        name: 'Activities & Hobbies', 
        icon: '🎨',
        fields: ['activityName', 'description', 'schedule', 'location', 'skillLevel', 'fee'],
        features: ['Sports clubs', 'Art classes', 'Book clubs', 'Cooking groups'],
        description: 'Join hobby groups and activities'
      },
      { 
        id: 'groups', 
        name: 'Groups & Clubs', 
        icon: '👥',
        fields: ['groupName', 'description', 'meetingSchedule', 'location', 'membership', 'contact'],
        features: ['Social groups', 'Professional networks', 'Cultural associations', 'Religious groups'],
        description: 'Join local groups and clubs'
      },
      { 
        id: 'volunteer', 
        name: 'Volunteer Opportunities', 
        icon: '🤝',
        fields: ['opportunityName', 'description', 'schedule', 'location', 'requirements', 'organization'],
        features: ['Community service', 'Charity work', 'Skill sharing', 'Social impact'],
        description: 'Volunteer and give back to community'
      }
    ],
    
    // Homes for Sale
    homesForSale: [
      { 
        id: 'owner', 
        name: 'For Property Owner', 
        icon: '👤',
        fields: ['propertyType', 'description', 'price', 'bedrooms', 'bathrooms', 'location', 'squareFeet', 'amenities'],
        features: ['Free Listing', 'Direct Buyer Contact', 'No Commission', 'Professional Photos'],
        description: 'Sell your property directly'
      },
      { 
        id: 'agent', 
        name: 'For Agent/Broker', 
        icon: '🤝',
        fields: ['agencyName', 'description', 'propertiesListed', 'experience', 'location', 'contact', 'services'],
        features: ['Multiple Listings', 'Professional Marketing', 'Open House Management', 'Negotiation Services'],
        description: 'List properties as a professional agent'
      }
    ],
    
    // IT Training
    itTraining: [
      { 
        id: 'sap', 
        name: 'SAP Training', 
        icon: '💼',
        fields: ['courseName', 'description', 'duration', 'mode', 'price', 'certification', 'location'],
        features: ['SAP IS Healthcare', 'SAP FICO', 'SAP MM', 'SAP SD'],
        description: 'Professional SAP certification courses'
      },
      { 
        id: 'cloud', 
        name: 'Cloud Computing', 
        icon: '☁️',
        fields: ['courseName', 'description', 'duration', 'mode', 'price', 'certification', 'location'],
        features: ['AWS Certified', 'Azure Solutions', 'Google Cloud', 'DevOps'],
        description: 'Cloud technology certification programs'
      }
    ]
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(2);
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setStep(3);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      console.log('Ad Posted:', {
        category: selectedCategory,
        subCategory: selectedSubCategory,
        ...formData
      });
      alert('Your ad has been posted successfully!');
      setLoading(false);
      setStep(1);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        contactName: '',
        phone: '',
        email: '',
      });
    }, 1500);
  };

  // Handle back navigation
  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setSelectedCategory(null);
      setStep(1);
    }
  };

  // Get field label based on field name
  const getFieldLabel = (field) => {
    const labels = {
      title: 'Title/Headline',
      description: 'Description',
      price: 'Price',
      rent: 'Monthly Rent',
      bedrooms: 'Number of Bedrooms',
      bathrooms: 'Number of Bathrooms',
      location: 'Location',
      contactName: 'Contact Name',
      phone: 'Phone Number',
      email: 'Email Address',
      squareFeet: 'Square Footage',
      amenities: 'Amenities',
      propertyType: 'Property Type',
      budget: 'Budget',
      preferences: 'Preferences',
      availableFrom: 'Available From',
      genderPreference: 'Gender Preference',
      roomType: 'Room Type',
      moveInDate: 'Move-in Date',
      spaceType: 'Type of Space',
      leaseTerms: 'Lease Terms',
      serviceName: 'Service Name',
      serviceType: 'Type of Service',
      ageGroup: 'Age Group',
      hours: 'Operating Hours',
      facilities: 'Facilities',
      experience: 'Years of Experience',
      availability: 'Availability',
      qualifications: 'Qualifications',
      ageGroups: 'Age Groups Covered',
      hourlyRate: 'Hourly Rate',
      areas: 'Areas Covered',
      frequency: 'Service Frequency',
      teamSize: 'Team Size',
      cuisineType: 'Cuisine Type',
      menuOptions: 'Menu Options',
      servingSize: 'Serving Size',
      careLevel: 'Care Level Required',
      certification: 'Certification',
      petTypes: 'Pet Types',
      subject: 'Subject',
      level: 'Level/Class',
      mode: 'Mode (Online/In-person)',
      pricePerHour: 'Price per Hour',
      itemName: 'Item Name',
      age: 'Item Age',
      condition: 'Condition',
      authenticity: 'Authenticity Proof',
      itemType: 'Item Type',
      material: 'Material',
      artist: 'Artist/Maker',
      partName: 'Part Name',
      compatibility: 'Vehicle Compatibility',
      warranty: 'Warranty',
      ageRange: 'Age Range',
      brand: 'Brand',
      
      genre: 'Genre',
      author: 'Author',
      applianceType: 'Appliance Type',
      dimensions: 'Dimensions',
      area: 'Area (sq ft)',
      specialization: 'Specialization',
      consultationType: 'Consultation Type',
      cuisine: 'Cuisine Specialty',
      capacity: 'Serving Capacity',
      danceStyle: 'Dance Style',
      schedule: 'Class Schedule',
      instructor: 'Instructor Name',
      musicGenre: 'Music Genre',
      duration: 'Service Duration',
      equipment: 'Equipment Provided',
      tripType: 'Trip Type',
      travelers: 'Number of Travelers',
      travelDates: 'Travel Dates',
      passengers: 'Number of Passengers',
      class: 'Travel Class',
      destination: 'Destination',
      checkInDate: 'Check-in Date',
      checkOutDate: 'Check-out Date',
      guests: 'Number of Guests',
      packageName: 'Package Name',
      inclusions: 'Package Inclusions',
      contactTime: 'Preferred Contact Time',
      portfolio: 'Portfolio Link',
      agencyName: 'Agency Name',
      propertiesListed: 'Properties Listed',
      services: 'Services Offered',
      courseName: 'Course Name',
      dailyRate: 'Daily Rental Rate',
      insurance: 'Insurance Details',
      jobTitle: 'Job Title',
      company: 'Company Name',
      salary: 'Salary',
      jobType: 'Job Type',
      skills: 'Required Skills',
      industry: 'Industry',
      requirements: 'Requirements',
      pay: 'Pay Rate',
      projectType: 'Project Type',
      deliverables: 'Project Deliverables',
      eventName: 'Event Name',
      date: 'Date',
      time: 'Time',
      venue: 'Venue',
      ticketPrice: 'Ticket Price',
      workshopName: 'Workshop Name',
      fee: 'Registration Fee',
      activityName: 'Activity Name',
      skillLevel: 'Skill Level',
      groupName: 'Group Name',
      meetingSchedule: 'Meeting Schedule',
      membership: 'Membership Details',
      opportunityName: 'Opportunity Name',
      organization: 'Organization Name'
    };
    
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  };

  // Get placeholder based on field name
  const getFieldPlaceholder = (field) => {
    const placeholders = {
      title: 'Enter a clear, descriptive title for your ad',
      description: 'Provide detailed information about what you are offering',
      price: 'Enter price in USD',
      rent: 'Monthly rental amount',
      location: 'City, State or full address',
      contactName: 'Your name',
      phone: '10-digit phone number',
      email: 'Your email address',
      roomType: 'e.g., "Single Room", "Shared Room", "Paying Guest"',
      moveInDate: 'e.g., "Immediate", "Next month"',
      spaceType: 'e.g., "Office Space", "Retail Space"',
      leaseTerms: 'e.g., "1 year lease", "Month-to-month"',
      serviceName: 'e.g., "Sunshine Daycare Center"',
      ageGroup: 'e.g., "2-5 years"',
      hours: 'e.g., "8 AM - 6 PM"',
      facilities: 'e.g., "Playground, Nap Room, CCTV"',
      experience: 'e.g., "5 years"',
      availability: 'e.g., "Monday-Friday, Full-time"',
      hourlyRate: 'e.g., "$15 per hour"',
      areas: 'e.g., "Living room, Kitchen, Bedrooms"',
      frequency: 'e.g., "Weekly, Bi-weekly, Monthly"',
      teamSize: 'e.g., "1-2 people"',
      cuisineType: 'e.g., "Indian, Italian, Mexican"',
      menuOptions: 'e.g., "Vegetarian, Non-vegetarian options"',
      careLevel: 'e.g., "Basic assistance, Medical care"',
      petTypes: 'e.g., "Dogs, Cats, Birds"',
      subject: 'e.g., "Mathematics, English, Science"',
      level: 'e.g., "Elementary, High School, College"',
      mode: 'e.g., "Online, In-person, Both"',
      itemName: 'e.g., "Vintage Clock, Painting, Furniture"',
      age: 'e.g., "50 years old"',
      condition: 'e.g., "Excellent, Good, Fair"',
      material: 'e.g., "Wood, Metal, Glass"',
      partName: 'e.g., "Brake Pads, Alternator, Battery"',
      compatibility: 'e.g., "Toyota Camry 2015-2020"',
      ageRange: 'e.g., "0-6 months, 1-2 years"',
      genre: 'e.g., "Fiction, Non-fiction, Mystery"',
      applianceType: 'e.g., "Refrigerator, Washing Machine, AC"',
      dimensions: 'e.g., "60"L x 30"W x 36"H"',
      propertyType: 'e.g., "Apartment, House, Condo"',
      area: 'e.g., "1200 sq ft"',
      specialization: 'e.g., "Vedic Astrology, Numerology"',
      consultationType: 'e.g., "Phone, Video, In-person"',
      cuisine: 'e.g., "North Indian, South Indian, Chinese"',
      capacity: 'e.g., "50 people"',
      danceStyle: 'e.g., "Bollywood, Bhangra, Salsa"',
      schedule: 'e.g., "Monday & Wednesday 6-7 PM"',
      musicGenre: 'e.g., "Bollywood, Western, Punjabi"',
      duration: 'e.g., "4 hours"',
      tripType: 'e.g., "Family vacation, Business trip, Honeymoon"',
      travelers: 'e.g., "2 adults, 1 child"',
      travelDates: 'e.g., "June 15-30, 2024"',
      passengers: 'e.g., "2 adults"',
      destination: 'e.g., "Delhi, Mumbai, Goa"',
      checkInDate: 'e.g., "June 15, 2024"',
      checkOutDate: 'e.g., "June 20, 2024"',
      guests: 'e.g., "2 adults"',
      packageName: 'e.g., "Golden Triangle Tour"',
      inclusions: 'e.g., "Flights, Hotels, Meals, Sightseeing"',
      contactTime: 'e.g., "10 AM - 4 PM weekdays"',
      portfolio: 'e.g., "Website or Instagram link"',
      agencyName: 'e.g., "Prime Realty Agency"',
      propertiesListed: 'e.g., "50+ properties"',
      services: 'e.g., "Buying, Selling, Renting, Legal Assistance"',
      courseName: 'e.g., "AWS Solutions Architect"',
      dailyRate: 'e.g., "$50 per day"',
      insurance: 'e.g., "Full coverage included"',
      jobTitle: 'e.g., "Software Engineer", "Marketing Manager"',
      company: 'e.g., "Your Company Name"',
      salary: 'e.g., "$60,000 per year"',
      jobType: 'e.g., "Full-time", "Part-time", "Contract"',
      skills: 'e.g., "JavaScript, React, Node.js"',
      industry: 'e.g., "Technology", "Healthcare", "Education"',
      requirements: 'e.g., "Bachelor\'s degree, 3+ years experience"',
      pay: 'e.g., "$20 per hour"',
      projectType: 'e.g., "Website Development", "Content Writing"',
      deliverables: 'e.g., "Complete website with 5 pages"',
      eventName: 'e.g., "Summer Music Festival"',
      date: 'e.g., "June 15, 2024"',
      time: 'e.g., "7:00 PM"',
      venue: 'e.g., "City Hall Auditorium"',
      ticketPrice: 'e.g., "$25 per ticket"',
      artist: 'e.g., "Local Band Name"',
      workshopName: 'e.g., "Digital Marketing Masterclass"',
      fee: 'e.g., "$50 registration fee"',
      activityName: 'e.g., "Yoga Classes", "Chess Club"',
      skillLevel: 'e.g., "Beginner", "Intermediate", "Advanced"',
      groupName: 'e.g., "Book Lovers Club", "Business Network Group"',
      meetingSchedule: 'e.g., "Every Saturday 10 AM"',
      membership: 'e.g., "Free", "$20 per month"',
      opportunityName: 'e.g., "Food Bank Volunteer"',
      organization: 'e.g., "Local Charity Organization"'
    };
    
    return placeholders[field] || `Enter ${field}`;
  };

  // Render current step
  const renderStep = () => {
    switch(step) {
      case 1:
        return renderCategoryStep();
      case 2:
        return renderSubCategoryStep();
      case 3:
        return renderFormStep();
      default:
        return renderCategoryStep();
    }
  };

  // Render category selection step - ENHANCED
  const renderCategoryStep = () => (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black mb-4">Post Your Ad on Listify</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Reach thousands of potential customers. Select a category that best describes what you want to post.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-[#27BB97] hover-lift relative"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-[#27BB97]/10">
                <div className="text-[#27BB97]">
                  {category.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-black group-hover:text-[#27BB97] text-left mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-700 text-sm text-left mb-3">
                  {category.description}
                </p>
                <div className="text-[#27BB97] font-semibold text-sm mb-2">
                  {category.tagline}
                </div>
              </div>
            </div>
            
            {/* Features List */}
            <div className="space-y-2 mb-4">
              {category.features?.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#27BB97] flex-shrink-0" />
                  <span className="text-left">{feature}</span>
                </div>
              ))}
              {category.features?.length > 4 && (
                <div className="text-sm text-gray-500 pl-6">
                  + {category.features.length - 4} more options
                </div>
              )}
            </div>
            
            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-[#27BB97]">
                  {category.stats}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Select</span>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#27BB97] group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Render subcategory selection step - ENHANCED
  const renderSubCategoryStep = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-black">
            Select Your {selectedCategory?.name} Type
          </h1>
          <p className="text-gray-700">
            Choose a specific option for <span className="font-semibold text-[#27BB97]">{selectedCategory?.name}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subCategories[selectedCategory?.id]?.map((subCategory) => (
          <button
            key={subCategory.id}
            onClick={() => handleSubCategorySelect(subCategory)}
            className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-[#27BB97] text-left hover-lift"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-2xl">{subCategory.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-black group-hover:text-[#27BB97] mb-2">
                  {subCategory.name}
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {subCategory.description}
                </p>
                
                {/* Features List */}
                <div className="space-y-1 mb-4">
                  {subCategory.features?.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#27BB97] rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#27BB97]" />
                <span className="text-[#27BB97] font-medium text-sm">Quick Post</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#27BB97] group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Render form step
  const renderFormStep = () => (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-black">
            Post Your {selectedSubCategory?.name}
          </h1>
          <p className="text-gray-700">
            Fill in the details for your ad in <span className="font-semibold text-[#27BB97]">{selectedCategory?.name}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Category Info Banner */}
          <div className="mb-8 p-4 bg-[#27BB97]/5 rounded-lg border border-[#27BB97]/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#27BB97]/10 rounded-lg">
                {selectedCategory?.icon}
              </div>
              <div>
                <h4 className="font-bold text-black">Posting in: {selectedCategory?.name}</h4>
                <p className="text-sm text-gray-700">{selectedSubCategory?.description}</p>
              </div>
            </div>
          </div>

          {/* Dynamic fields based on selected subcategory */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black mb-6 pb-4 border-b border-gray-200">
              Ad Details
            </h3>
            
            {selectedSubCategory?.fields?.map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  {getFieldLabel(field)}
                  <span className="text-[#27BB97] ml-1">*</span>
                </label>
                {field === 'description' ? (
                  <textarea
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27BB97] focus:border-[#27BB97] transition"
                    placeholder={getFieldPlaceholder(field)}
                    required
                  />
                ) : (
                  <input
                    type={field.includes('price') || field.includes('rate') || field.includes('rent') || field.includes('budget') || field.includes('fee') || field.includes('salary') || field.includes('pay') ? 'number' : 'text'}
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27BB97] focus:border-[#27BB97] transition"
                    placeholder={getFieldPlaceholder(field)}
                    required
                  />
                )}
              </div>
            ))}
          </div>

          {/* Contact Information Section */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-black mb-6">
              Contact Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Contact Name
                  <span className="text-[#27BB97] ml-1">*</span>
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                  <div className="pl-4 pr-3">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="flex-1 py-3 px-2 outline-none"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Phone Number
                  <span className="text-[#27BB97] ml-1">*</span>
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                  <div className="pl-4 pr-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 py-3 px-2 outline-none"
                    placeholder="10-digit phone number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Email Address
                  <span className="text-[#27BB97] ml-1">*</span>
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                  <div className="pl-4 pr-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex-1 py-3 px-2 outline-none"
                    placeholder="Your email address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  Location
                  <span className="text-[#27BB97] ml-1">*</span>
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#27BB97] focus-within:border-[#27BB97]">
                  <div className="pl-4 pr-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="flex-1 py-3 px-2 outline-none"
                    placeholder="City, State"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#27BB97] text-white font-semibold rounded-lg hover:bg-[#1FA987] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Post Ad Now
                  </>
                )}
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mt-4 text-center">
              By posting this ad, you agree to our terms of service. Your contact information will be visible to interested users.
            </p>
          </div>
        </div>
      </form>
    </div>
  );

  // Render progress steps
  const renderProgressSteps = () => (
    <div className="flex items-center justify-center mb-10">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-[#27BB97] text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>
          1
        </div>
        <div className={`w-32 h-1 ${step >= 2 ? 'bg-[#27BB97]' : 'bg-gray-200'}`}></div>
        
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-[#27BB97] text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>
          2
        </div>
        <div className={`w-32 h-1 ${step >= 3 ? 'bg-[#27BB97]' : 'bg-gray-200'}`}></div>
        
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-[#27BB97] text-white' : 'bg-gray-200 text-gray-500'} font-bold`}>
          3
        </div>
      </div>
      
      <div className="ml-8 space-y-1">
        <div className="text-sm font-medium text-gray-800">
          {step === 1 && 'Select Category'}
          {step === 2 && 'Choose Subcategory'}
          {step === 3 && 'Fill Details'}
        </div>
        <div className="text-xs text-gray-600">
          Step {step} of 3
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="">
        {/* Progress Steps */}
        {renderProgressSteps()}
        
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default PostaddPage;