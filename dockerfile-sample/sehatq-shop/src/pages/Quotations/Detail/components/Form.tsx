import React, { FC, memo, useState } from 'react';
import Stepper from './Stepper';

const Form: FC = () => {
  const [step] = useState(1);

  return (
    <Stepper activeStep={step} />
  );
};

export default memo(Form);
