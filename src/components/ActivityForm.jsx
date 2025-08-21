import React, { useState } from "react";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const activityTypes = [
    {
      value: "RUNNING",
      label: "Running",
      icon: "🏃‍♂️",
      color: "from-red-400 to-red-600",
    },
    {
      value: "WALKING",
      label: "Walking",
      icon: "🚶‍♂️",
      color: "from-green-400 to-green-600",
    },
    {
      value: "CYCLING",
      label: "Cycling",
      icon: "🚴‍♂️",
      color: "from-blue-400 to-blue-600",
    },
  ];

  const selectedActivity = activityTypes.find((a) => a.value === activity.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await addActivity(activity);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onActivityAdded();
      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        additionalMetrics: {},
      });
    } catch (error) {
      setError("Failed to add activity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Activity added successfully! 🎉
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Activity Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {activityTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setActivity({ ...activity, type: type.value })}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                activity.type === type.value
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{type.icon}</div>
                <div
                  className={`text-sm font-medium ${
                    activity.type === type.value
                      ? "text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  {type.label}
                </div>
              </div>
              {activity.type === type.value && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Duration (minutes)
        </label>
        <div className="relative">
          <input
            id="duration"
            type="number"
            min="1"
            required
            value={activity.duration}
            onChange={(e) =>
              setActivity({ ...activity, duration: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter duration"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="calories"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Calories Burned
        </label>
        <div className="relative">
          <input
            id="calories"
            type="number"
            min="1"
            required
            value={activity.caloriesBurned}
            onChange={(e) =>
              setActivity({ ...activity, caloriesBurned: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter calories burned"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
            </svg>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-gradient-to-r ${
          selectedActivity.color
        } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform ${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 shadow-lg hover:shadow-xl"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            <span>Adding Activity...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>{selectedActivity.icon}</span>
            <span>Add Activity</span>
          </div>
        )}
      </button>
    </form>
  );
};

export default ActivityForm;
