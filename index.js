import Handlebars from "handlebars/runtime";
import './index.scss'

import notFoundErrorTemplate from "./src/components/pages/404/404.template.hbs"
import serverErrorTemplate from "./src/components/pages/500/500.template.hbs"
import changePasswordTemplate from "./src/components/pages/change-password/change-password.template.hbs"
import chatTemplate from "./src/components/pages/chat/chat.template.hbs"
import editProfileTemplate from "./src/components/pages/edit-profile/edit-profile.template.hbs"
import profileTemplate from "./src/components/pages/profile/profile.template.hbs"
import signinTemplate from "./src/components/pages/signin/signin.template.hbs"
import signupTemplate from "./src/components/pages/signup/signup.template.hbs"

import {chatData} from "./src/mock-data/chat-list.js";
import {signupInfo} from "./src/mock-data/sign-up-data.js";
import {changePasswordLabel} from "./src/mock-data/change-password-data.js";
import {editProfileData} from "./src/mock-data/edit-profile-data.js";
import {profileData} from "./src/mock-data/profile-data.js";

Handlebars.registerHelper('isNotZero', function(value, options) {
    if(value !== 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector("#app")

    const notFoundError = notFoundErrorTemplate({code: "404", message: "Не туда попали", action: "Назад к чатам"})
    const serverError = serverErrorTemplate({code: "500", message: "Мы уже фиксим", action: "Назад к чатам"})
    const changePassword = changePasswordTemplate(changePasswordLabel)
    const chatPage = chatTemplate(chatData)
    const editProfilePage = editProfileTemplate(editProfileData)
    const profilePage = profileTemplate(profileData)
    const signin = signinTemplate()
    const signup = signupTemplate(signupInfo)

    const url = new URL(document.URL)
    const params = new URLSearchParams(url.search);
    const pageName = params.get('page') || "chat"


    const pages = {
        "404": notFoundError,
        "500": serverError,
        "change-password": changePassword,
        "chat": chatPage,
        "edit-profile": editProfilePage,
        "profile": profilePage,
        "sign-in": signin,
        "sign-up": signup
    }

    const pageTmpl = pages.hasOwnProperty(pageName) ? pages[pageName]: pages['404']


    root.innerHTML = pageTmpl
})
