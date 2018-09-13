import React, {Component} from 'react';
import * as firebase from 'firebase';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: ''
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged ( user => {
            this.props.setUser(user);
        })
    }

    signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    signOut() {
        firebase.auth().signOut();


    }

    render() {
        return (
            <header>
                <nav>
                    <button className="log-button" id="sign-in" onClick={ () => this.signIn()}>Sign In</button>
                    <button className="log-button" id="sign-out" onClick={ () => this.signOut()}>Sign Out</button>
                </nav>
                <p id="user">{this.props.activeUser}</p>
            </header>
        )
    }
}

export default UserLogin