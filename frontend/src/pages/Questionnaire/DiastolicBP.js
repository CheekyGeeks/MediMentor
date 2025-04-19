import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionnaireLayout from '../../components/questionnaire/QuestionnaireLayout';
import NumberInput from '../../components/questionnaire/NumberInput';
import { useQuestionnaire } from '../../context/QuestionnaireContext';

const DiastolicBP = () => {
  const { answers, updateAnswer } = useQuestionnaire();
  const navigate = useNavigate();

  return (
    <QuestionnaireLayout
      step={6}
      totalSteps={17}
      question="What is your average diastolic blood pressure?"
      description="The bottom number in your blood pressure reading"
      onPrevious={() => navigate('/questionnaire/systolic-bp')}
      onNext={() => navigate('/questionnaire/heart-rate')}
      canProceed={!!answers.diastolicBP && answers.diastolicBP > 0}
    >
      <NumberInput
        id="diastolicBP"
        label="Enter your diastolic blood pressure"
        value={answers.diastolicBP}
        onChange={(value) => updateAnswer('diastolicBP', value)}
        placeholder="e.g., 80"
        unit="mmHg"
        min={40}
        max={150}
      />
    </QuestionnaireLayout>
  );
};

export default DiastolicBP; 