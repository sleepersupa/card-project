import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {BaseComponent} from "./common/base-comp";
import {userServices} from "./services/user-info";
import {LoginPage} from "./pages/login/login";
import {cartState} from "../../security/services/cart-state";
import {AddCard} from "./pages/add-card/add-card";
import {EditCard} from "./pages/edit-card/edit-card";
import {ListCards} from "./pages/list-cards/list-cards";
import {ModalsRegistry} from "./component/modal/modals";
import {DefaultLayout} from "./pages/default-layout";
import {AdminLayout} from "./pages/admin-layout";
import {StandingPage} from "./pages/standing-page/standing-page";

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

    guestWrapper = (Wrapper) => (props) => {
        return (
            <DefaultLayout {...props}>
                <Wrapper {...props}/>
            </DefaultLayout>
        )
    };

    adminWrapper =(Wrapper) => (props) => {
        return (
            <AdminLayout {...props}>
                <Wrapper {...props}/>
            </AdminLayout>
        )
    };


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
        let GameComp = () => (<div>Game 1</div>)
        let guessRoutes = [
            { path: "/", component: StandingPage },
            { path: "/game-1", component: GameComp },
            { path: "/game-2", component: GameComp },
            { path: "/game-3", component: GameComp },
        ]

        let authenRoutes = [
            { path: "/add-card", component: AddCard },
            { path: "/card/:id", component: EditCard },
            { path: "/cards", component: ListCards },
        ]

        return (
            <div className="main-routes">
                <BrowserRouter>
                    <Switch>

                        {guessRoutes.map((r,i) => (
                            <Route key={r.path} path={r.path} exact component={this.guestWrapper(r.component)}/>
                        ))}

                        {authenRoutes.map((r, i) => (
                            <Route key={r.path} path={r.path} exact component={this.adminWrapper(r.component)}/>
                        ))}
                        <Route exact render={()=><Redirect to="/" />}/>
                    </Switch>
                </BrowserRouter>
                <ModalsRegistry/>

            </div>
        );
    }
}