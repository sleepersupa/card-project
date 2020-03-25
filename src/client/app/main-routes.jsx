import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {BaseComponent} from "./common/base-comp";
import {userServices} from "./services/user-info";
import {LoginPage} from "./pages/login/login";
import {cartState} from "../../security/services/cart-state";
import {ModalsRegistry} from "./component/modal/modals";
import {DefaultLayout} from "./pages/default-layout";
import {AdminLayout} from "./pages/admin-layout";
import {StandingPage} from "./pages/standing-page/standing-page";
import {ManageGames} from "./pages/manage-games/manage-games";
import {ManageCards} from "./pages/manage-cards/manage-cards";
import {Settings} from "./pages/settings/settings";
import {SubmitTeam} from "./pages/submit-team/submit-team";
import {SubmitList} from "./pages/submit-list/submit-list";
import {BuildDisplay} from "./pages/build-display/build-display";
import {AppLayout} from "./app-layout";
import {getParams} from "./pages/card-commonds";
import {HeroDisplay} from "./pages/hero-display/hero-display";
import {gameApi} from "../api/game/game-api";

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
    constructor(props, context) {
        super(props, context);
        this.onUnmount(userServices.onChange(() => this.forceUpdate()));
        cartState.onChange(() => this.forceUpdate())
    }

    guestWrapper = (Wrapper , props) => (<Wrapper {...props}/>)


    adminWrapper = (Wrapper) => (props) => {
        return (
            <AdminLayout {...props}>
                <Wrapper {...props}/>
            </AdminLayout>
        )
    };


    render() {

        let token = localStorage.getItem("token");
        let authenRoute = (Comp) => token ? Comp : redirect("/login");
        let unAuthenRoute = (Comp) => !token ? Comp : redirect("/");
        const requireAdmin = (comp) => {
            if (!token) {
                return redirect("/login");
            }
            let user = JSON.parse(localStorage.getItem("user-info"))
            if (user.isAdmin) {
                return comp;
            }
            return redirect("/")
        };
        let GameComp = () => (<div>Game 1</div>)
        let guessRoutes = [
            {path: "/", component: StandingPage},
        ]


        let authenRoutes = [
            {path: "/manage-cards", component: ManageCards},
            {path: "/manage-games", component: ManageGames},
            {path: "/settings", component: Settings},
        ]

        let gameRoutes = [
            {path :'/g/:game/submit-team' , component : SubmitTeam },
            {path :'/g/:game/submit-list' , component : SubmitList },
            {path :'/g/:game/build/:slug' , component : BuildDisplay },
            {path :'/g/:game/hero/:slug' , component : HeroDisplay },
        ]

        return (
            <div className="main-routes">
                <BrowserRouter>
                    <Switch>

                        <AppLayout>
                            <Fragment>
                                {guessRoutes.map((r, i) => <Route exact key={r.path} path={r.path} render={(props)=> this.guestWrapper(r.component, props)}/>)}


                                {authenRoutes.map((r, i) => <Route exact key={r.path} path={r.path} render={(props)=> this.guestWrapper(r.component, props)}/>)}


                                <Route
                                    path="/g/:game"
                                    render={(props) => (
                                        <DefaultLayout {...props}>
                                            {(layoutProps) => (
                                                <Fragment>
                                                    {gameRoutes.map((route , index) => (
                                                        <GameRoute
                                                            exact
                                                            key={route.path}
                                                            path={route.path}
                                                            Wrapper={route.component}
                                                            {...layoutProps}
                                                        />
                                                    ))}
                                                </Fragment>

                                            )}

                                        </DefaultLayout>
                                    )}
                                />
                                {/*<Route exact render={() => <Redirect to="/"/>}/>*/}
                            </Fragment>
                        </AppLayout>

                    </Switch>
                </BrowserRouter>
                <ModalsRegistry/>

            </div>
        );
    }
}

class GameRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        let {game} = getParams(this.props);
        gameApi.getGameBySlug(game).then((config) =>{
            this.setState({ config : config})
        })
    }

    render() {
        let {game} = getParams(this.props);
        const {Wrapper , path} = this.props;
        const { config } = this.state ;

        return (
            <Route
                exact
                path={path}
                render={(props) => <Wrapper {...props} {...{game, config}}/>}
            />
        )
    }
}