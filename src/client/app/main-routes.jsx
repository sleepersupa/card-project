import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {BaseComponent} from "./common/base-comp";
import {userServices} from "./services/user-info";
import {LoginPage} from "./pages/login/login";
import {cartState} from "../../security/services/cart-state";
import {AddCard} from "./pages/add-card/add-card";
import {ValidationSchemaExample} from "./pages/lg/lg";
import {EditCard} from "./pages/edit-card/edit-card";
import {ListCards} from "./pages/list-cards/list-cards";
let redirect = (locate) => {
    return class RedirectRoute extends BaseComponent {
        constructor(props, context) {
            super(props, context);
            props.history.push(locate);

        }

        render() {

            return null;
        }
    }
};


export class MainRoutes extends BaseComponent {
    constructor(props,context) {
        super(props,context);
        this.onUnmount(userServices.onChange(() => this.forceUpdate()));
        cartState.onChange(() => this.forceUpdate())
    }


    render() {

        let token =localStorage.getItem("token") ;
        let authenRoute = (Comp) => token ? Comp : redirect("/login");
        let unAuthenRoute = (Comp) => !token ? Comp : redirect("/");
        const requireAdmin = (comp) => {
            if (!token) {
                return redirect("/login");
            }
            let user = JSON.parse(localStorage.getItem("user-info") )
            if (user.isAdmin) {
                return comp;
            }
            return redirect("/")
        };


        return (
            <div className="main-routes">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={LoginPage}/>
                        <Route path="/lg" exact component={ValidationSchemaExample}/>
                        <Route path="/add-card" exact component={AddCard}/>
                        <Route path="/card/:id" exact component={EditCard}/>
                        <Route path="/cards" exact component={ListCards}/>
                        <Route exact render={()=><Redirect to="/" />}/>

                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}