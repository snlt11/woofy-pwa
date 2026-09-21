import { createInitialAppState } from "./seed";
import { isRecord, readJson, writeJson } from "../lib/storage";

const STORAGE_KEY = "woofy.app-state.v1";

const LEGACY_KEYS = {
  careTasks: "woofy-care-tasks",
  mood: "woofy-mood",
  planner: "woofy-planner",
  plannerDate: "woofy-planner-date",
};

function normalizeSnapshot(input) {
  const seed = createInitialAppState();

  if (!isRecord(input)) return seed;

  const onboarding = isRecord(input.onboarding) ? input.onboarding : {};
  const pet = isRecord(input.pet) ? input.pet : {};
  const home = isRecord(input.home) ? input.home : {};
  const planner = isRecord(input.planner) ? input.planner : {};
  const health = isRecord(input.health) ? input.health : {};

  return {
    ...seed,
    ...input,
    version: 2,
    onboarding: { ...seed.onboarding, ...onboarding },
    pet: { ...seed.pet, ...pet },
    home: {
      ...seed.home,
      ...home,
      careTasks: Array.isArray(home.careTasks)
        ? home.careTasks
        : seed.home.careTasks,
    },
    planner: {
      ...seed.planner,
      ...planner,
      activities: Array.isArray(planner.activities)
        ? planner.activities
        : seed.planner.activities,
    },
    health: {
      ...seed.health,
      ...health,
      weightTrend: {
        ...seed.health.weightTrend,
        ...(isRecord(health.weightTrend) ? health.weightTrend : {}),
      },
      nextVetVisit: {
        ...seed.health.nextVetVisit,
        ...(isRecord(health.nextVetVisit) ? health.nextVetVisit : {}),
      },
      vaccination: {
        ...seed.health.vaccination,
        ...(isRecord(health.vaccination) ? health.vaccination : {}),
      },
      medication: {
        ...seed.health.medication,
        ...(isRecord(health.medication) ? health.medication : {}),
      },
      dailyActivity: {
        ...seed.health.dailyActivity,
        ...(isRecord(health.dailyActivity) ? health.dailyActivity : {}),
      },
    },
  };
}

function migrateLegacySnapshot() {
  const seed = createInitialAppState();
  const legacyCareTasks = readJson(LEGACY_KEYS.careTasks);
  const legacyMood = readJson(LEGACY_KEYS.mood);
  const legacyPlanner = readJson(LEGACY_KEYS.planner);
  const legacyPlannerDate = readJson(LEGACY_KEYS.plannerDate);

  const hasLegacyData =
    Array.isArray(legacyCareTasks) ||
    typeof legacyMood === "string" ||
    Array.isArray(legacyPlanner) ||
    typeof legacyPlannerDate === "string";

  if (!hasLegacyData) return seed;

  return normalizeSnapshot({
    ...seed,
    onboarding: {
      completed: true,
    },
    home: {
      ...seed.home,
      careTasks: Array.isArray(legacyCareTasks)
        ? legacyCareTasks
        : seed.home.careTasks,
      moodId: typeof legacyMood === "string" ? legacyMood : seed.home.moodId,
    },
    planner: {
      ...seed.planner,
      activities: Array.isArray(legacyPlanner)
        ? legacyPlanner
        : seed.planner.activities,
      selectedDate:
        typeof legacyPlannerDate === "string"
          ? legacyPlannerDate
          : seed.planner.selectedDate,
    },
  });
}

class LocalWoofyRepository {
  loadSnapshot() {
    const stored = readJson(STORAGE_KEY);

    if (stored !== null) {
      return normalizeSnapshot(stored);
    }

    const migrated = migrateLegacySnapshot();
    this.saveSnapshot(migrated);
    return migrated;
  }

  saveSnapshot(snapshot) {
    return writeJson(STORAGE_KEY, normalizeSnapshot(snapshot));
  }

  resetSnapshot() {
    const seed = createInitialAppState();
    this.saveSnapshot(seed);
    return seed;
  }
}

export const woofyRepository = new LocalWoofyRepository();
