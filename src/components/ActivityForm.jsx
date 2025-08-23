import React, { useState } from "react";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    startTime: "",
    additionalMetrics: {
      distance: "",
      heartRate: "",
      location: "",
    },
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
      metrics: ["distance", "heartRate", "location"],
    },
    {
      value: "WALKING",
      label: "Walking",
      icon: "🚶‍♂️",
      color: "from-green-400 to-green-600",
      metrics: ["distance", "location"],
    },
    {
      value: "CYCLING",
      label: "Cycling",
      icon: "🚴‍♂️",
      color: "from-blue-400 to-blue-600",
      metrics: ["distance", "heartRate", "location"],
    },
    {
      value: "SWIMMING",
      label: "Swimming",
      icon: "🏊‍♂️",
      color: "from-cyan-400 to-cyan-600",
      metrics: ["distance", "heartRate", "location"],
    },
    {
      value: "WEIGHT_TRAINING",
      label: "Weight Training",
      icon: "🏋️‍♂️",
      color: "from-purple-400 to-purple-600",
      metrics: ["heartRate", "location"],
    },
    {
      value: "YOGA",
      label: "Yoga",
      icon: "🧘‍♀️",
      color: "from-pink-400 to-pink-600",
      metrics: ["heartRate", "location"],
    },
    {
      value: "HIT",
      label: "HIIT",
      icon: "💪",
      color: "from-orange-400 to-orange-600",
      metrics: ["heartRate", "location"],
    },
    {
      value: "CARDIO",
      label: "Cardio",
      icon: "❤️",
      color: "from-red-500 to-pink-500",
      metrics: ["heartRate", "location"],
    },
    {
      value: "STRETCHING",
      label: "Stretching",
      icon: "🤸‍♀️",
      color: "from-indigo-400 to-indigo-600",
      metrics: ["location"],
    },
    {
      value: "OTHER",
      label: "Other",
      icon: "🏃‍♀️",
      color: "from-gray-400 to-gray-600",
      metrics: ["distance", "heartRate", "location"],
    },
  ];

  const selectedActivity = activityTypes.find((a) => a.value === activity.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Clean up additionalMetrics by removing empty values
      const cleanedMetrics = {};
      Object.entries(activity.additionalMetrics).forEach(([key, value]) => {
        if (value !== "") {
          cleanedMetrics[key] =
            key === "distance" || key === "heartRate"
              ? parseFloat(value) || value
              : value;
        }
      });

      const activityData = {
        ...activity,
        duration: parseInt(activity.duration),
        caloriesBurned: parseInt(activity.caloriesBurned),
        additionalMetrics: cleanedMetrics,
      };

      await addActivity(activityData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onActivityAdded();
      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        startTime: "",
        additionalMetrics: {
          distance: "",
          heartRate: "",
          location: "",
        },
      });
    } catch (error) {
      setError("Failed to add activity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdditionalMetricChange = (key, value) => {
    setActivity({
      ...activity,
      additionalMetrics: {
        ...activity.additionalMetrics,
        [key]: value,
      },
    });
  };

  const renderMetricField = (metricKey) => {
    const metricConfig = {
      distance: {
        label: "Distance (km)",
        type: "number",
        step: "0.1",
        min: "0",
        placeholder: "Enter distance in km",
        icon: (
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ),
      },
      heartRate: {
        label: "Heart Rate (bpm)",
        type: "number",
        min: "50",
        max: "220",
        placeholder: "Enter heart rate",
        icon: (
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        ),
      },
      location: {
        label: "Location",
        type: "text",
        placeholder: "Enter location",
        icon: (
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ),
      },
    };

    const config = metricConfig[metricKey];

    return (
      <div key={metricKey}>
        <label
          htmlFor={metricKey}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {config.label}
        </label>
        <div className="relative">
          <input
            id={metricKey}
            type={config.type}
            min={config.min}
            max={config.max}
            step={config.step}
            value={activity.additionalMetrics[metricKey]}
            onChange={(e) =>
              handleAdditionalMetricChange(metricKey, e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder={config.placeholder}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {config.icon}
          </div>
        </div>
      </div>
    );
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
        <div className="space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-3">
            {activityTypes.slice(0, 4).map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setActivity({ ...activity, type: type.value })}
                className={`relative p-3 rounded-xl border-2 transition-all duration-200 min-h-[80px] flex flex-col items-center justify-center ${
                  activity.type === type.value
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center w-full">
                  <div className="text-lg mb-1">{type.icon}</div>
                  <div
                    className={`text-xs font-medium leading-tight ${
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-3">
            {activityTypes.slice(4, 7).map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setActivity({ ...activity, type: type.value })}
                className={`relative p-3 rounded-xl border-2 transition-all duration-200 min-h-[80px] flex flex-col items-center justify-center ${
                  activity.type === type.value
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center w-full">
                  <div className="text-lg mb-1">{type.icon}</div>
                  <div
                    className={`text-xs font-medium leading-tight ${
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-3">
            {activityTypes.slice(7).map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setActivity({ ...activity, type: type.value })}
                className={`relative p-3 rounded-xl border-2 transition-all duration-200 min-h-[80px] flex flex-col items-center justify-center ${
                  activity.type === type.value
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center w-full">
                  <div className="text-lg mb-1">{type.icon}</div>
                  <div
                    className={`text-xs font-medium leading-tight ${
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="startTime"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Start Time
        </label>
        <div className="relative">
          <input
            id="startTime"
            type="datetime-local"
            value={activity.startTime}
            onChange={(e) =>
              setActivity({ ...activity, startTime: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

      {selectedActivity &&
        selectedActivity.metrics &&
        selectedActivity.metrics.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Additional Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedActivity.metrics.map((metric) =>
                renderMetricField(metric)
              )}
            </div>
          </div>
        )}

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
