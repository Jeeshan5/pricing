import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PricingCard from "./components/PricingCard";
import PricingGrid from "./components/PricingGrid";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import { usePricingData, useStats } from "./hooks/usePricingData";
import { THEME_COLORS } from "./constants";

const App = () => {
  const { data, loading, error } = usePricingData();
  const { stats, error: statsError } = useStats();

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <LoadingSpinner message="Loading Premium Plans..." />;
  }

  if (error) {
    return (
      <ErrorBoundary
        error={error}
        onRetry={handleRetry}
        title="Unable to Load Pricing Plans"
        description="We're having trouble connecting to our servers. Please check your connection and try again."
      />
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${THEME_COLORS.gradients.primary} text-white`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <Header version={data?.version} />
        
        <HeroSection
          title={data?.title}
          subtitle={data?.subtitle}
        />

        {/* Pricing Cards Grid */}
        <PricingGrid className="mt-8">
          {data?.plans?.map((plan, index) => (
            <PricingCard 
              key={plan.id || index} 
              plan={plan} 
            />
          ))}
        </PricingGrid>

        <Footer stats={stats} error={statsError} />
      </div>
    </div>
  );
};

export default App;