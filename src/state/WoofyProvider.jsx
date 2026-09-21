import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { woofyRepository } from "../data";

export const WoofyContext = createContext(null);

export function WoofyProvider({ children }) {
  const [state, setState] = useState(() => woofyRepository.loadSnapshot());

  const commit = useCallback((update) => {
    setState((current) => {
      const next =
        typeof update === "function" ? update(current) : update;

      woofyRepository.saveSnapshot(next);
      return next;
    });
  }, []);

  const actions = useMemo(
    () => ({
      completeOnboarding() {
        commit((current) => ({
          ...current,
          onboarding: {
            ...current.onboarding,
            completed: true,
            profileCompleted: true,
          },
        }));
      },

      savePetProfile(patch) {
        commit((current) => {
          const pet = {
            ...current.pet,
            ...patch,
          };

          return {
            ...current,
            pet,
            health: {
              ...current.health,
              weightTrend: {
                ...current.health.weightTrend,
                valueKg: pet.weightKg,
              },
              nextVetVisit: {
                ...current.health.nextVetVisit,
                clinic:
                  pet.primaryVet ||
                  current.health.nextVetVisit.clinic,
              },
            },
          };
        });
      },

      setMood(moodId) {
        commit((current) => ({
          ...current,
          home: {
            ...current.home,
            moodId,
          },
        }));
      },

      toggleCareTask(taskId) {
        commit((current) => ({
          ...current,
          home: {
            ...current.home,
            careTasks: current.home.careTasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          },
        }));
      },

      setPlannerDate(selectedDate) {
        commit((current) => ({
          ...current,
          planner: {
            ...current.planner,
            selectedDate,
          },
        }));
      },

      togglePlannerActivity(activityId) {
        commit((current) => ({
          ...current,
          planner: {
            ...current.planner,
            activities: current.planner.activities.map((activity) =>
              activity.id === activityId
                ? { ...activity, completed: !activity.completed }
                : activity
            ),
          },
        }));
      },

      updatePet(patch) {
        commit((current) => {
          const pet = {
            ...current.pet,
            ...patch,
          };

          return {
            ...current,
            pet,
            health: {
              ...current.health,
              weightTrend: {
                ...current.health.weightTrend,
                valueKg: pet.weightKg,
              },
              nextVetVisit: {
                ...current.health.nextVetVisit,
                clinic:
                  pet.primaryVet ||
                  current.health.nextVetVisit.clinic,
              },
            },
          };
        });
      },

      resetApp() {
        setState(woofyRepository.resetSnapshot());
      },
    }),
    [commit]
  );

  const value = useMemo(
    () => ({ state, actions }),
    [actions, state]
  );

  return (
    <WoofyContext.Provider value={value}>
      {children}
    </WoofyContext.Provider>
  );
}
