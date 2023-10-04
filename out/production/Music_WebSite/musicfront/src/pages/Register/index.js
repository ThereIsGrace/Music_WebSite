import axios from "axios";
export * from "@/pages/Register/RegisterFormInput";
export * from "@/pages/Register/RegisterForm";
export * from "@/pages/Register/RegisterTerms";
export * from "@/pages/Register/RegisterModal";

export default axios.create({
  baseURL: "http://localhost:8094",
  header: {
    Authorization: "bearer ",
  },
});
