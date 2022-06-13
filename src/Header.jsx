import { supabase } from "./api/supabaseClient";

const Header = () => {

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <div>
      <button onClick={signOut}>Log Out</button>
    </div>
  )
}

export default Header
