import "../css/styles.css";
import "../css/responsive-md.css";
import "../css/responsive-lg.css";
import "../css/responsive-xlg.css";
import "../css/responsive-xxlg.css";

import { AppController } from "./app-controller.js";

const controller = new AppController();
controller.initializeHomePage();
