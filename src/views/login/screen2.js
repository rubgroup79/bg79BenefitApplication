import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Font } from 'expo';
import { Input, Button, withTheme, Slider } from 'react-native-elements';
import MyDatePicker from '../../Components/datePicker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const SLIDER_SIZE= SCREEN_WIDTH -150;
const USER_COOL = require('../../../assets/images/user-cool.png');
const USER_STUDENT = require('../../../assets/images/user-student.png');
const USER_HP = require('../../../assets/images/user-hp.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class CustomButton extends Component {
  constructor() {
    super();

    this.state = {
      selected: false,
    };
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({
      selected,
    });
  }

  render() {
    const { title } = this.props;
    const { selected } = this.state;

    return (
      <Button
        title={title}
        titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
        buttonStyle={
          selected
            ? {
                backgroundColor: 'rgba(213, 100, 140, 1)',
                borderRadius: 100,
                width: 127,
              }
            : {
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 30,
                width: 127,
                backgroundColor: 'transparent',
              }
        }
        containerStyle={{ marginRight: 10 }}
        onPress={() => this.setState({ selected: !selected })}
      />
    );
  }
}


export default class LoginScreen3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      userCode: 0,
      isTrainer: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      lastNameValid: true,
      firstNameValid: true,
      confirmationPasswordValid: true,
    };

    this.setSelectedType = this.setSelectedType.bind(this);
  
    this.signup = this.signup.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      light: require('../../../assets/fonts/Ubuntu-Light.ttf'),
      bold: require('../../../assets/fonts/Ubuntu-Bold.ttf'),
      lightitalic: require('../../../assets/fonts/Ubuntu-Light-Italic.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  signup() {
    LayoutAnimation.easeInEaseOut();
    const firstNameValid = this.validateFirstName();
    const lastNameValid = this.validateLastName();
    if (
      
      firstNameValid&&
      lastNameValid

    ) {
     
      this.setState({ isLoading: true });
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isLoading: false });
        Alert.alert('🎸', 'You rock');
      }, 1500);

      
    }
  }

  print(){
    console.warn(this.state.firstName + ' ' +this.state.lastName + ' ' + this.state.email + ' ' + this.state.password);
  }

  validateFirstName() {
    const { firstName } = this.state;
    const firstNameValid = firstName.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ firstNameValid });
    firstNameValid || this.firstNameInput.shake();
    return firstNameValid;
  }

  validateLastName() {
    const { lastName } = this.state;
    const lastNameValid = lastName.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ lastNameValid });
    lastNameValid || this.lastNameInput.shake();
    return lastNameValid;
  }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });

  render() {
    const {
      isLoading,
      selectedType,
      fontLoaded,
      firstName,
      lastName,
      firstNameValid,
      lastNameValid,
    } = this.state;

    return !fontLoaded ? (
      <Text> Loading... </Text>
    ) : (
      <ScrollView
        //scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={styles.formContainer}
        >
        <ScrollView style={{   flex: 1,
    paddingBottom: 20,
    paddingTop: 30,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    textAlign:'center',
    alignContent:"center"}}>
        <View style={{flex:1, alignContent:'center',justifyContent:'center', textAlign:'center'}}>
          <Text style={styles.signUpText}>Sign up</Text>
          <Text style={styles.whoAreYouText}>WHO YOU ARE ?</Text>
          </View>
          <View style={styles.userTypesContainer}>
            <UserTypeItem
              label="Trainee"
              labelColor="#ECC841"
              image={USER_COOL}
              onPress={() => this.setSelectedType('parent')}
              selected={selectedType === 'parent'}
            />
            <UserTypeItem
              label="Trainer"
              labelColor="#2CA75E"
              image={USER_STUDENT}
              onPress={() => {
                this.setSelectedType('child');
                this.setState({isTrainer:1});
              }}
              selected={selectedType === 'child'}
            />
          </View>
          <View style={styles.viewContainer}>
            <FormInput style={{ flex:1}}
              refInput={input => (this.firstNameInput = input)}
              icon="user"
              value={firstName}
              onChangeText={firstName => this.setState({ firstName })}
              placeholder="First Name"
              returnKeyType="next"
              errorMessage={
                firstNameValid ? null : "Your First Name can't be blank"
              }
              onSubmitEditing={() => {
                this.validateFirstName();
                this.lastNameInput.focus();
              }}
            />
             <FormInput  style={{ flex:1}}
              refInput={input => (this.lastNameInput = input)}
              icon="user"
              value={lastName}
              onChangeText={lastName => this.setState({ lastName })}
              placeholder="Last Name"
              returnKeyType="next"
              errorMessage={
                lastNameValid ? null : "Your Last Name can't be blank"
              }
              onSubmitEditing={() => {
                this.validateLastName();
                this.emailInput.focus();
              }}
            />
            <View  style={{ flex:1, flexDirection:'row',}}>
              <Text style={styles.dateOfBirthLabel}>
                Date of Birth
              </Text>
             <MyDatePicker  style={{ flex:1}}
             
            ></MyDatePicker>
           </View>

              <View style={{flex:1}}>
              <Text 
                    style={style=styles.textHeadlines}
                    >
                  Search Radius
                </Text>
                <View style={styles.sliderContainerStyle} >
                <Text style={styles.sliderRangeText}>0</Text >
                    <Slider
                        minimumTrackTintColor='white'
                        maximumTrackTintColor='gray'
                        thumbTintColor='rgba(213, 100, 140, 1)'
                        style={styles.sliderStyle}
                        minimumValue={0}
                        step={1}
                        maximumValue={30}
                        value={this.state.value}
                        onValueChange={value => this.setState({ searchRadius: value })}
                    />
                    <Text style={style=styles.sliderRangeText}>30</Text>
                    
                </View>
                <Text style={{color:'white', textAlign:'center', fontSize:15, fontWeight:'bold'}}>Radius: {this.state.searchRadius}</Text>
              </View>

           <View style={{flex: 1}}>
                    <Text
                    style={styles.textHeadlines}
                    >
                  Favorite Sport Types
                </Text>
                <View style={{ flex: 1, width: SCREEN_WIDTH, marginTop: 20,  }}>
                  <ScrollView
                    style={{ flex: 1 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        height: 170,
                        marginLeft: 40,
                        marginRight: 10,
                      }}
                    >
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CustomButton title="Short Run" selected={true} />
                        <CustomButton title=" Yoga" selected={true} />
                        <CustomButton title="Jogging" />
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CustomButton title="Long Run" />
                        <CustomButton title="Walking" selected={true} />
                        <CustomButton title=" Yoga" selected={true} />
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <CustomButton title="Pilatis" selected={true} />
                        <CustomButton title=" Yoga" selected={true} />
                        <CustomButton title=" Yoga" selected={true} />
                      </View>
                      
                    </View>
                  </ScrollView>
                </View>
              </View>
          </View>
          <Button
                containerStyle={{ marginVertical: 20 }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom:10
                }}
                buttonStyle={{
                  height: 55,
                  width: SCREEN_WIDTH - 250,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                linearGradientProps={{
                  colors: ['rgba(216, 121, 112, 1)', 'rgba(216, 121, 112, 1)'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                title="NEXT"
                titleStyle={{
                  fontFamily: 'regular',
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                }}
                onPress={() => console.log('Submit')}
                activeOpacity={0.5}
              />
          </ScrollView>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={<Icon name={icon} color="#7384B4" size={18} />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#7384B4"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 30,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    flex:1,
    color: 'white',
    fontSize: 28,
    fontFamily: 'light',
    marginTop:15,
    textAlign:'center',
  },
  whoAreYouText: {
    flex:1,
    color: '#7384B4',
    fontFamily: 'bold',
    fontSize: 14,
    marginTop:15,
    textAlign:'center',
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    marginTop:30
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',
    fontFamily: 'bold',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontFamily: 'lightitalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontFamily: 'lightitalic',
    fontSize: 12,
  },

  viewContainer:
  {
    flex:1,
    flexDirection:'column',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'space-between',
    width: '80%',
    margin:35,
  },
  dateOfBirthLabel:{
    marginTop:9,
    color:'#7384B4',
    fontSize:16,
    marginLeft: 10,
    fontFamily: 'light',
    flex: 1,
    textAlign:'center'
  },
  textHeadlines:{
    flex: 1,
    fontSize: 15,
    color: 'rgba(216, 121, 112, 1)',
    fontFamily: 'regular',
    marginLeft: 40,
    marginTop:30
},
textHeadlines:{
  flex: 1,
  fontSize: 15,
  color: 'rgba(216, 121, 112, 1)',
  fontFamily: 'regular',
  marginLeft: 40,
  marginTop:30
},
sliderStyle:{
  width: SLIDER_SIZE,
  marginTop:25,
},
sliderContainerStyle:{
  flex: 1,
  alignItems: 'stretch',
  justifyContent: 'center',
  //alignItems: 'center',
  flexDirection:'row',

},
sliderRangeText:{
flex:1,
color:'white',
fontWeight:'bold',
marginTop:37,
textAlign:'center'
},

});
