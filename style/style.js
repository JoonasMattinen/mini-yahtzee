import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#2c3e50',
    flexDirection: 'row'
  },
  title: {
    color: '#f39c12',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#f39c12',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  gameinfoBold: {
    fontWeight: 'bold',
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#2c3e50",
    width: 150,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:'#f39c12',
    fontSize: 20
  }
});