import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {Messages, Metrices, RoutesName, ToastMessage} from '../../helpers';

import {
  Container,
  CustomButton,
  CustomInput,
  CustomText,
  KeyboardAwareView,
  Spacer,
} from '../../components';
import NavigationService from '../../navigations/NavigationService';
import {registerAction} from '../../store/auth.slice';

const {hp, wp} = Metrices;
const REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validationSchema = Yup.object({
  email: Yup.string()
    .required(Messages.EMAIL_REQUIRED)
    .email(Messages.EMAIL_NOT_VALID),
  password: Yup.string()
    .required(Messages.PASSWORD_REQUIRED)
    .matches(REGEX, Messages.PASSWORD_REGEX),
});
const RegisterScreen = props => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {onRegisterAction, authReducer} = props;
  //Initial value for formik
  const initialValues = {
    email: '',
    password: '',
    serverError: null,
  };
  // destructure formik values from formik hook
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    setErrors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: v => {
      onFormikSubmit(v);
    },
  });
  const onFormikSubmit = value => {
    try {
      setButtonDisabled(true);
      const formData = {
        email: value.email,
        password: value.password,
      };
      onRegisterAction(formData).then(res => {
        if (res?.type?.includes('rejected')) {
          ToastMessage.showToast({title: res.payload});
        }
        if (res?.type?.includes('fulfilled')) {
          ToastMessage.showToast({title: 'You have registered successfully'});
        }
        setButtonDisabled(false);
      });
    } catch (err) {
      setErrors({serverError: err.message});
      setButtonDisabled(false);
    }
  };

  return (
    <Container useSafeAreaView={true}>
      <KeyboardAwareView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <Spacer height={hp(15)} />
          <CustomText
            style={{
              fontSize: hp(4),
            }}
            text="Let's SignUp"
          />
          <Spacer height={hp(5)} />
          <CustomInput
            label="Email"
            placeholder="Enter your email address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={errors?.email && touched?.email}
            errorText={errors?.email}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={errors?.password && touched?.password}
            errorText={errors?.password}
            keyboardType="default"
            returnKeyType="next"
            secureTextEntry={true}
          />
          <Spacer height={hp(3)} />
          <CustomButton
            title={'Register'}
            onPress={handleSubmit}
            disable={buttonDisabled}
          />
          <Spacer height={hp(5)} />
          <Pressable
            onPress={() => {
              NavigationService.replace(RoutesName.LOGIN);
            }}>
            <CustomText text={'Login'} style={styles.loginLink} />
          </Pressable>
          <Spacer height={hp(10)} />
        </ScrollView>
      </KeyboardAwareView>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  onRegisterAction: params => dispatch(registerAction(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  container: {
    height: hp(100),
  },
  scrollView: {
    height: hp(100),
    marginHorizontal: 10,
  },
  loginLink: {
    fontSize: hp(2.5),
    color: '#1851C3',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});
