// seed.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// --- 1. DUMMY DATA DEFINITIONS ---

const SPECIES_CATALOG = [
  {
    id: "spcMonsteraDeliciosa",
    common_name: "Cheese Plant",
    botanical_name: "Monstera deliciosa",
    ideal_water_interval_days: { min: 7, max: 10 },
    ideal_light_level: "bright_indirect",
    ideal_humidity_min: 60,
    growth_rate: "moderate",
    common_deficiencies: ["nitrogen", "root_rot"]
  }
];

const DUMMY_USER_ID = "test_user_12345";

const GARDEN_ENVIRONMENT = {
  id: "envLivingRoom",
  user_id: DUMMY_USER_ID,
  name: "Living Room",
  facing_direction: "South West",
  hardiness_zone: "9b",
  shelter_level: "mostly_sheltered",
  seasonal_sunlight_hours: {
    spring: { direct_hours: 3, indirect_hours: 2 },
    summer: { direct_hours: 4, indirect_hours: 3 },
    autumn: { direct_hours: 2, indirect_hours: 2 },
    winter: { direct_hours: 1, indirect_hours: 2 }
  },
  microclimate_notes: "Gets high late afternoon sun"
};

const GARDEN_PLANT = {
  id: "plantCheesePlant",
  user_id: DUMMY_USER_ID,
  species_id: "spcMonsteraDeliciosa",
  environment_id: "envLivingRoom",
  nickname: "Gouda",
  date_acquired: "2025-04-15",
  pot_size_inches: 15,
  pot_type: "terracotta",
  soil_mix: "generic potting soil",
  growth_objective: {
    primary_goal: "maximize_foliage",
    target_milestone: "Reach 5ft height with multi-lobed leaves within 1 year",
    priority_focus: "bushy_density"
  }
};

// --- 2. SEEDING FUNCTION ---

async function seedDatabase() {
  console.log("🌱 Starting Database Seed Process...");

  try {
    // 1. Seed Species Catalog
    console.log("--> Seeding species_catalog...");
    for (const species of SPECIES_CATALOG) {
      const { id, ...data } = species;
      await db.collection("species_catalog").doc(id).set(data);
    }

    // 2. Seed Garden Environment
    console.log("--> Seeding garden_environments...");
    const { id: envId, ...envData } = GARDEN_ENVIRONMENT;
    await db.collection("garden_environments").doc(envId).set(envData);

    // 3. Seed Plant Document
    console.log("--> Seeding plants...");
    const { id: plantId, ...plantData } = GARDEN_PLANT;
    const plantRef = db.collection("plants").doc(plantId);
    await plantRef.set(plantData);

    // 4. Seed Subcollections under Plant
    console.log("--> Seeding plant care logs & assessments...");
    
    // Health Assessment
    await plantRef.collection("health_assessments").add({
      timestamp: FieldValue.serverTimestamp(),
      image_url: "https://via.placeholder.com/600x400.png?text=Monstera+Sample",
      health_score: 65,
      status_summary: "Plant seems to be suffering due to insufficient light",
      objective_progress: {
        status: "under_observation",
        confidence_level: "medium",
        gap_analysis: "Growth is concentrated on one side with droopy leaves without proper shape",
        objective_aligned_suggestion: "Maintain current high-nitrogen liquid feed schedule during active growing season."
      },
      detected_issues: [],
      recommended_actions: ["To be added"]
    });

    console.log("✅ Database Seeding Complete!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

// Run script
seedDatabase();