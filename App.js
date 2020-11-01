import React , {Component } from "react";
import {StatusBar ,TouchableOpacity , Image , ImageBackground, Button , StyleSheet, Text, View ,Dimensions} from "react-native";

const imgWidth = 100;
const imgHeight = 100;
//TODO : adicionar imagens de maneira mais simples ( e dinamica )

class Counter extends Component {
  
  constructor(props) {
    super(props);
    //construir aqui img array
    this.state = {
      count: props.count,
      idx:0,
      posX:10,
      posY:10,
      velX:2,
      velY:2,
      img : [require('./img1.png'),require('./img2.png') , require('./img3.png') , require('./img4.png')  , require('./img5.png') , require('./img6.png')
      , require('./img7.png'), require('./img8.png'), require('./img9.png'), require('./img10.png')],
      legenda : ['Viajar com o carro novo' ,'Essa foto é Paraty' , 'Esqueceram de mim' , 'Ai amor pela milésima vez' , 'Tunico é mais legal' , 'Força do ódio', 'Mascarilda', 'Adoro um carinho ... sqn' , 'Presa fácil' , 'Tie Dye é tendência' ]

     }
     this.increment = this.increment.bind(this)
   };

  // change code below this line

 increment() {
 	  var newIdx = Math.floor(Math.random()* this.state.img.length)
 	  while (newIdx == this.state.idx)
 	  	newIdx = Math.floor(Math.random()* this.state.img.length)
       var newVx = (2 + Math.random()*3)
       if (this.state.velX < 0)
       	  newVx = -newVx
       var newVy = (2 + Math.random()*3)//newVx*this.state.velY/this.state.velX
       if (this.state.velY < 0)
       	  newVy = -newVy
      this.setState({
        count: this.state.count + 1,
        idx : newIdx,
        velX : newVx,
        velY : newVy
        
    });
  };
  componentDidMount() {
  	//atualiza posição da imagem 
  	this.interval = setInterval(() => {
  		var dim = Dimensions.get('window'); //parece que não atualiza
  		var newPosx = this.state.posX + this.state.velX
	  	if (newPosx > dim.width - imgWidth ){
	  		this.state.velX = -this.state.velX
	  		newPosx = dim.width - imgWidth
	  	}
	  	if (newPosx < 0){
	  		this.state.velX = -this.state.velX
	  		newPosx = 0
	  	}
	  	var newPosy = this.state.posY + this.state.velY
  		if (newPosy > dim.height - imgHeight ){
	  		this.state.velY = -this.state.velY
	  		newPosy = dim.height - imgHeight
	  	}
	  	if (newPosy < 0){
	  		this.state.velY = -this.state.velY
	  		newPosy = 0
	  	}
  		this.setState({ posX : newPosx , posY : newPosy})}, 10);
  }
  

  // change code above this line
  render() {

    return (
    	<View style={styles.screenContainer}>
    		
        	<TouchableOpacity style={{width: imgWidth,
    			height: imgHeight,
    			resizeMode: "cover",
    			justifyContent: "center",
    			position:'absolute',left:this.state.posX,right:0,top:this.state.posY,bottom:0}} onPress={this.increment}>
    	    	<ImageBackground source={this.state.img[this.state.idx]} style={styles.movel}>			  
			  	</ ImageBackground>  	
    		</TouchableOpacity>
        <View style={{ height: 30}}> 
        	<Text style={styles.text}>Pontuação: {this.state.count}</Text>
        </ View>
       	<View style={{ height: 30}}> 
        		<Text style={styles.text2}>{this.state.legenda[this.state.idx]}</Text>
        </ View>
       	
    	</ View>
    	);

  }
};

export default class App extends Component {
   constructor(){
     super()
     this.state={
     count:0,}
   }
  //const [count, setCount] = useState(0);
  //const onPress = () => setCount(prevCount => prevCount + 1);
  render(){
  return (
    <View style={styles.screenContainer}>
      <StatusBar hidden />
      <ImageBackground source={require('./background.jpg')} style={styles.image}>
      	<Counter  count={this.state.count} / >    
      </ ImageBackground>  	    
    </ View>
  );
}
  
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

  movel: {
    width: imgWidth,
    height: imgHeight,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    position:'absolute',
    left:10,
    height: 50,
   
  },
  text2: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
    position:'absolute',
    left:10,
    height: 50,

  },
});
