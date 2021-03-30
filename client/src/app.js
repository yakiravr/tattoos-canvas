import { Component } from "react";
import axios from "./axios";
import Canvas from "./board";
import Profile from "./profile";
import { OtherProfile } from "./otherprofile";
import FindPeople from "./findPeople";

import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            imgUrl: "",
            bio: "",
            success: true,
            error: false,
        };
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                let user = data.rows[0];
                if (data.success) {
                    this.setState({
                        firstname: user.firstname,
                        lastname: user.lastname,
                    });
                } else {
                    this.setState({ error: true });
                }
            })
            .catch((error) => {
                console.log("err in axios POST /user: ", error);
            });
    }

    logout() {
        axios
            .get("/logoff")
            .then(() => {
                location.replace("/welcome");
            })
            .catch((err) => {
                console.log("error in logout:", err);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div id="logOut" onClick={() => this.logout()}>
                    Log-out
                </div>
                <div id="btn">
                    <Link id="filer" to={"/board"} className="color">
                        filler tattoos ||
                    </Link>
                    {""} {""}
                    {""}
                    {""}
                    {""}
                    <Link id="filer" to={"/users"} className="color">
                        Find Tattoo
                    </Link>
                </div>
                <div id="linksInApp">
                    <Route exact path="/board" component={Canvas} />
                </div>

                <div id="appContainer">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                            />
                        )}
                    />
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route path="/users" render={() => <FindPeople />} />
                </div>
            </BrowserRouter>
        );
    }
}
