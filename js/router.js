class Router {

    constructor() {
        this._defaultRoute = null;
        this._routes = [];
    }

    init() {
        window.addEventListener("popstate", () => {
            const url = this.routeFromUrl();
            this._resolve(url);
        });
    }

    push(route) {
        window.history.pushState(null, null, route);
        this._resolve(route);
    }

    _resolve(route) {
        route = this._routeWithoutLeadingSlash(route);

        for (const r of this._routes) {
            if (this._routeWithoutLeadingSlash(r.path) == route) {
                r.init();
                return;
            }
        }

        if (this._defaultRoute) {
            this._defaultRoute();
        }
    }

    _routeWithoutLeadingSlash(route) {
        return route.replace(/^\/+/, '');
    }

    addDefaultRoute(init) {
        this._defaultRoute = init;
    }

    addRoute(path, init) {
        this._routes.push({ path, init });
    }

    routeFromUrl(url = `${window.location}`) {
        return url.replace(window.location.origin, "");
    }
}

export default Router;