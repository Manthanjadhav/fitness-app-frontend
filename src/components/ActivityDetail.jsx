import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getActivityDetail } from "../services/api";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchActivityDetail = async () => {
      setLoading(true);
      setError("");

      try {
        // Wait for 10 seconds before making the API call
        await new Promise((resolve) => setTimeout(resolve, 10000));

        // Make the API call after the delay
        const response = await getActivityDetail(id);
        setActivity(response.data);
      } catch (error) {
        setError("Failed to load activity details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActivityDetail();
    }
  }, [id]);

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

  const renderAdditionalMetrics = () => {
    if (
      !activity.additionalMetrics ||
      Object.keys(activity.additionalMetrics).length === 0
    ) {
      return null;
    }

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Additional Metrics
            </h2>
            <p className="text-gray-600 text-sm">Detailed performance data</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {activity.additionalMetrics.distance && (
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
              </div>
              <p className="text-3xl font-bold text-teal-700 mb-1">
                {activity.additionalMetrics.distance}
              </p>
              <p className="text-teal-600 text-sm font-medium">Kilometers</p>
            </div>
          )}

          {activity.additionalMetrics.heartRate && (
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
              </div>
              <p className="text-3xl font-bold text-pink-700 mb-1">
                {activity.additionalMetrics.heartRate}
              </p>
              <p className="text-pink-600 text-sm font-medium">BPM</p>
            </div>
          )}

          {activity.additionalMetrics.location && (
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
              </div>
              <p className="text-xl font-bold text-indigo-700 mb-1 px-2">
                {activity.additionalMetrics.location}
              </p>
              <p className="text-indigo-600 text-sm font-medium">Location</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">
                Loading activity details...
              </p>
              <p className="text-gray-500 text-sm mt-2">
                This may take up to 10 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/activities")}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Activities</span>
          </button>

          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-xl inline-block">
              <div className="flex items-center space-x-3 mb-2">
                <svg
                  className="w-6 h-6"
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
                <span className="text-lg font-semibold">
                  {error || "Activity not found"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const config =
    activityConfig[activity.activityType] || activityConfig.RUNNING;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <button
          onClick={() => navigate("/activities")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Activities</span>
        </button>

        {/* Activity Overview Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div
                className={`w-16 h-16 ${config.bgColor} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
              >
                {config.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {formatActivityType(activity.activityType)} Session
                </h1>
                <p className="text-gray-600">
                  {activity.startTime
                    ? new Date(activity.startTime).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date(activity.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
              <p className="text-3xl font-bold text-blue-700 mb-1">
                {activity.duration}
              </p>
              <p className="text-blue-600 text-sm font-medium">Minutes</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
              <p className="text-3xl font-bold text-orange-700 mb-1">
                {activity.caloriesBurned}
              </p>
              <p className="text-orange-600 text-sm font-medium">
                Calories Burned
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-700 mb-1">
                {activity.duration > 0
                  ? Math.round(activity.caloriesBurned / activity.duration)
                  : 0}
              </p>
              <p className="text-green-600 text-sm font-medium">Cal/Min</p>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        {renderAdditionalMetrics()}

        {/* AI Recommendations */}
        {activity.recommendation && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  AI-Powered Analysis
                </h2>
                <p className="text-gray-600 text-sm">
                  Personalized insights for your workout
                </p>
              </div>
            </div>

            {/* Analysis Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Performance Analysis
                </h3>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {activity.recommendation}
                </p>
              </div>
            </div>

            {/* Improvements Section */}
            {activity.improvements && activity.improvements.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Areas for Improvement
                  </h3>
                </div>
                <div className="space-y-4">
                  {activity.improvements.map((improvement, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {improvement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions Section */}
            {activity.suggestions && activity.suggestions.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Personalized Suggestions
                  </h3>
                </div>
                <div className="space-y-4">
                  {activity.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500 hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3l14 9-14 9V3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {suggestion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Guidelines Section */}
            {activity.safety && activity.safety.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Safety Guidelines
                  </h3>
                </div>
                <div className="space-y-4">
                  {activity.safety.map((safety, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border-l-4 border-red-500 hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {safety}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No recommendations message */}
            {!activity.improvements &&
              !activity.suggestions &&
              !activity.safety && (
                <div className="text-center py-8">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No additional recommendations
                  </h3>
                  <p className="text-gray-600">
                    Keep up the great work with your fitness journey!
                  </p>
                </div>
              )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/activities")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span>View All Activities</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
