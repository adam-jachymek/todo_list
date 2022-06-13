
import { supabase } from "./supabaseClient";

const getToken = () => {
  return supabase.auth.session().access_token;
};

export default getToken;
