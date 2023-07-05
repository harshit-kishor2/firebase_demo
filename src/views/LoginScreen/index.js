import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {Messages, Metrices, RoutesName, ToastMessage} from '../../helpers';

import {
  Container,
  CustomButton,
  CustomIcon,
  CustomInput,
  CustomText,
  ICON_TYPE,
  KeyboardAwareView,
  Spacer,
} from '../../components';
import NavigationService from '../../navigations/NavigationService';
import {loginAction} from '../../store/auth.slice';

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

const LoginScreen = props => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {onLoginAction, authReducer} = props;
  //Initial value for formik
  const initialValues = {
    email: '',
    password: '',
    isChecked: false,
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
      onLoginAction(formData).then(res => {
        if (res?.type?.includes('rejected')) {
          ToastMessage.showToast({title: res.payload});
        }
        if (res?.type?.includes('fulfilled')) {
          ToastMessage.showToast({title: 'You have logged in successfully.'});
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
            text="Let's Sign In"
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
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => setFieldValue('isChecked', !values.isChecked)}>
              <CustomIcon
                origin={ICON_TYPE.FONTISTO}
                name={values.isChecked ? 'checkbox-active' : 'checkbox-passive'}
                size={25}
              />
            </Pressable>
            <Spacer width={wp(2)} />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '90%',
              }}>
              <CustomText
                text={
                  'By logging in, I accept the terms & conditions of the platform.'
                }
              />
            </View>
          </View>
          <Spacer height={hp(5)} />
          <CustomButton
            title={'Login'}
            onPress={handleSubmit}
            disable={buttonDisabled || !values.isChecked}
          />
          <Spacer height={hp(5)} />

          <Pressable
            onPress={() => {
              NavigationService.replace(RoutesName.REGISTER);
            }}>
            <CustomText text={'Register'} style={styles.registerLink} />
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
  onLoginAction: params => dispatch(loginAction(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    height: hp(100),
  },
  scrollView: {
    height: hp(100),
    marginHorizontal: 10,
  },
  registerLink: {
    fontSize: hp(2.5),
    color: '#1851C3',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});
