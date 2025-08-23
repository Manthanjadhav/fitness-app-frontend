import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const activityConfig = {
    RUNNING: {
      icon: "🏃‍♂️",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    WALKING: {
      icon: "🚶‍♂️",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    CYCLING: {
      icon: "🚴‍♂️",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    SWIMMING: {
      icon: "🏊‍♂️",
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-700",
    },
    WEIGHT_TRAINING: {
      icon: "🏋️‍♂️",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    YOGA: {
      icon: "🧘‍♀️",
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
    },
    HIT: {
      icon: "💪",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    CARDIO: {
      icon: "❤️",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    STRETCHING: {
      icon: "🤸‍♀️",
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
    OTHER: {
      icon: "🏃‍♀️",
      color: "from-gray-400 to-gray-600",
      bgColor: "bg-gray-50",
      textColor: "text-gray-700",
    },
  };

  const formatActivityType = (type) => {
    switch (type) {
      case "WEIGHT_TRAINING":
        return "Weight Training";
      case "HIT":
        return "HIIT";
      default:
        return type.charAt(0) + type.slice(1).toLowerCase();
    }
  };

  const fetchActivities = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      setError("Failed to load activities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
          <button
            onClick={fetchActivities}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No activities yet
        </h3>
        <p className="text-gray-600">
          Start tracking your fitness journey by adding your first activity!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        // Use the correct property name - could be 'type' or 'activityType'
        const activityType = activity.type || activity.activityType;
        const config = activityConfig[activityType] || activityConfig.RUNNING;

        return (
          <div
            key={activity.id}
            onClick={() => navigate(`/activities/${activity.id}`)}
            className="group bg-white border border-gray-200 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center text-xl shadow-sm`}
                >
                  {config.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                    {formatActivityType(activityType)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {activity.startTime
                      ? new Date(activity.startTime).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : new Date(activity.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                  </p>
                </div>
              </div>

              <div className="flex space-x-6 text-right">
                <div>
                  <div className="flex items-center space-x-1 text-gray-400 mb-1">
                    <svg
                      className="w-4 h-4"
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
                    <span className="text-xs">Duration</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {activity.duration}m
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-1 text-gray-400 mb-1">
                    <svg
                      className="w-4 h-4"
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
                    <span className="text-xs">Calories</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {activity.caloriesBurned}
                  </p>
                </div>

                {/* Show additional metrics if available */}
                {activity.additionalMetrics && (
                  <>
                    {activity.additionalMetrics.distance && (
                      <div>
                        <div className="flex items-center space-x-1 text-gray-400 mb-1">
                          <svg
                            className="w-4 h-4"
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
                          <span className="text-xs">Distance</span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {activity.additionalMetrics.distance}km
                        </p>
                      </div>
                    )}

                    {activity.additionalMetrics.heartRate && (
                      <div>
                        <div className="flex items-center space-x-1 text-gray-400 mb-1">
                          <svg
                            className="w-4 h-4"
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
                          <span className="text-xs">Heart Rate</span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {activity.additionalMetrics.heartRate}
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Show location if available */}
            {activity.additionalMetrics &&
              activity.additionalMetrics.location && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4"
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
                    <span>{activity.additionalMetrics.location}</span>
                  </div>
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default ActivityList;
