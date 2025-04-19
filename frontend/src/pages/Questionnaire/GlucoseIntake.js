import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionnaireLayout from '../../components/questionnaire/QuestionnaireLayout';
import RadioOption from '../../components/questionnaire/RadioOption';
import { useQuestionnaire } from '../../context/QuestionnaireContext';

const GlucoseIntake = () => {
  const { answers, updateAnswer } = useQuestionnaire();
  const navigate = useNavigate();

  const handleChange = (value) => {
    updateAnswer('glucoseIntake', value);
  };

  return (
    <QuestionnaireLayout
      step={11}
      totalSteps={17}
      question="How would you describe your daily glucose or carbohydrate intake?"
      onPrevious={() => navigate('/questionnaire/cholesterol')}
      onNext={() => navigate('/questionnaire/marital-status')}
      canProceed={!!answers.glucoseIntake}
    >
      <RadioOption
        id="glucose-low"
        name="glucoseIntake"
        value="low"
        label="Low intake"
        selectedValue={answers.glucoseIntake}
        onChange={handleChange}
      />
      <RadioOption
        id="glucose-moderate"
        name="glucoseIntake"
        value="moderate"
        label="Moderate intake"
        selectedValue={answers.glucoseIntake}
        onChange={handleChange}
      />
      <RadioOption
        id="glucose-high"
        name="glucoseIntake"
        value="high"
        label="High intake"
        selectedValue={answers.glucoseIntake}
        onChange={handleChange}
      />
      <RadioOption
        id="glucose-very-high"
        name="glucoseIntake"
        value="very-high"
        label="Very high intake"
        selectedValue={answers.glucoseIntake}
        onChange={handleChange}
      />
    </QuestionnaireLayout>
  );
};

export default GlucoseIntake; 