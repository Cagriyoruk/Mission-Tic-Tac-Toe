import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons'

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer : 1,
      count_X: 0,
      count_O: 0,
    }
  }
  
  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
    currentPlayer: 1,
    count_X: 0,
    count_O: 0,
    });
  }
  // Check the Winner
  getWinner = () => {
    const NUM_BOARD = 3;
    var arr = this.state.gameState;
    var sum;

    // Row Condition
    for (var i = 0; i< NUM_BOARD; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    // Colummn Condition
    for (var j = 0; j < NUM_BOARD; j++) {
      sum = arr[0][j] + arr[1][j] + arr[2][j];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }      
    }
    // Check Diagonal Condition
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    return 0;

  }

  onBoardPress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0) { return; }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    var winner = this.getWinner();
    if (winner == 1) {
      this.setState.count_X += 1;
      Alert.alert("Player 1 is the winner");
      this.initializeGame();
    }
    else if (winner == -1) {
      this.setState.count_O += 1;
      Alert.alert("Player 2 is the winner");
      this.initializeGame();
    }
  }

  onRestartPress = () => {
    this.initializeGame();
  }
  onNewGamePress = () => {
    this.setState.count_O = 0;
    this.setState.count_X = 0;
    this.initializeGame();
  }
  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name='close' style={styles.boardX} />;
      case -1: return <Icon name='circle-outline' style={styles.boardO} />;
      default: return <View/>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold',color:'indigo',fontSize:30, paddingTop:75,paddingBottom:75}}>Mission Tic-Tac-Toe</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onBoardPress(0, 0)} style={[styles.board, { borderLeftWidth: 0, borderTopWidth: 0, }]}>
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onBoardPress(0, 1)} style={[styles.board, { borderTopWidth: 0, }]}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onBoardPress(0, 2)} style={[styles.board, { borderTopWidth: 0, borderRightWidth: 0, }]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onBoardPress(1, 0)} style={[styles.board, { borderLeftWidth: 0, }]}>
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onBoardPress(1, 1)} style={[styles.board, { }]}>
            {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onBoardPress(1, 2)} style={[styles.board, { borderRightWidth: 0, }]}>
            {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onBoardPress(2, 0)} style={[styles.board, { borderBottomWidth: 0, borderLeftWidth: 0, }]}>
            {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onBoardPress(2, 1)} style={[styles.board, { borderBottomWidth: 0, }]}>
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onBoardPress(2, 2)} style={[styles.board, { borderBottomWidth: 0, borderRightWidth: 0, }]}>
            {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 25}}/>
        <Text style={{fontSize:30,paddingBottom:25}}> {this.setState.count_X} - {this.setState.count_O} </Text>
        <Button title = 'New Game' color='crimson' onPress={this.onNewGamePress}/>
        <View style={{paddingTop: 25}}/>
        <Button title = 'Reset Board' color='crimson' onPress={this.onRestartPress}/>
        <Text/>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
  },

  board: {
    borderWidth: 3,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boardX: {
    color: 'crimson',
    fontSize: 70,
    flex: 1,
    alignSelf: 'center',
  },

  boardO: {
    color: 'steelblue',
    fontSize: 70,
    flex: 1,
    alignSelf: 'center'
  },
});