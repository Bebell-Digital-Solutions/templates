/**
 * 30 FITNESS LINE ART SVG DATASET
 * Clean 24x24 viewBox vectors specifically crafted for minimal visual style.
 */
const FITNESS_ICONS = [
    // 1. GYM EQUIPMENT (6 Icons)
    {
        id: 'dumbbell',
        title: 'Hex Dumbbell',
        category: 'Equipment',
        desc: 'Classic weightlifting dumbbell for strength training.',
        paths: `<path d="M6.5 6.5h-1a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h1m11-11h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1M6.5 5h-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h1M17.5 5h1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-1M6.5 12h11" />`
    },
    {
        id: 'kettlebell',
        title: 'Kettlebell',
        category: 'Equipment',
        desc: 'Cast-iron kettlebell with ergonomic handle.',
        paths: `<path d="M8 8V6a4 4 0 0 1 8 0v2M6 11a6 6 0 1 0 12 0 6 6 0 0 0-12 0zM10 13a2 2 0 1 0 4 0" />`
    },
    {
        id: 'barbell',
        title: 'Olympic Barbell',
        category: 'Equipment',
        desc: 'Heavy loaded barbell for squats and deadlifts.',
        paths: `<path d="M2 12h20M5 7v10M8 5v14M16 5v14M19 7v10M3 9v6M21 9v6" />`
    },
    {
        id: 'bench-press',
        title: 'Workout Bench',
        category: 'Equipment',
        desc: 'Adjustable flat and incline fitness bench.',
        paths: `<path d="M3 17h18M5 17v-4h14v4M7 13V8h2v5M17 13V7h2v6" />`
    },
    {
        id: 'gym-rings',
        title: 'Gymnastic Rings',
        category: 'Equipment',
        desc: 'Suspension rings for bodyweight calisthenics.',
        paths: `<path d="M6 3v6M18 3v6M7 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />`
    },
    {
        id: 'weight-plate',
        title: 'Bumper Plate',
        category: 'Equipment',
        desc: 'Heavy duty rubberized barbell weight plate.',
        paths: `<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="6" stroke-dasharray="2 2" />`
    },

    // 2. YOGA & WELLNESS (6 Icons)
    {
        id: 'yoga-mat',
        title: 'Rolled Yoga Mat',
        category: 'Yoga',
        desc: 'Unrolled minimal workout and yoga floor mat.',
        paths: `<path d="M4 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8M4 15V5" />`
    },
    {
        id: 'lotus-pose',
        title: 'Lotus Meditation',
        category: 'Yoga',
        desc: 'Mindful meditation lotus flower line symbol.',
        paths: `<path d="M12 13c-2-3-6-4-8 0 2 5 8 7 8 7s6-2 8-7c-2-4-6-3-8 0zM12 13V6M12 6c-1-2-3-3-4-3 0 2 2 4 4 4zM12 6c1-2 3-3 4-3 0 2-2 4-4 4z" />`
    },
    {
        id: 'yin-yang',
        title: 'Yin Yang Balance',
        category: 'Yoga',
        desc: 'Harmonious energy balance and wellness icon.',
        paths: `<circle cx="12" cy="12" r="9" /><path d="M12 3a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9" /><circle cx="12" cy="7.5" r="1.2" fill="currentColor" /><circle cx="12" cy="16.5" r="1.2" fill="currentColor" />`
    },
    {
        id: 'foam-roller',
        title: 'Foam Roller',
        category: 'Yoga',
        desc: 'Deep tissue recovery foam roller.',
        paths: `<rect x="4" y="7" width="16" height="10" rx="3" /><path d="M8 7v10M12 7v10M16 7v10" />`
    },
    {
        id: 'candle-zen',
        title: 'Spa Candle',
        category: 'Yoga',
        desc: 'Aromatherapy relax candle for recovery.',
        paths: `<path d="M6 10h12v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V10zM12 4c-1 1.5-1.5 2.5 0 4" />`
    },
    {
        id: 'stretch-figure',
        title: 'Yoga Stretch',
        category: 'Yoga',
        desc: 'Stylized posture pose silhouette vector.',
        paths: `<circle cx="12" cy="5" r="2" /><path d="M5 20l5-4 2 2 4-5 3 2M12 11v2" />`
    },

    // 3. CARDIO & RUNNING (6 Icons)
    {
        id: 'running-shoe',
        title: 'Running Shoe',
        category: 'Cardio',
        desc: 'Ergonomic athletic sneaker for distance running.',
        paths: `<path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2l-3-4-4 1-3-3-6 2v5zM7 13l2-1M10 12l2-1" />`
    },
    {
        id: 'treadmill',
        title: 'Cardio Treadmill',
        category: 'Cardio',
        desc: 'Electronic indoor running treadmill machine.',
        paths: `<path d="M3 18h16l2-5H8M5 13l3-8h5M18 18v2M4 18v2" />`
    },
    {
        id: 'heart-rate',
        title: 'Pulse Heartbeat',
        category: 'Cardio',
        desc: 'Cardiovascular heart rate pulse monitor line.',
        paths: `<path d="M3 12h4l2-5 3 10 3-7 2 2h4" /><path d="M12 4.5C10.5 3 8 3 6.5 4.5S5 8.5 12 15c7-6.5 7-9 5.5-10.5S13.5 3 12 4.5z" opacity="0.3" />`
    },
    {
        id: 'jump-rope',
        title: 'Speed Jump Rope',
        category: 'Cardio',
        desc: 'High speed skipping rope for stamina conditioning.',
        paths: `<path d="M4 6v4a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0zM18 14v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-2 0zM5 11c0 6 3 9 7 9s7-3 7-9" />`
    },
    {
        id: 'stopwatch',
        title: 'Interval Timer',
        category: 'Cardio',
        desc: 'Precision stopwatch for HIIT and lap timing.',
        paths: `<circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M12 2v3M10 2h4" />`
    },
    {
        id: 'exercise-bike',
        title: 'Spinning Bike',
        category: 'Cardio',
        desc: 'Stationary gym workout bicycle.',
        paths: `<circle cx="6" cy="16" r="3" /><circle cx="18" cy="16" r="3" /><path d="M6 16l4-8h4l4 8M10 8L8 4h3M14 8l1-3h3" />`
    },

    // 4. BODYBUILDING & STRENGTH (6 Icons)
    {
        id: 'biceps-flex',
        title: 'Flexed Biceps',
        category: 'Strength',
        desc: 'Muscle arm flex representing physical power.',
        paths: `<path d="M4 14c0 4 3 6 7 6s7-2 7-6a4 4 0 0 0-4-4h-1a3 3 0 0 1-3-3 2 2 0 0 0-4 0 4 4 0 0 0 2 3.5" />`
    },
    {
        id: 'torso-abs',
        title: 'Abs Core',
        category: 'Strength',
        desc: 'Muscular athletic torso definition line.',
        paths: `<path d="M8 4h8l1 15H7L8 4zM12 4v15M8 9h8M8 14h8" />`
    },
    {
        id: 'gym-vest',
        title: 'Tank Top',
        category: 'Strength',
        desc: 'Breathable athletic workout shirt stringer.',
        paths: `<path d="M7 3l3 2c2 0 2 0 4 0l3-2 2 5-2 3v10H7V11L5 8l2-5z" />`
    },
    {
        id: 'weight-belt',
        title: 'Lifting Belt',
        category: 'Strength',
        desc: 'Lumbar support weightlifting leather belt.',
        paths: `<rect x="2" y="8" width="20" height="8" rx="2" /><rect x="8" y="7" width="5" height="10" rx="1" /><path d="M10 10h1v4h-1z" />`
    },
    {
        id: 'grip-strengthener',
        title: 'Hand Gripper',
        category: 'Strength',
        desc: 'Forearm and crush grip strength trainer.',
        paths: `<path d="M12 4a3 3 0 0 0-3 3v13M12 4a3 3 0 0 1 3 3v13M12 4v3" />`
    },
    {
        id: 'trophy-cup',
        title: 'Champion Trophy',
        category: 'Strength',
        desc: 'First place athletic achievement trophy.',
        paths: `<path d="M6 9a6 6 0 0 0 12 0V4H6v5zM6 6H3v2a3 3 0 0 0 3 3M18 6h3v2a3 3 0 0 1-3 3M12 15v4M8 21h8" />`
    },

    // 5. NUTRITION & HYDRATION (6 Icons)
    {
        id: 'water-bottle',
        title: 'Shaker Bottle',
        category: 'Nutrition',
        desc: 'Protein shaker bottle with measurement scale.',
        paths: `<path d="M7 7h10l-1 14H8L7 7zM9 3h6v4H9V3zM6 7h12" />`
    },
    {
        id: 'apple-fit',
        title: 'Healthy Apple',
        category: 'Nutrition',
        desc: 'Fresh fruit organic nutrition icon.',
        paths: `<path d="M12 21c-4.5 0-7-3-7-7.5C5 8.5 8.5 7 12 9c3.5-2 7-.5 7 4.5 0 4.5-2.5 7.5-7 7.5zM12 9V5c1-1 3-1 3-1" />`
    },

    {
        id: 'measuring-tape',
        title: 'Waist Tape',
        category: 'Nutrition',
        desc: 'Body circumference measurement tape.',
        paths: `<circle cx="12" cy="12" r="8" /><path d="M12 8v8M10 10h4M10 14h4" />`
    },
    {
        id: 'avocado-half',
        title: 'Avocado Fat',
        category: 'Nutrition',
        desc: 'Healthy keto fats avocado vector.',
        paths: `<path d="M12 3c-4 0-7 6-7 12a7 7 0 0 0 14 0c0-6-3-12-7-12z" /><circle cx="12" cy="14" r="3" />`
    },
    {
        id: 'supplement-pill',
        title: 'Vitamin Capsule',
        category: 'Nutrition',
        desc: 'Fitness supplement and dietary capsule.',
        paths: `<rect x="6" y="9" width="12" height="6" rx="3" transform="rotate(-45 12 12)" /><path d="M9.5 14.5l5-5" />`
    },
    {
        id: 'weight-scale',
        title: 'Digital Scale',
        category: 'Nutrition',
        desc: 'Body weight measurement bathroom scale.',
        paths: `<rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 8h6M12 8v2" />`
    }
];

// Preset Color Schemes
const PRESET_THEMES = [
    { id: 'mono', label: 'Dark Mono', stroke: '#0f172a', fill: '#f8fafc', enableFill: false },
    { id: 'emerald', label: 'Neon Bio', stroke: '#059669', fill: '#d1fae5', enableFill: true },
    { id: 'cobalt', label: 'Tech Blue', stroke: '#2563eb', fill: '#dbeafe', enableFill: true },
    { id: 'crimson', label: 'Power Red', stroke: '#dc2626', fill: '#fee2e2', enableFill: true },
];

