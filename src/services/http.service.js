import axios from "axios";
import { StorageService } from "./storage.service";
export const http = axios.create({
  headers: {
    token : `Bearer ${StorageService.getItem("token")}`,
  }
});