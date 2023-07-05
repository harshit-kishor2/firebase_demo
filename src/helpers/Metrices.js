import {Dimensions, Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

const isAndroid = Platform.OS === 'android' ? true : false;
const isIos = !isAndroid;

const Metrices = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  wp: widthPercentageToDP,
  hp: heightPercentageToDP,
  drawerWidth: (4 / 5) * width,
  isIos: isIos,
  isAndroid: isAndroid,
};

export default Metrices;
