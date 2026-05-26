import type { Payload, PayloadRequest } from 'payload'

const tourCategoriesData = [
  { title: 'Cultural Heritage', description: 'Explore ancient ruins, historic mosques, and living traditions', icon: '🕌' },
  { title: 'Adventure', description: 'Hiking, trekking, and outdoor expeditions', icon: '🏔️' },
  { title: 'Beach & Island', description: 'Crystal clear waters and pristine sandy beaches', icon: '🏖️' },
  { title: 'Food & Culinary', description: 'Taste local cuisines and cooking experiences', icon: '🍜' },
  { title: 'Pilgrimage', description: 'Umrah, Hajj preparation, and sacred journeys', icon: '🕋' },
  { title: 'Nature & Wildlife', description: 'Rainforests, national parks, and wildlife encounters', icon: '🌿' },
]

const toursData = [
  {
    title: 'Istanbul Heritage & Culture Tour',
    destination: 'Istanbul, Turkey',
    duration: '7 Days / 6 Nights',
    difficulty: 'easy' as const,
    price: 2499,
    highlights: [
      'Visit the iconic Hagia Sophia and Blue Mosque',
      'Cruise along the Bosphorus at sunset',
      'Explore the Grand Bazaar and Spice Market',
      'Traditional Turkish bath experience',
      'Guided tour of Topkapi Palace',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Istanbul', meals: ['dinner' as const], accommodation: 'Sultanahmet Hotel' },
      { day: 2, title: 'Old City Exploration', meals: ['breakfast' as const, 'lunch' as const], accommodation: 'Sultanahmet Hotel' },
      { day: 3, title: 'Bosphorus Cruise & Asian Side', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Sultanahmet Hotel' },
      { day: 4, title: 'Grand Bazaar & Spice Market', meals: ['breakfast' as const], accommodation: 'Sultanahmet Hotel' },
      { day: 5, title: 'Topkapi Palace & Cistern', meals: ['breakfast' as const, 'lunch' as const], accommodation: 'Sultanahmet Hotel' },
      { day: 6, title: 'Free Day & Turkish Bath', meals: ['breakfast' as const, 'dinner' as const], accommodation: 'Sultanahmet Hotel' },
      { day: 7, title: 'Departure', meals: ['breakfast' as const], accommodation: '' },
    ],
    pricing: { adult: 2499, child: 1899, infant: 499 },
    groupSize: { min: 4, max: 15 },
    included: ['Airport transfers', 'Hotel accommodation (6 nights)', 'Daily breakfast', 'English-speaking guide', 'Entrance fees to all sites', 'Bosphorus cruise ticket'],
    excluded: ['International flights', 'Travel insurance', 'Personal expenses', 'Optional activities', 'Meals not mentioned'],
    pickupLocations: [
      { location: 'Istanbul Airport (IST)', time: '10:00 AM' },
      { location: 'Sabiha Gokcen Airport (SAW)', time: '11:00 AM' },
    ],
    departureDates: [
      { date: '2026-07-15', status: 'available' as const },
      { date: '2026-08-05', status: 'limited' as const },
      { date: '2026-09-10', status: 'available' as const },
    ],
    faq: [
      { question: 'Is this tour suitable for families with children?', answer: 'Yes, this tour is family-friendly with an easy pace and plenty of breaks.' },
      { question: 'What is the cancellation policy?', answer: 'Free cancellation up to 30 days before departure. 50% refund for cancellations 15-29 days before.' },
    ],
    categoryIndex: 0, // Cultural Heritage
  },
  {
    title: 'Mount Kinabalu Summit Trek',
    destination: 'Sabah, Malaysia',
    duration: '4 Days / 3 Nights',
    difficulty: 'challenging' as const,
    price: 1299,
    highlights: [
      'Summit Southeast Asia\'s highest peak at 4,095m',
      'Via Ferrata experience on the mountain',
      'Stay at Laban Rata mountain lodge',
      'Witness sunrise above the clouds',
      'Explore Kinabalu National Park rainforest',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kota Kinabalu', meals: ['dinner' as const], accommodation: 'KK City Hotel' },
      { day: 2, title: 'Trek to Laban Rata (3,273m)', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Laban Rata Resthouse' },
      { day: 3, title: 'Summit Push & Descent', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'KK City Hotel' },
      { day: 4, title: 'Departure', meals: ['breakfast' as const], accommodation: '' },
    ],
    pricing: { adult: 1299, child: 999 },
    groupSize: { min: 2, max: 10 },
    included: ['Mountain guide', 'Climbing permit', 'Laban Rata accommodation', 'Meals during trek', 'Certificate of completion', 'Park entrance fee'],
    excluded: ['Flights to Kota Kinabalu', 'Travel insurance (mandatory)', 'Personal trekking gear', 'Tips for guide and porter'],
    pickupLocations: [
      { location: 'Kota Kinabalu International Airport', time: '2:00 PM' },
    ],
    departureDates: [
      { date: '2026-06-20', status: 'available' as const },
      { date: '2026-07-18', status: 'available' as const },
      { date: '2026-08-22', status: 'soldOut' as const },
    ],
    faq: [
      { question: 'How fit do I need to be?', answer: 'You should be in good physical condition and able to hike 6-8 hours per day with elevation gain. Prior hiking experience is recommended.' },
      { question: 'What gear do I need?', answer: 'Warm layers, rain jacket, headlamp, trekking poles (optional), and sturdy hiking boots. A full packing list will be provided upon booking.' },
    ],
    categoryIndex: 1, // Adventure
  },
  {
    title: 'Maldives Island Paradise Escape',
    destination: 'Maldives',
    duration: '5 Days / 4 Nights',
    difficulty: 'easy' as const,
    price: 3899,
    highlights: [
      'Overwater villa accommodation',
      'Snorkeling with manta rays and sea turtles',
      'Sunset dolphin cruise',
      'Private sandbank picnic',
      'Spa and wellness treatments',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Seaplane Transfer', meals: ['dinner' as const], accommodation: 'Overwater Villa' },
      { day: 2, title: 'Snorkeling & Water Sports', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Overwater Villa' },
      { day: 3, title: 'Dolphin Cruise & Sandbank Visit', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Overwater Villa' },
      { day: 4, title: 'Free Day & Spa', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Overwater Villa' },
      { day: 5, title: 'Departure', meals: ['breakfast' as const], accommodation: '' },
    ],
    pricing: { adult: 3899, child: 2499, infant: 0 },
    groupSize: { min: 2, max: 20 },
    included: ['Seaplane transfers', 'Overwater villa (4 nights)', 'Full board meals', 'Snorkeling equipment', 'Dolphin cruise', 'Sandbank picnic'],
    excluded: ['International flights', 'Travel insurance', 'Spa treatments', 'Scuba diving', 'Alcoholic beverages'],
    pickupLocations: [
      { location: 'Velana International Airport (MLE)', time: '12:00 PM' },
    ],
    departureDates: [
      { date: '2026-07-01', status: 'limited' as const },
      { date: '2026-08-15', status: 'available' as const },
      { date: '2026-10-01', status: 'available' as const },
      { date: '2026-12-20', status: 'available' as const },
    ],
    faq: [
      { question: 'Can non-swimmers enjoy this tour?', answer: 'Absolutely! Life jackets are provided for snorkeling, and there are plenty of land-based activities to enjoy.' },
      { question: 'Is the resort halal-friendly?', answer: 'Yes, all meals are halal-certified and prayer facilities are available on the island.' },
    ],
    categoryIndex: 2, // Beach & Island
  },
  {
    title: 'Penang Street Food Trail',
    destination: 'Penang, Malaysia',
    duration: '3 Days / 2 Nights',
    difficulty: 'easy' as const,
    price: 599,
    highlights: [
      'Guided food tour through George Town hawker stalls',
      'Cooking class with local chef',
      'Visit to spice gardens and nutmeg farms',
      'Street art walk in UNESCO heritage zone',
      'Night market food crawl',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Evening Food Crawl', meals: ['dinner' as const], accommodation: 'George Town Heritage Hotel' },
      { day: 2, title: 'Full Day Food Trail & Cooking Class', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'George Town Heritage Hotel' },
      { day: 3, title: 'Spice Garden & Departure', meals: ['breakfast' as const, 'lunch' as const], accommodation: '' },
    ],
    pricing: { adult: 599, child: 399 },
    groupSize: { min: 4, max: 12 },
    included: ['Airport transfers', 'Boutique hotel (2 nights)', 'All food tastings', 'Cooking class', 'Spice garden entrance', 'Local guide'],
    excluded: ['Flights', 'Travel insurance', 'Personal purchases', 'Additional meals'],
    pickupLocations: [
      { location: 'Penang International Airport', time: '3:00 PM' },
      { location: 'Butterworth Ferry Terminal', time: '4:00 PM' },
    ],
    departureDates: [
      { date: '2026-06-12', status: 'available' as const },
      { date: '2026-07-10', status: 'available' as const },
      { date: '2026-08-14', status: 'available' as const },
    ],
    faq: [
      { question: 'Are vegetarian options available?', answer: 'Yes, we can accommodate vegetarian and vegan diets. Please inform us at booking.' },
      { question: 'How much walking is involved?', answer: 'Expect 3-5 km of walking per day at a leisurely pace through George Town streets.' },
    ],
    categoryIndex: 3, // Food & Culinary
  },
  {
    title: 'Umrah Spiritual Journey',
    destination: 'Makkah & Madinah, Saudi Arabia',
    duration: '10 Days / 9 Nights',
    difficulty: 'moderate' as const,
    price: 4999,
    highlights: [
      'Perform Umrah with experienced mutawwif guide',
      'Stay in 5-star hotels near Haram',
      'Visit historical Islamic sites in Madinah',
      'Guided Ziyarah tours',
      'Small group for personalized experience',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Jeddah & Transfer to Makkah', meals: ['dinner' as const], accommodation: 'Makkah Hilton' },
      { day: 2, title: 'Umrah Rituals', meals: ['breakfast' as const, 'dinner' as const], accommodation: 'Makkah Hilton' },
      { day: 3, title: 'Free Day for Ibadah', meals: ['breakfast' as const, 'dinner' as const], accommodation: 'Makkah Hilton' },
      { day: 4, title: 'Makkah Ziyarah Tour', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Makkah Hilton' },
      { day: 5, title: 'Free Day for Ibadah', meals: ['breakfast' as const, 'dinner' as const], accommodation: 'Makkah Hilton' },
      { day: 6, title: 'Transfer to Madinah', meals: ['breakfast' as const, 'dinner' as const], accommodation: 'Madinah Oberoi' },
      { day: 7, title: 'Masjid Nabawi & Raudhah', meals: ['breakfast' as const, 'dinner' as const], accommodation: 'Madinah Oberoi' },
      { day: 8, title: 'Madinah Ziyarah Tour', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Madinah Oberoi' },
      { day: 9, title: 'Free Day in Madinah', meals: ['breakfast' as const, 'dinner' as const], accommodation: 'Madinah Oberoi' },
      { day: 10, title: 'Departure from Madinah', meals: ['breakfast' as const], accommodation: '' },
    ],
    pricing: { adult: 4999, child: 3999, infant: 999 },
    groupSize: { min: 10, max: 40 },
    included: ['Saudi visa processing', '5-star hotel accommodation', 'Daily breakfast and dinner', 'Experienced mutawwif guide', 'Ziyarah tours', 'Airport transfers', 'Inter-city transport'],
    excluded: ['International flights', 'Travel insurance', 'Personal expenses', 'Lunches (except where noted)', 'Ihram clothing'],
    pickupLocations: [
      { location: 'King Abdulaziz International Airport (JED)', time: 'Upon arrival' },
    ],
    departureDates: [
      { date: '2026-07-01', status: 'available' as const },
      { date: '2026-09-15', status: 'available' as const },
      { date: '2026-11-01', status: 'limited' as const },
    ],
    faq: [
      { question: 'Do you handle visa processing?', answer: 'Yes, we handle the complete Umrah visa processing. You only need to provide your passport and photos.' },
      { question: 'Is wheelchair assistance available?', answer: 'Yes, we can arrange wheelchair assistance at both Harams. Please let us know at booking.' },
    ],
    categoryIndex: 4, // Pilgrimage
  },
  {
    title: 'Borneo Rainforest & Orangutan Experience',
    destination: 'Sandakan, Sabah, Malaysia',
    duration: '5 Days / 4 Nights',
    difficulty: 'moderate' as const,
    price: 1599,
    highlights: [
      'Visit Sepilok Orangutan Rehabilitation Centre',
      'Night river cruise to spot pygmy elephants',
      'Kinabatangan River wildlife expedition',
      'Canopy walk through ancient rainforest',
      'Sun bear and proboscis monkey encounters',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Sandakan', meals: ['dinner' as const], accommodation: 'Sandakan Hotel' },
      { day: 2, title: 'Sepilok Orangutan & Sun Bear Centre', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Kinabatangan River Lodge' },
      { day: 3, title: 'River Safari & Night Cruise', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Kinabatangan River Lodge' },
      { day: 4, title: 'Rainforest Trek & Canopy Walk', meals: ['breakfast' as const, 'lunch' as const, 'dinner' as const], accommodation: 'Sandakan Hotel' },
      { day: 5, title: 'Departure', meals: ['breakfast' as const], accommodation: '' },
    ],
    pricing: { adult: 1599, child: 1199, infant: 299 },
    groupSize: { min: 4, max: 12 },
    included: ['All transfers', 'Accommodation', 'Full board meals', 'Park entrance fees', 'River cruises', 'English-speaking naturalist guide', 'Binoculars rental'],
    excluded: ['Flights to Sandakan', 'Travel insurance', 'Personal expenses', 'Camera equipment', 'Tips for guides'],
    pickupLocations: [
      { location: 'Sandakan Airport (SDK)', time: '11:00 AM' },
    ],
    departureDates: [
      { date: '2026-06-15', status: 'available' as const },
      { date: '2026-08-10', status: 'available' as const },
      { date: '2026-10-05', status: 'available' as const },
    ],
    faq: [
      { question: 'Will we definitely see orangutans?', answer: 'At Sepilok, sightings are almost guaranteed during feeding times. In the wild along the Kinabatangan, sightings are likely but not guaranteed.' },
      { question: 'What vaccinations are needed?', answer: 'No mandatory vaccinations, but we recommend consulting your doctor about hepatitis A/B and typhoid.' },
    ],
    categoryIndex: 5, // Nature & Wildlife
  },
]

export const seedTours = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('— Seeding tour categories...')

  const categoryDocs = []
  for (const cat of tourCategoriesData) {
    const doc = await payload.create({
      collection: 'tour-categories',
      data: {
        title: cat.title,
        description: cat.description,
        icon: cat.icon,
      },
      context: {
        disableRevalidate: true,
      },
    })
    categoryDocs.push(doc)
  }

  payload.logger.info('— Seeding tours...')

  const tourDocs = []
  for (const tour of toursData) {
    const doc = await payload.create({
      collection: 'tours',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: {
        title: tour.title,
        destination: tour.destination,
        duration: tour.duration,
        difficulty: tour.difficulty,
        price: tour.price,
        highlights: tour.highlights.map((h) => ({ highlight: h })),
        itinerary: tour.itinerary.map((i) => ({
          day: i.day,
          title: i.title,
          meals: i.meals,
          accommodation: i.accommodation,
        })),
        pricing: tour.pricing,
        groupSize: tour.groupSize,
        included: tour.included.map((i) => ({ item: i })),
        excluded: tour.excluded.map((i) => ({ item: i })),
        pickupLocations: tour.pickupLocations,
        departureDates: tour.departureDates,
        faq: tour.faq,
        tourCategories: [categoryDocs[tour.categoryIndex].id],
        _status: 'published',
        publishedAt: new Date().toISOString(),
      },
    })
    tourDocs.push(doc)
  }

  // Set related tours
  await payload.update({
    id: tourDocs[0].id,
    collection: 'tours',
    context: { disableRevalidate: true },
    data: { relatedTours: [tourDocs[1].id, tourDocs[4].id] },
  })
  await payload.update({
    id: tourDocs[1].id,
    collection: 'tours',
    context: { disableRevalidate: true },
    data: { relatedTours: [tourDocs[5].id, tourDocs[0].id] },
  })
  await payload.update({
    id: tourDocs[2].id,
    collection: 'tours',
    context: { disableRevalidate: true },
    data: { relatedTours: [tourDocs[3].id, tourDocs[5].id] },
  })
  await payload.update({
    id: tourDocs[3].id,
    collection: 'tours',
    context: { disableRevalidate: true },
    data: { relatedTours: [tourDocs[2].id, tourDocs[0].id] },
  })
  await payload.update({
    id: tourDocs[4].id,
    collection: 'tours',
    context: { disableRevalidate: true },
    data: { relatedTours: [tourDocs[0].id, tourDocs[3].id] },
  })
  await payload.update({
    id: tourDocs[5].id,
    collection: 'tours',
    context: { disableRevalidate: true },
    data: { relatedTours: [tourDocs[1].id, tourDocs[2].id] },
  })

  payload.logger.info(`Seeded ${tourDocs.length} tours and ${categoryDocs.length} tour categories!`)
}
