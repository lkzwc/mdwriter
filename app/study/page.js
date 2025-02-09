'use client';
import { useState, useEffect } from 'react';
import StudyPlanDisplay from '../components/study-plan/StudyPlanDisplay';

export default function StudyPlan() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudyPlanDisplay />
      </div>
    </div>
  );
}
