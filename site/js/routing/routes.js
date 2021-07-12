import { render as renderHomePage } from "../page/home.js";
import { render as renderAbout } from "../page/about.js";
import { render as renderSkills } from "../page/skills.js";
import { render as renderExperience } from "../page/experience.js";
import { render as renderCode } from "../page/code.js";

import Router from "./router.js";

const CURRENT_ROUTE_CLASS = "current";
const DEFAULT_ROUTE_TITLE = "Igor Roztropiński";

const router = new Router();

router.addDefaultRoute(renderHomePage);

const routes = {
    "home": renderHomePage,
    "about": renderAbout,
    "skills": renderSkills,
    "experience": renderExperience,
    "code": renderCode
};

const routesTitles = {
    "home": DEFAULT_ROUTE_TITLE,
    "about": "About",
    "skills": "Skills",
    "experience": "Experience",
    "code": "Code"
};

const navLinks = document.querySelectorAll("a");
navLinks.forEach(l => l.classList.remove(CURRENT_ROUTE_CLASS));

for (const [route, render] of Object.entries(routes)) {
    router.addRoute(route, () => {
        window.scrollTo({
            top: 0,
            left: 0
        });

        navLinks.forEach(l => {
            if (l.href.includes(route)) {
                l.classList.add(CURRENT_ROUTE_CLASS);
            } else {
                l.classList.remove(CURRENT_ROUTE_CLASS);
            }
        });

        render();
    });
}

router.init();

export function push(url = `${window.location}`) {
    const route = router.routeFromUrl(url);
    router.push(route);

    const title = routesTitles[route];
    document.title = title ? title : DEFAULT_ROUTE_TITLE;
}

export function isMain(url = `${window.location}`) {
    const route = router.routeFromUrl(url);
    const title = routesTitles[route];
    return !title || title == DEFAULT_ROUTE_TITLE;
}

