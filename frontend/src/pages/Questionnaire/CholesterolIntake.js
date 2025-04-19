import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionnaireLayout from '../../components/questionnaire/QuestionnaireLayout';
import RadioOption from '../../components/questionnaire/RadioOption';
import { useQuestionnaire } from '../../context/QuestionnaireContext';

const CholesterolIntake = () => {
  const { answers, updateAnswer } = useQuestionnaire();
  const navigate = useNavigate();

  const handleChange = (value) => {
    updateAnswer('cholesterolIntake', value);
  };

  return (
    <QuestionnaireLayout
      step={10}
      totalSteps={17}
      question="How would you describe your daily cholesterol intake?"
      onPrevious={() => navigate('/questionnaire/smoking-status')}
      onNext={() => navigate('/questionnaire/glucose')}
      canProceed={!!answers.cholesterolIntake}
    >
      <RadioOption
        id="cholesterol-low"
        name="cholesterolIntake"
        value="low"
        label="Low intake"
        selectedValue={answers.cholesterolIntake}
        onChange={handleChange}
      />
      <RadioOption
        id="cholesterol-moderate"
        name="cholesterolIntake"
        value="moderate"
        label="Moderate intake"
        selectedValue={answers.cholesterolIntake}
        onChange={handleChange}
      />
      <RadioOption
        id="cholesterol-high"
        name="cholesterolIntake"
        value="high"
        label="High intake"
        selectedValue={answers.cholesterolIntake}
        onChange={handleChange}
      />
    </QuestionnaireLayout>
  );
};

export default CholesterolIntake; 