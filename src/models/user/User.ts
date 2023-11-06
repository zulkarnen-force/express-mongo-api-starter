import { Document } from "mongoose";

interface User {
  id: any;
  name: any;
  email: any;
  password: any;
  about: any;
  role: any;
  created_at: any;
  updated_at: any;
}

export default User;
