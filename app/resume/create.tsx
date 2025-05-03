import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useResume } from '../../context/ResumeContext';

import StepOne from '../../components/StepOne';

import ResumeStepsNav from '../../components/ResumeStepsNav';
import PreviewCard from '../../components/PreviewCard';

import StepTwo from 'components/StepTwo';
import StepThree from 'components/StepThree';
import StepFour from 'components/StepFour';
import StepFive from 'components/StepFive';

export default function ResumeCreateScreen() {
  const { step } = useResume();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      default:
        return <StepOne />;
    }
  };

  return (
    <View className="flex-1 flex-row bg-white">
      {/* Preview (simplified for mobile) */}
      <View className="hidden w-1/2 bg-gray-100 p-4 md:flex">
        <PreviewCard />
      </View>

      {/* Form Steps */}
      <ScrollView className="flex-1 p-4">
        <ResumeStepsNav />
        {renderStep()}
      </ScrollView>
    </View>
  );
}
