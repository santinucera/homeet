import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import StepIndicator from '@components/CustomStepper';
import KeyboardAware from '@components/KeyboardAware';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';
import Loadable from '@components/Loadable';
import BaseForm from '@components/BaseForm';

import styles, { stepIndicatorStyles } from './styles';
import { STEP_INDICATOR_LABELS, STEP_INDICATOR_STEPS, strings, SIGN_UP_FIELDS } from './constants';

const KeyboardAwareImage = KeyboardAware(Image);
const KeyboardAwareView = KeyboardAware(View);

class UploadPerson extends Component {
  componentDidUpdate(prevProps) {
    const { currentStep, setTouched } = this.props;
    if (prevProps.currentStep !== currentStep) setTouched(false);
  }

  render() {
    const { currentStep, onGoToLogin, handleSubmit, values, setFieldValue, onBack } = this.props;
    const finalStep = currentStep === 3;
    return (
      <BaseForm link onSubmit={handleSubmit}>
        <View style={styles.container}>

          <StepIndicator
            customStyles={stepIndicatorStyles}
            currentPosition={currentStep}
            stepCount={STEP_INDICATOR_STEPS}
            labels={STEP_INDICATOR_LABELS}
            currentStepCompleted
            />
            <CustomButton
              primaryBtn
              onPress={handleSubmit}
              title={!finalStep ? strings.next : strings.uploadButton}
              textStyle={styles.whiteText}
              style={[styles.signUpBtn, currentStep === 0 && { width: '100%' }]}
              />
              </View>
      </BaseForm>
    );
  }
}

UploadPerson.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGoToLogin: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [SIGN_UP_FIELDS.ADDRESS]: PropTypes.string,
    [SIGN_UP_FIELDS.COMPANY_NAME]: PropTypes.string,
    [SIGN_UP_FIELDS.CUIT]: PropTypes.string,
    [SIGN_UP_FIELDS.EMAIL]: PropTypes.string,
    [SIGN_UP_FIELDS.LOCATION]: PropTypes.string,
    [SIGN_UP_FIELDS.NAME]: PropTypes.string,
    [SIGN_UP_FIELDS.PASSWORD]: PropTypes.string,
    [SIGN_UP_FIELDS.PHONE]: PropTypes.string,
    [SIGN_UP_FIELDS.QR_URL]: PropTypes.string,
    [SIGN_UP_FIELDS.STREET_NUMBER]: PropTypes.string
  }),
  onBack: PropTypes.func.isRequired
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema, currentStep }) => validationSchema[currentStep],
    handleSubmit: (values, { props }) => (props.currentStep === 3 ? props.onSignUp(values) : props.onNext())
  }),
  Loadable(props => props.loading)
);

export default enhancer(UploadPerson);
