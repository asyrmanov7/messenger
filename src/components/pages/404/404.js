// import Handlebars from "handlebars";

const errorPage = document.getElementById("error-page-template").innerHTML
const errorPageTemplate = Handlebars.compile(errorPage)

const error = {
    code: 404,
    message: "Не туда попали",
    action: "Назад к чатам"
}

document.body.innerHTML = errorPageTemplate(error)
