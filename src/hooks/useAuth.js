import { useContext } from "react";
import { AuthContext } from "../providers/authProviders";

export default () => useContext(AuthContext);