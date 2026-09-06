import "./styles/tokens.css";
import "./styles/app.css";
import { ABOUT_HTML } from "./ui/about";

/* /about is a real page rather than a panel on the landing page, so the
   landing page has one job: pick a civilisation and read its history. */
(document.getElementById("about") as HTMLElement).innerHTML = ABOUT_HTML;
