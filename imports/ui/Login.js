import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        Meteor.loginWithPassword({ email }, password, (err) => {
            if (err) {
                this.setState({ error: "Unable to login. Please check your credentials" })
            } else {
                this.setState({ error: "" })
            }
        });
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Recipe Book</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input type="email" name="email" placeholder="Email..." ref="email" formNoValidate/>
                        <input type="password" name="password" placeholder="Password" ref="password" />
                        <button className="button button-hover">Login</button>
                    </form>
                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
        );
    }
}