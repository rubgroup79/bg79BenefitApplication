import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Button, Input, Slider } from 'react-native-elements';
import { Font } from 'expo';


const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 200;
const SLIDER_SIZE= SCREEN_WIDTH -150;

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

export default class SigninTrainee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      searchRadius: 0,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../../assets/fonts/Georgia.ttf'),
      regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {this.state.fontLoaded ? (
          <View style={{ flex: 1, backgroundColor: 'rgba(47,44,60,1)' }}>
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>Stav Shalechet</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{
                    uri:
                      'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg',
                  }}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 26,
                    color: 'white',
                    fontFamily: 'bold',
                  }}
                >
                  Theresa
                </Text>
                <Text
                  style={{
                    flex: 0.5,
                    fontSize: 15,
                    color: 'gray',
                    textAlign: 'left',
                    marginTop: 5,
                  }}
                >
                  0.8 mi
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 26,
                    color: 'green',
                    fontFamily: 'bold',
                    textAlign: 'right',
                  }}
                >
                  84%
                </Text>
              </View>
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
                
               
                <View style={{flex: 1}}>
                    <Text
                    style={styles.textHeadlines}
                    >
                  Sport Types
                </Text>
                <View style={{ flex: 1, width: SCREEN_WIDTH, marginTop: 20 }}>
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
              <View style={{ flex: 1, marginTop: 30 }}>
                <Text
                  style={style=styles.textHeadlines}
                >
                  INFO
                </Text>
                <View
                    style={styles.inputContainer}>
                    <Input
                    placeholder='Tell other trainees about you...'
                    placeholderTextColor="#7384B4"
                    inputStyle={styles.inputStyle}
                    multiline={true}
                    numberOfLines={5}
                    containerStyle={{ width: '100%' }}
                    inputContainerStyle={{
                    borderWidth: 1,
                    borderRadius: 5,
                    }}
                    >
                    </Input>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 20,
                    marginHorizontal: 30,
                  }}
                >
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoTypeLabel}>Age</Text>
                      <Text style={styles.infoTypeLabel}>Height</Text>
                      <Text style={styles.infoTypeLabel}>Ethnicity</Text>
                      <Text style={styles.infoTypeLabel}>Sign</Text>
                      <Text style={styles.infoTypeLabel}>Religion</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.infoAnswerLabel}>26</Text>
                      <Text style={styles.infoAnswerLabel}>5'4"</Text>
                      <Text style={styles.infoAnswerLabel}>White</Text>
                      <Text style={styles.infoAnswerLabel}>Pisces</Text>
                      <Text style={styles.infoAnswerLabel}>Catholic</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoTypeLabel}>Body Type</Text>
                      <Text style={styles.infoTypeLabel}>Diet</Text>
                      <Text style={styles.infoTypeLabel}>Smoke</Text>
                      <Text style={styles.infoTypeLabel}>Drink</Text>
                      <Text style={styles.infoTypeLabel}>Drugs</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10, marginRight: -20 }}>
                      <Text style={styles.infoAnswerLabel}>Fit</Text>
                      <Text style={styles.infoAnswerLabel}>Vegan</Text>
                      <Text style={styles.infoAnswerLabel}>No</Text>
                      <Text style={styles.infoAnswerLabel}>No</Text>
                      <Text style={styles.infoAnswerLabel}>Never</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Button
                containerStyle={{ marginVertical: 20 }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
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
                title="Submit"
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
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
    height:100,
   
  },
  inputContainer:{
      marginTop: 25
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
textHeadlines:{
    flex: 1,
    fontSize: 15,
    color: 'rgba(216, 121, 112, 1)',
    fontFamily: 'regular',
    marginLeft: 40,
    marginTop:30
}

});
