import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionnaireLayout from '../../components/questionnaire/QuestionnaireLayout';
import NumberInput from '../../components/questionnaire/NumberInput';
import { useQuestionnaire } from '../../context/QuestionnaireContext';

const HeartRate = () => {
  const { answers, updateAnswer } = useQuestionnaire();
  const navigate = useNavigate();

  return (
    <QuestionnaireLayout
      step={7}
      totalSteps={17}
      question="What is your resting heart rate (beats per minute)?"
      onPrevious={() => navigate('/questionnaire/diastolic-bp')}
      onNext={() => navigate('/questionnaire/cigarettes')}
      canProceed={!!answers.heartRate && answers.heartRate > 0}
    >
      <NumberInput
        id="heartRate"
        label="Enter your resting heart rate"
        value={answers.heartRate}
        onChange={(value) => updateAnswer('heartRate', value)}
        placeholder="e.g., 70"
        unit="bpm"
        min={40}
        max={200}
      />
    </QuestionnaireLayout>
  );
};

export default HeartRate; 